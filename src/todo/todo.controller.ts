import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateTodoDto, UpdateTodoDto } from 'src/todo/todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiBody({ type: CreateTodoDto })
  createTodo(@Body('title') title: string) {
    return this.todoService.createTodo(title);
  }

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodoById(@Param('id') id: number) {
    return this.todoService.getTodoById(Number(id));
  }

  @Put(':id')
  @ApiBody({ type: UpdateTodoDto })
  updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(
      Number(id),
      updateTodoDto.title,
      updateTodoDto.completed,
    );
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(Number(id));
  }
}
