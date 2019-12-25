import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request-util';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    public resourceUrl = SERVER_API_URL + 'api/notifications';

    constructor(private http: HttpClient) {}

    update(noti: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.resourceUrl, noti, { observe: 'response' });
    }

    find(id: any): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<any[]>> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrl + '/list', { params: options, observe: 'response' });
    }

    queryForEmployer(req?: any): Observable<HttpResponse<any[]>> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrl + '/employer/list', { params: options, observe: 'response' });
    }

    delete(id: any): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    push(id: any): Observable<boolean> {
        return this.http.get<boolean>(`${this.resourceUrl}/push/${id}`);
    }

    setIsSeen(id: any): Observable<boolean> {
        return this.http.get<boolean>(`${this.resourceUrl}/set-is-seen/${id}`);
    }
}
