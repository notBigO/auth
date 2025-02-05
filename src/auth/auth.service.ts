import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO, LoginDTO, User } from './auth.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  async createUser(user: CreateUserDTO) {
    try {
      const emailCheck = await axios.get(
        `${this.baseUrl}/users?email=${user.email}`,
      );
      if (emailCheck.data.length > 0) {
        throw new BadRequestException('Email already exists');
      }

      const usernameCheck = await axios.get(
        `${this.baseUrl}/users?username=${user.username}`,
      );
      if (usernameCheck.data.length > 0) {
        throw new BadRequestException('Username already exists');
      }

      const newUser = {
        id: Date.now(),
        name: user.name,
        email: user.email,
        password: user.password,
        username: user.username,
      };

      const response = await axios.post(`${this.baseUrl}/users`, newUser);
      return response.data;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error creating user');
    }
  }

  async login(user: LoginDTO) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/users?email=${user.email}&password=${user.password}`,
      );

      if (response.data.length === 0) {
        throw new UnauthorizedException('Invalid email or password');
      }

      return response.data[0].name;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException('Error during login');
    }
  }
}
