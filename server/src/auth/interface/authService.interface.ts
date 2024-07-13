import { RegisterUserDto } from '../dtos/registerUser.dto';
import { ICustomLoginResponse } from '../../types/auth.interface';

export interface IAuthService {
  registerUser(registerUserDto: RegisterUserDto): Promise<string>;
  loginUser(
    registerUserDto: RegisterUserDto,
  ): Promise<Partial<ICustomLoginResponse>>;
}
