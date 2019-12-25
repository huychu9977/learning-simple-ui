import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { createRequestOption } from '../shared/util/request-util';
import { EventBO } from '../models/eventBO.model';

@Injectable({ providedIn: 'root' })
export class EventService {
    public resourceUrl = SERVER_API_URL + 'api/events';

    constructor(private http: HttpClient) {}

    update(body: any): Observable<HttpResponse<EventBO>> {
        return this.http.post<EventBO>(`${this.resourceUrl}/update`, body, { observe: 'response' });
    }

    find(code: any): Observable<HttpResponse<EventBO>> {
        return this.http.get<EventBO>(`${this.resourceUrl}/${code}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<EventBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<EventBO[]>(`${this.resourceUrl}/list`, { params: options, observe: 'response' });
    }

    delete(code: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${code}`, { observe: 'response' });
    }

    setActive(event: EventBO): Observable<HttpResponse<EventBO>> {
        return this.http.put<EventBO>(`${this.resourceUrl}/set-active`, event, { observe: 'response' });
    }

    // for employer

    queryForEmployer(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http.get<any>(`${this.resourceUrl}/employer/list`, { params: options, observe: 'response' });
    }

    enroll(code: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.resourceUrl}/enroll/${code}`);
    }
}
