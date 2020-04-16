import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookComponent } from './book.component';
import { IState } from '../store/state';
import { BookService } from '../core/services/book.service';
import { MemoizedSelector, Store } from '@ngrx/store';
import { IBook } from '../shared/model/book.model';
import { TestModule } from '../test/test.module';
import { SharedModule } from '../shared/shared.module';
import * as fromBooks from '../store/actions/book.actions';
import { cold } from 'jasmine-marbles';
import { selectBooks, isBookShelfLoading, isBookShelfLoaded } from '../store/state/book.state';
import { By } from '@angular/platform-browser';

describe('BookComponent', () => {

  const testBooks: IBook[] = [
    {
      id: 1001,
      cover: {
        large: 'https://covers.oreillystatic.com/images/9780596517748/lrg.jpg',
        small: 'https://covers.oreillystatic.com/images/9780596517748/cat.gif'
      },
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      releaseDate: '12/2008',
      pages: 172,
      link: 'http://shop.oreilly.com/product/9780596517748.do'
    }
  ];

  const testSelectedBook: IBook = {
    id: 1001,
    cover: {
      large: 'https://covers.oreillystatic.com/images/9780596517748/lrg.jpg',
      small: 'https://covers.oreillystatic.com/images/9780596517748/cat.gif'
    },
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    releaseDate: '12/2008',
    pages: 172,
    link: 'http://shop.oreilly.com/product/9780596517748.do'
  };

  let fixture: ComponentFixture<BookComponent>;

  let component: BookComponent;

  let store: MockStore<IState>;

  let mockSelectBooks: MemoizedSelector<any, IBook[]>;

  let mockSelectBook: MemoizedSelector<any, IBook>;

  let mockIsLoading: MemoizedSelector<any, boolean>;

  let mockIsLoaded: MemoizedSelector<any, boolean>;

  const getBookItems = () => fixture.debugElement.queryAll(By.css('.book-listing li'));

  // const getBookItem = () => fixture.debugElement.query(By.css('.book-label'));


  const initialState: IState = {
    bookShelf: {
      books: [],
      selectedBook: null,
      error: null
    }
  };


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TestModule
      ],
      declarations: [
        BookComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    });

    store = TestBed.get(Store);
    mockSelectBooks = store.overrideSelector(selectBooks, []);
    // mockSelectBook = store.overrideSelector(selectBook, null);
    mockIsLoading = store.overrideSelector(isBookShelfLoading, false);
    mockIsLoaded = store.overrideSelector(isBookShelfLoaded, true);
    

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    // loader = TestbedHarnessEnvironment.loader(fixture);
    //  dispatchSpy = spyOn(store, 'dispatch');


  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });


   it('should be created with 0 books', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(getBookItems().length).toBe(0);
  });


  it('should display books', () => {
    mockSelectBooks.setResult(testBooks);
    mockIsLoading.setResult(false);
    mockIsLoaded.setResult(true);
    store.refreshState();

    fixture.detectChanges();
  
    expect(getBookItems().length).toBe(1);
    // expect(getBookItems()[0].nativeElement.textContent.trim()).toBe('test');
  });

  
});

