import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { AuthServiceImpl } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServiceImpl: AuthServiceImpl) {}

  private createResponse(statusCode: number, message: string, data?: any) {
    return {
      statusCode,
      message,
      data: data,
    };
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      console.log(registerUserDto);
      const data = await this.authServiceImpl.registerUser(registerUserDto);
      return this.createResponse(
        HttpStatus.CREATED,
        'User Register SuccessFully',
        data,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async loginUser(@Body() loginUserDto: RegisterUserDto) {
    try {
      const data = await this.authServiceImpl.loginUser(loginUserDto);
      return this.createResponse(
        HttpStatus.CREATED,
        'User Logged In SuccessFully',
        data,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Post('logout')
  async logoutUser(@Body('token') token: string) {
    try {
      await this.authServiceImpl.logoutUser(token);
      return this.createResponse(HttpStatus.OK, 'User Logged Out Successfully');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
