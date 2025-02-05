import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateTodoDto, UpdateTodoDto } from './todo/todo.dto';

@Controller('todos')
export class AppController {}
