import { TestBed } from "@angular/core/testing";
import { BookEffects } from './book.effects';
import { selectBooks } from '../state/book.state';
import { Observable } from 'rxjs';

import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { IState } from '../state';
import * as fromBooks from '../actions/book.actions';
import { BookService } from '../../core/services/book.service';
import { IBook } from '../../shared/model/book.model';
import { HttpErrorResponse } from '@angular/common/http';


describe('BookEffects', () => {

    let actions$: Observable<Action>;

    let effects: BookEffects;

    let bookServiceSpy;

    const initialState: IState = {
        bookShelf: {
            books: [],
            selectedBook: null
        }
    }


    beforeEach(() => {

        bookServiceSpy = jasmine.createSpyObj("BookService", ['getBooks']);

        TestBed.configureTestingModule({
            providers: [
                BookEffects,
                {
                    provide: 'BookService',
                    useClass: bookServiceSpy
                },
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
            ],
        });
        

        effects = TestBed.get<BookEffects>(BookEffects);
    })

    it('books like should be empty array on start', () => {

    });

    it('should fetch a list of books', () => {
        const books: IBook[] = [];
        const query = {}; // empty
        actions$ = hot('-a-', {
            a: fromBooks.getBooks(query)
        });

        bookServiceSpy.getBooks.and.returnValue(
            cold('--a|', { a: books })
        );

        const expected = hot('-----a', {
            a: fromBooks.getBooksSuccess([])
        })

        expect(effects.getBooks$).toBeObservable(expected);

    })


    it('should throw an error on fetch books query', () => {
        const query = {}; // empty
        actions$ = hot('-a#', {
            a: fromBooks.getBooks(query)
        });

        bookServiceSpy.getBooks.and.returnValue(
            cold('--a|', { a: fromBooks.getBooksFailed(new Error('Error')) })
        );

        const expected = hot('-----a', {
            a: fromBooks.getBooksFailed(new Error('Error'))
        })

        expect(effects.getBooks$).toBeObservable(expected);

    })





    it('should not fetch if the user is already in the store', () => {
        actions$ = hot('-a--', {
            a: { type: '[Customers Page] Search Customers', name: 'Bob' },
        });

        // there is no output, because Bob is already in the Store state
        const expected = hot('----');

        expect(effects.getBooks$).toBeObservable(expected);
    });

    // follow navigation
    // it('should navigate to the customers detail page', () => {
    //     actions$ = of({ type: '[Customers Page] Customer Selected', name: 'Bob' });
        
    //     // create a spy to verify the navigation will be called
    //     spyOn(router, 'navigateByUrl');
      
    //     // subscribe to execute the Effect
    //     effects.selectCustomer$.subscribe();
      
    //     // verify the navigation has been called
    //     expect(router.navigateByUrl).toHaveBeenCalledWith('customers/bob');
    //   });
})

