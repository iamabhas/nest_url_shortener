import {
  BadGatewayException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/auth.schema';
import { IAuthService } from './interface/authService.interface';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { BcryptService } from 'src/utils/bcrypt.utils';
import { ICustomLoginResponse, IPayload } from '../types/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceImpl implements IAuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User | UserDocument>,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  private blacklistTokens: Set<string> = new Set();

  addToBlacklist(token: string): void {
    this.blacklistTokens.add(token);
  }

  isBlacklisted(token: string): boolean {
    return this.blacklistTokens.has(token);
  }

  //register service
  async registerUser({ username, password }: RegisterUserDto): Promise<string> {
    const pipeline = [
      {
        $match: { username: username },
      },
      {
        $limit: 1,
      },
    ];

    const findUser = await this.userModel.aggregate(pipeline);

    if (!findUser.length.toString().startsWith('0') || findUser.length > 0) {
      throw new ConflictException(
        `${username} already Exists,Please try another username`,
      );
    }

    const genSalt = await this.bcryptService.generateSalt();
    const hashPassword = await this.bcryptService.hashPassword(
      password,
      genSalt,
    );
    const newUser = new this.userModel({
      username: username,
      password: hashPassword,
    });
    const savedData = await newUser.save();
    if (Object.entries(savedData).length === 0) {
      throw new ConflictException(
        'The request could not be completed due to a conflict with the current state of the resource.',
      );
    }
    const message = `${username} has successfully Registered`;
    return message;
  }

  //login service
  async loginUser({
    username,
    password,
  }: RegisterUserDto): Promise<Partial<ICustomLoginResponse>> {
    const countUser = await this.userModel
      .findOne({ username: username })
      .countDocuments();
    if (countUser.toString().startsWith('0')) {
      throw new NotFoundException(
        'User is not registered, Please enter appropriate username',
      );
    }

    const user = await this.userModel.findOne({ username: username }).exec();
    const userHashPassword = user.password;
    const checkPassword = await this.bcryptService.comparePassword(
      password,
      userHashPassword,
    );

    if (!checkPassword) {
      throw new UnauthorizedException(
        'Password is incorrect, Please enter correct password',
      );
    }
    const payload: Required<IPayload> = {
      userId: user._id,
      username: user.username,
    };
    const access_token = this.jwtService.sign(payload);

    if (access_token.split(' ').length === 0) {
      throw new BadGatewayException('Access Token Operation Failed');
    }
    const responseObject: Partial<ICustomLoginResponse> = {
      userId: user._id,
      username: user.username,
      access_token: access_token,
    };
    return responseObject;
  }

  //logout service
  async logoutUser(token: string): Promise<void> {
    this.addToBlacklist(token);
  }
}
