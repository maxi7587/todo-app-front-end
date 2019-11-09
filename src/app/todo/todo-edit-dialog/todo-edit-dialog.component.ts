import { Component, Inject } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'todo-edit-dialog',
  templateUrl: './todo-edit-dialog.component.html'
})
export class TodoEditDialog {
  todo_form = new FormGroup({
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<TodoEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
  ) {
    this.todo_form.controls.description.setValue(data.description);
    this.todo_form.controls.status.setValue(data.status);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.data.description = this.todo_form.value.description;
    this.data.status = this.todo_form.value.status;
    this.dialogRef.close(this.data);
  }
}
