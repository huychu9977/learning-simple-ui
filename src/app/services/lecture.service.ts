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

    queryLectureByChapter(code?: string, req?: any): Observable<HttpResponse<LectureBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<LectureBO[]>(`${this.resourceUrl}/by-chapter/${code}`, { params: options, observe: 'response' });
    }

    delete(code: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${code}`, { observe: 'response' });
    }

    getTypes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/types`);
    }

    getChapters(code?: string, courseCode?: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/chapters/${code}/${courseCode}`);
    }

    getTotalLectureByChapter(code?: string): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/total-by-chapter/${code}`);
    }

    setStatus(code: string, status: string): Observable<boolean> {
        return this.http.put<boolean>(`${this.resourceUrl}/set-status/${code}/${status}`, { observe: 'response' });
    }
}
