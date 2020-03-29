import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IState } from './store/state';
import { IBookQuery, IBook } from './shared/model/book.model';
import * as fromBooks from './store/actions/book.actions';
import { map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectBooks, isBookShelfLoading, isBookShelfLoaded } from './store/state/book.state';
import { dateFormatFixer } from './shared/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  books$: Observable<IBook[]> = this.store.select(selectBooks);

  selectedBook$: Observable<IBook>; // TODO

  isBooksLoading$: Observable<boolean> = this.store.select(isBookShelfLoading);

  isBooksLoaded$: Observable<boolean> = this.store.select(isBookShelfLoaded);
  
  bookFormGroup: FormGroup;

  bookQuery: IBookQuery = {
    sort: 'author',
    offset: 0,
    limit: undefined
  }

  dateFixer = dateFormatFixer;

  constructor(
    private fb: FormBuilder,
    private store: Store<IState>
  ) { }

  ngOnInit() {
    this.bookFormGroup = this.createBookFormGroup();
    this.store.dispatch(fromBooks.getBooks({query: this.bookQuery}));
  }

  createBookFormGroup(): FormGroup {
    const bookGroup: FormGroup = this.fb.group({
      sort: new FormControl('author'),
      pageSize: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/))
    })

    bookGroup.get('sort').valueChanges.pipe(
      debounceTime(500)
    ).subscribe((sortBy) => {
       this.bookQuery.sort = sortBy;
       this.store.dispatch(fromBooks.getBooks({query: this.bookQuery}))
    })

    bookGroup.get('pageSize').valueChanges.pipe(
      debounceTime(1000),
      map(size => !size || size === 0 ? undefined : size)
    ).subscribe((pageSize) => {
      this.bookQuery.limit = pageSize;
      this.store.dispatch(fromBooks.getBooks({query: this.bookQuery}))
    })

    return bookGroup;
  }

  

  resetBookFormGroup() {
    this.bookFormGroup.get('sort').setValue('author');
    this.bookFormGroup.get('pageSize').setValue('');
  }
}
