import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

export const importExports = [
    RouterTestingModule
]

@NgModule({
  imports: [
    // SharedModule.forRoot(),
    ...importExports
  ],
  declarations: [
  ],
  exports: [ 
      ...importExports
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA, 
      NO_ERRORS_SCHEMA
  ]
})
export class TestModule { }
