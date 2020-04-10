import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';

const importExports = [
  
];
@NgModule({
  imports: [SharedLibsModule],
  declarations: [...importExports],
  exports: [SharedLibsModule, ...importExports]
})
export class SharedCommonModule {}
