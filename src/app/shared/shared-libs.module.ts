import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export const importExports = [
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  CommonModule
];

@NgModule({
  imports: [
    ...importExports
  ],
  exports: [
    ...importExports
  ]
})
export class SharedLibsModule {
  static forRoot() {
    return {
      ngModule: SharedLibsModule
    };
  }
}
