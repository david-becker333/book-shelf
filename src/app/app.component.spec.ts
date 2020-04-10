import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { IState } from './store/state';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { BookService } from './core/services/book.service';


describe('AppComponent', () => {

  let bookServiceSpy: jasmine.SpyObj<BookService>;

  let store: MockStore<IState>;

  let fixture: ComponentFixture<AppComponent>;
  let comp = fixture.debugElement.componentInstance;

  const initialState: IState = {
    app: { login: false },
    bookShelf: {
      books: [],
      selectedBook: null
    }
  };


  beforeEach(async(() => {

    let bookSpy = jasmine.createSpyObj('BookService', ['query', 'get']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: BookService,
          useValue: bookSpy
        }
      ]
    }).compileComponents();

    
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.debugElement.componentInstance;

    store = TestBed.get(MockStore);
    bookServiceSpy = TestBed.get(BookService);

  }));

  it('should create an instance', () => {

    expect(comp).toBeTruthy();
  });


  it('Should have a title.', () => {

    expect(comp.title).toEqual('Book Store');
  });


  it('Should have a title.', () => {
    expect(comp.title).toEqual('Book Store');
  });



























  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'book-shelf'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('book-shelf');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to book-shelf!');
  // });
});
