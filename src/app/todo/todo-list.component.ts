import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TodoService } from './todo.service';
import { Todo } from './todo';
import { TodoEditDialog } from './todo-edit-dialog/todo-edit-dialog.component';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html'
})

export class TodoListComponent implements OnInit {
  todos: Todo[];
  displayedColumns: string[] = ['id', 'status', 'description', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Todo>;

  @ViewChild(MatTable, {static: true}) table: MatTable<Todo>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private todoService: TodoService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTodos().then((todos: Todo[]) => {
      this.dataSource = new MatTableDataSource(todos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getTodos(): Promise<any> {
    return this.todoService.getTodos()
      .then(todos => this.todos = todos );
  }

  createTodo() {
    this.showTodoDialog(new Todo()).subscribe(
      todo => {
        this.todoService.createTodo(todo)
          .then(new_todo => {
            this.todos.unshift(new_todo);
            this.table.renderRows();
          });
      }
    );
  }

  updateTodo(todo_data: Todo): void {
    this.showTodoDialog(todo_data).subscribe(
      todo => {
        this.todoService.createTodo(todo)
          .then(updated_todo =>{
            let existing_todo = this.todos.find(item => item.id === updated_todo.id);
            Object.assign(existing_todo, updated_todo);
            this.table.renderRows();
          });
      }
    );
  }

  showTodoDialog(todo: Todo): Observable<Todo> {
    return this.matDialog.open(TodoEditDialog, {data: todo})
      .afterClosed()
      .pipe(
        filter(response => response)
      );
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
    .then(() => {
      this.todos = this.todos.filter(todo => todo.id != id);
      this.table.renderRows();
    });
  }

  setStatus(todoData: Todo, status: 'NEW'|'IN_PROGRESS'|'DONE'|'CANCELLED'): void {
    todoData.status = status;
    this.todoService.updateTodo(todoData)
    .then(updatedTodo => {
      let existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
      this.table.renderRows();
    });
  }

}
