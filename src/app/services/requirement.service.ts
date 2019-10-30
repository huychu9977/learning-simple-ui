import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';

@Injectable({ providedIn: 'root' })
export class RequirementService {
    public resourceUrl = SERVER_API_URL;

    constructor(private http: HttpClient) {}

    update(code: string, body: any) {
        return this.http.post(this.resourceUrl + `api/${code}/course-requireds`, body, { observe: 'response' });
    }

    findAll(code?: string): Observable<any[]> {
        return this.http.get<any[]>(this.resourceUrl + `api/${code}/course-requireds`);
    }
}
