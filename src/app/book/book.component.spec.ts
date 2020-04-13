import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookComponent } from './book.component';
import { IState } from '../store/state';
import { BookService } from '../core/services/book.service';
import { MemoizedSelector } from '@ngrx/store';
import { IBook } from '../shared/model/book.model';
import { TestModule } from '../test/test.module';
import { SharedModule } from '../shared/shared.module';


describe('BookComponent', () => {



  let fixture: ComponentFixture<BookComponent>;

  let comp: BookComponent;


  const initialState: IState = {
    app: { login: false },
    bookShelf: {
      books: [],
      selectedBook: null
    }
  };


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TestModule
      ],
      declarations: [
        BookComponent
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: BookService,
          useValue: {
              query: jest.fn(),
              get: jest.fn()
          }
        }
      ]
    }).compileComponents();

    
    fixture = TestBed.createComponent(BookComponent);
    comp = fixture.debugElement.componentInstance;

    // mockStore = TestBed.get(MockStore);
    // bookService = TestBed.get(BookService);

    // mockBookSelector = mockStore.overrideSelector(
    //   selectBooks,
    //   []
    // );
    // mockStore.refreshState();
    

  }));

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });


//   it('Should have a title.', fakeAsync(() => {

//     bookServiceSpy.getBooks.and.returnValue(asyncData([]));

//     fixture.detectChanges();

//     expect(comp.title).toEqual('Book Store');
//   }));


//   it('Should have a title.', () => {
//     expect(comp.title).toEqual('Book Store');
//   });
});

