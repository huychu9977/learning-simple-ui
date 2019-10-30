import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { QuestionBO } from '../models/questionBO.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
    public resourceUrl = SERVER_API_URL + 'api/questions';

    constructor(private http: HttpClient) {}

    update(code: string, body: any) {
        return this.http.post(this.resourceUrl + `/${code}`, body, { observe: 'response' });
    }

    findAll(code?: string): Observable<HttpResponse<QuestionBO[]>> {
        return this.http.get<QuestionBO[]>(this.resourceUrl + `/${code}`, { observe: 'response' });
    }
}
