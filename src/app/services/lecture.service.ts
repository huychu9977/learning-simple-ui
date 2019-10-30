import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/util/request-util';
import { SERVER_API_URL } from '../app.constants';
import { LectureBO } from '../models/lectureBO.model';

@Injectable({ providedIn: 'root' })
export class LectureService {
    public resourceUrl = SERVER_API_URL + 'api/lectures';

    constructor(private http: HttpClient) {}

    create(body: any) {
        return this.http.post(this.resourceUrl, body, { observe: 'response' });
    }

    setActive(course: LectureBO): Observable<HttpResponse<LectureBO>> {
        return this.http.put<LectureBO>(`${this.resourceUrl}/set-active`, course, { observe: 'response' });
    }

    update(body: any) {
        return this.http.put(this.resourceUrl, body, { observe: 'response' });
    }

    find(courseCode: string, code: string): Observable<HttpResponse<LectureBO>> {
        return this.http.get<LectureBO>(`${this.resourceUrl}/${courseCode}/${code}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<LectureBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<LectureBO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    queryLectureByParent(code?: string, req?: any): Observable<HttpResponse<LectureBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<LectureBO[]>(`${this.resourceUrl}/parent/${code}`, { params: options, observe: 'response' });
    }

    delete(code: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${code}`, { observe: 'response' });
    }

    getTypes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/types`);
    }

    getParents(code?: string, courseCode?: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/${code}/${courseCode}/parents`);
    }

    canDeleted(code?: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/${code}/can-deleted`);
    }

    getTotalChildren(code?: string): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/${code}/total-children`);
    }
}
