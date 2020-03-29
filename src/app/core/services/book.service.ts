import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBook } from '../../shared/model/book.model';
import { Observable } from 'rxjs';
import { dateFormatFixer } from '../../shared/utils';

@Injectable({providedIn: 'root'})
export class BookService {

    resourceUrl: string = 'assets/api/v1/books.json';

    constructor(private http: HttpClient) {
    }

    query(query: any): Observable<IBook[]> {
       return this.http.get<IBook[]>(`${this.resourceUrl}`, { params: query });
    }

    get(id: number): Observable<IBook> {
        return this.http.get<IBook>(`${this.resourceUrl}/${id}`);
    }

    create(book: IBook): Observable<IBook> {
        return this.http.post<IBook>(`${this.resourceUrl}`, book);
    }

    update(book: IBook): Observable<IBook> {
        return this.http.put<IBook>(`${this.resourceUrl}/${book.id}`, book);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }    
}



