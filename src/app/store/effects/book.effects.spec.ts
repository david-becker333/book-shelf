import { TestBed } from "@angular/core/testing";
import { BookEffects } from './book.effects';
import { Observable, of } from 'rxjs';

import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { IState } from '../state';
import * as fromBooks from '../actions/book.actions';
import { BookService } from '../../core/services/book.service';
import { IBook } from '../../shared/model/book.model';
import { TestModule } from '../../test/test.module';


describe('BookEffects', () => {

    const books: IBook[] = [
        {
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

    let actions$: Observable<Action>;

    let effects: BookEffects;

    let bookService;

    const initialState: IState = {
        bookShelf: {
            books: [],
            selectedBook: null
        }
    }


    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                TestModule
            ],
            providers: [
                BookEffects,
                {
                    provide: BookService,
                    useValue: {
                        query: jest.fn(),
                        get: jest.fn()
                    }
                },
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
            ],
        });

        bookService = TestBed.get(BookService);
        effects = TestBed.get(BookEffects);

    })

    it('should be created', () => {
        expect(effects).toBeDefined();
    });

    it('should create an instance successfully', () => {
        expect(bookService).toBeDefined();
    });

    describe('getBooks$ effect', () => {


        it('should get a list of books', () => {

            const action = fromBooks.getBooks({});
            const outcome = fromBooks.getBooksSuccess(books);

            // hot actions
            actions$ = hot('-a', { a: action });

            const response = cold('-a|', { a: books })
            bookService.query = jest.fn(() => response);
            const expected = cold('--b', { a: outcome })

            effects.getBooks$.subscribe(result => {
                expect(result).toEqual(expected);

                // make sure the service was called
                expect(bookService.query.mock.calls.length).toBe(1);
            })
        })



        it('should throw an error on get books query', () => {

            const action = fromBooks.getBooks({});
            const error = new Error();
            const outcome = fromBooks.getBooksFailed(error);

            // hot actions
            actions$ = hot('-a', { a: action });

            const response = cold('-#|', {}, error)
            bookService.query = jest.fn(() => response);
            const expected = cold('--(b|)', { b: outcome })

            effects.getBooks$.subscribe(result => {
            }, error => {

                expect(error).toBeTruthy();

                expect(error).toEqual(expected);

                // make sure the service was called
                expect(bookService.query.mock.calls.length).toBe(1);
            })
        })
    });

    describe('getBook$ effect', () => {

        it('should get a single book', () => {

            const action = fromBooks.getBook(1001);
            const outcome = fromBooks.getBookSuccess(testSelectedBook);

            // hot actions
            actions$ = hot('-a', { a: action });

            const response = cold('-a|', { a: testSelectedBook })
            bookService.get = jest.fn(() => response);
            const expected = cold('--b', { a: outcome })

            effects.getBook$.subscribe(result => {

                expect(result).toEqual(expected);

                // make sure the service was called
                expect(bookService.get.mock.calls.length).toBe(1);
            })
        })

        it('should fail when fetching a single book', () => {

            const testError = new Error();
            const action = fromBooks.getBook(1001);
            const outcome = fromBooks.getBookFailed(testError);

            // hot actions
            actions$ = hot('-a', { a: action });

            const response = cold('-#', { a: testError })
            bookService.get = jest.fn(() => response);
            const expected = cold('--b', { a: outcome })

            effects.getBook$.subscribe(result => {

                expect(result).toEqual(expected);

                // make sure the service was called
                expect(bookService.get.mock.calls.length).toBe(1);
            })
        })
    })





})


  // follow navigation
    // it('should navigate to the customers detail page', () => {
    //     actions = of({ type: '[Customers Page] Customer Selected', name: 'Bob' });

    //     // create a spy to verify the navigation will be called
    //     spyOn(router, 'navigateByUrl');

    //     // subscribe to execute the Effect
    //     effects.selectCustomer$.subscribe();

    //     // verify the navigation has been called
    //     expect(router.navigateByUrl).toHaveBeenCalledWith('customers/bob');
    //   });