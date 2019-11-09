import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NgxUploaderModule } from 'ngx-uploader';

import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    MatInputModule,
    MatButtonModule,
    CommonModule,
    NgxUploaderModule
  ],
  exports: [UploadComponent]
})
export class UploadModule {}
