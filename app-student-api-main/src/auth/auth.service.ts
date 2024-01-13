import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(registerDto: RegisterDto) {
    try {
      const existAccount = await this.userService.findByUsername(
        registerDto.username,
      );

      if (existAccount)
        throw new BadRequestException({
          message: 'Username đã tồn tại',
        });

      const password = await bcrypt.hash(registerDto.password, 10);
      return await this.userService.create({ ...registerDto, password });
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const existAccount = await this.userService.findByUsername(
        loginDto.username,
      );
      if (!existAccount)
        throw new BadRequestException({ message: 'Username không tồn tại' });

      // Check Password
      const isCorrectPassword = await bcrypt.compare(
        loginDto.password,
        existAccount.password,
      );
      if (!isCorrectPassword)
        throw new BadRequestException({ message: 'Mật khẩu chưa chính xác' });

      const { password, ...data } = existAccount.toObject();

      const accessToken = await this.jwtService.signAsync(data, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('EXPIRESIN_TOKEN'),
      });

      return {
        status: HttpStatus.OK,
        message: 'Đăng nhập thành công',
        data: { ...data, accessToken },
      };
    } catch (error) {
      throw error;
    }
  }
}
