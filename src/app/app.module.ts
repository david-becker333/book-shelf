import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { rootReducers } from './store/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/effects/book.effects';
import { BookService } from './core/services/book.service';
import { BookComponent } from './book/book.component';
import { BookModule } from './book/book.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-route.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([BookEffects]),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
