import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UploadModule } from 'src/app/shared/upload/upload.module';

import { TodoService } from './todo.service';
import { TodoListComponent } from './todo-list.component';
import { TodoEditDialog } from './todo-edit-dialog/todo-edit-dialog.component';
import { TodoMaterialModule } from './todo-material.module';

@NgModule({
  declarations: [TodoListComponent, TodoEditDialog],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    TodoMaterialModule,
    UploadModule
  ],
  exports: [TodoListComponent],
  providers: [TodoService],
  entryComponents: [TodoEditDialog]
})
export class TodoModule {}
