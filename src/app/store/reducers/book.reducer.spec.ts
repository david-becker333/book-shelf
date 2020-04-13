import { reducer } from "./book.reducer";
import { IState } from '../state';
import { IBook } from '../../shared/model/book.model';
import { createAction } from '@ngrx/store';
import { IBookShelfState } from '../state/book.state';
import * as fromBooks from '../actions/book.actions';
import { startLoading } from '../transitions';

describe('BookReducer', () => {

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

    const initialState: IBookShelfState = {
        books: [],
        selectedBook: null
    };

    describe('NOOP action', () => {

        it('should return the default state', () => {
            const action = createAction('[BookShelf] NOOP')
            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });

    describe('getBooks action', () => {

        it('should update loading state state', () => {
            const action = fromBooks.getBooks({});
            const result = reducer(initialState, action);
            // transitions
            const expected = {
                ...initialState,
                loading: true,
                loaded: false,
                error: null
            }
            expect(result).toEqual(expected);

            expect(result.error).toBeNull();
        });
    });

    describe('getBooksSuccess action', () => {

        it('should update loading state and add books', () => {
            const action = fromBooks.getBooksSuccess(testBooks);
            const result = reducer(initialState, action);
            // transitions
            const expected = {
                ...initialState,
                loading: false,
                loaded: true,
                books: testBooks
            }
            expect(result).toEqual(expected);

            expect(expected.books.length).toBe(1)
        });
    });

    describe('getBooksFailed action', () => {

        it('should update failed state and set books to []', () => {
            const testError = new Error('getBooks failed');
            const action = fromBooks.getBooksFailed(testError);
            const result = reducer(initialState, action);
            // transitions
            const expected = {
                ...initialState,
                loading: false,
                loaded: false,
                books: [],
                error: testError
            }
            expect(result).toEqual(expected);

            expect(result.books.length).toBe(0);

            expect(result.error).toBe(testError)
        });
    });



    /*
     *  get Book
     */

    describe('getBook action', () => {

        it('should update loading state', () => {
            const action = fromBooks.getBook(1001);
            const result = reducer(initialState, action);
           
            const expected = {
                ...initialState,
                loading: true,
                loaded: false,
                error: null
            }
            expect(result).toEqual(expected);

            expect(result.error).toBeNull();
        });
    });

    describe('getBookSuccess action', () => {

        it('should update loading state and add books', () => {
            const action = fromBooks.getBookSuccess(testSelectedBook);
            const result = reducer(initialState, action);
           
            const expected = {
                ...initialState,
                loading: false,
                loaded: true,
                selectedBook: testSelectedBook,
                error: null
            }
            expect(result).toEqual(expected);

            expect(expected.selectedBook).toBeTruthy();

            expect(expected.selectedBook).toBe(testSelectedBook);

            expect(expected.error).toBeNull();
        });
    });

    describe('getBookFailed action', () => {

        it('should update failed state and set books to []', () => {
            const testError = new Error('getBook failed');
            const action = fromBooks.getBookFailed(testError);
            const result = reducer(initialState, action);
            
            const expected = {
                ...initialState,
                loading: false,
                loaded: false,
                selectedBook: null,
                error: testError
            }
            expect(result).toEqual(expected);

            expect(result.selectedBook).toBeNull();

            expect(result.error).toBe(testError)
        });
    });


});