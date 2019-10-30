import { SERVER_API_URL } from './../app.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CategoryService {
    public resourceUrl = SERVER_API_URL + 'api/categories';

    constructor(private http: HttpClient) {}

    getTopics(code?: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/topics/${code}`);
    }

    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}`);
    }

    getCategoriesForEmployer(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/employer`);
    }
}
