import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { CommentBO } from '../models/CommentBO.model';
import { createRequestOption } from '../shared/util/request-util';

@Injectable({ providedIn: 'root' })
export class CommentService {
    public resourceUrl = SERVER_API_URL + 'api/comments';

    constructor(private http: HttpClient) {}

    create(comment: CommentBO): Observable<HttpResponse<CommentBO>> {
        return this.http.post<CommentBO>(this.resourceUrl, comment, { observe: 'response' });
    }

    update(comment: CommentBO): Observable<HttpResponse<CommentBO>> {
        return this.http.put<CommentBO>(this.resourceUrl, comment, { observe: 'response' });
    }

    query(req?: any, courseCode?: string): Observable<HttpResponse<CommentBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<CommentBO[]>(`${this.resourceUrl}/list/${courseCode}`, { params: options, observe: 'response' });
    }

    find(id: any): Observable<HttpResponse<CommentBO>> {
        return this.http.get<CommentBO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }


    delete(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getNotifications(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/notifications`);
    }

    setIsSeenComment(id?: any): Observable<any> {
        return this.http.post<any>(`${this.resourceUrl}/notifications/${id}`, { observe: 'response' });
    }
}
