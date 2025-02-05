import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginDTO } from './auth.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDTO })
  createUser(@Body() user: CreateUserDTO) {
    this.authService.createUser(user);
  }

  @Post('login')
  @ApiBody({ type: LoginDTO })
  login(@Body() user: LoginDTO) {
    return this.authService.login(user);
  }
}
