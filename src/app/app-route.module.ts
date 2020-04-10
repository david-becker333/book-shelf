import { Routes } from '@angular/router';

export const appRoutes: Routes = [
   
   { path: 'books', loadChildren: './book/book.module#BookModule'},
//    { path: '', redirectTo: '/books' },
   {
    path: '**',
    redirectTo: '/books'
  }
]