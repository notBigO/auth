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
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Controller('todos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiBody({ type: CreateTodoDto })
  createTodo(@Body('title') title: string) {
    return this.appService.createTodo(title);
  }

  @Get()
  getTodos() {
    return this.appService.getTodos();
  }

  @Get(':id')
  getTodoById(@Param('id') id: number) {
    return this.appService.getTodoById(Number(id));
  }

  @Put(':id')
  @ApiBody({ type: UpdateTodoDto })
  updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.appService.updateTodo(
      Number(id),
      updateTodoDto.title,
      updateTodoDto.completed,
    );
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.appService.deleteTodo(Number(id));
  }
}
