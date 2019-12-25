import { SERVER_API_URL } from './../app.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CategoryService {
    public resourceUrl = SERVER_API_URL + 'api/categories';
    private categories?: any[] = [];
    constructor(private http: HttpClient) {}

    getTopics(code?: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/topics/${code}`);
    }

    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}`);
    }

    getSubCategories(code?: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/sub/${code}`);
    }

    updateCategory(body: any): Observable<any> {
        return this.http.post<any>(this.resourceUrl, body);
    }

    updateTopic(body: any): Observable<any> {
        return this.http.post<any>(this.resourceUrl + '/topic', body);
    }

    deleteCategoty(id: any): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    deleteTopic(id: any): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/topic/${id}`);
    }

    find(id: any): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/${id}`);
    }

    getCategoriesForEmployer(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/employer`);
    }

    getCategoriesPromise() {
        if (this.categories.length > 0) {
            return Promise.resolve(this.categories);
        }
        return this.getCategoriesForEmployer()
        .toPromise()
        .then(response => {
            this.categories = response || [];
            return this.categories;
        })
        .catch(err => {
            this.categories = [];
            return null;
        });
    }
}
