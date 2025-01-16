import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUSer } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from '../common/decorators/raw-headers.decorator';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('test')
  @RoleProtected(ValidRoles.ADMIN_SCHOOL)
  @UseGuards(AuthGuard(), UserRoleGuard)
  test(
    @GetUSer() user: User,
    @GetUSer('email') userEmail: User,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }

  @Get('test2')
  @Auth(ValidRoles.PARENT)
  test2(@GetUSer() user: User) {
    return {
      user,
    };
  }
}
