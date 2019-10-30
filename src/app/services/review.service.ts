import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { ReviewBO } from '../models/reviewBO.model';
import { createRequestOption } from '../shared/util/request-util';

@Injectable({ providedIn: 'root' })
export class ReviewService {
    public resourceUrl = SERVER_API_URL + 'api/reviews';

    constructor(private http: HttpClient) {}

    findOneByCourseAndCreatedBy(courseCode?: string): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/course?courseCode=${courseCode}`);
    }

    create(permission: ReviewBO): Observable<HttpResponse<ReviewBO>> {
        return this.http.post<ReviewBO>(this.resourceUrl, permission, { observe: 'response' });
    }

    update(permission: ReviewBO): Observable<HttpResponse<ReviewBO>> {
        return this.http.put<ReviewBO>(this.resourceUrl, permission, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<ReviewBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReviewBO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    getRating(req?: any): Observable<HttpResponse<any[]>> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(`${this.resourceUrl}/rating`, { params: options, observe: 'response' });
    }
}
