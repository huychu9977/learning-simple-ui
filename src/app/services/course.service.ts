import { CourseBO } from './../models/courseBO.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/util/request-util';
import { SERVER_API_URL } from '../app.constants';

@Injectable({ providedIn: 'root' })
export class CourseService {
    public resourceUrl = SERVER_API_URL + 'api/courses';
    private levels?: any[] = [];

    constructor(private http: HttpClient) {}

    create(body: any) {
        return this.http.post(this.resourceUrl, body, { observe: 'response' });
    }

    setActive(course: CourseBO): Observable<HttpResponse<CourseBO>> {
        return this.http.put<CourseBO>(`${this.resourceUrl}/set-active`, course, { observe: 'response' });
    }

    setStatus(courseCode: string, status: string): Observable<boolean> {
        return this.http.put<boolean>(`${this.resourceUrl}/set-status/${courseCode}/${status}`, { observe: 'response' });
    }

    update(body: any) {
        return this.http.put(this.resourceUrl, body, {observe: 'response' });
    }

    find(code: string): Observable<HttpResponse<CourseBO>> {
        return this.http.get<CourseBO>(`${this.resourceUrl}/${code}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<CourseBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<CourseBO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    findForEmpoyer(code: string): Observable<HttpResponse<CourseBO>> {
        return this.http.get<CourseBO>(`${this.resourceUrl}/employer/${code}`, { observe: 'response' });
    }

    queryForEmpoyer(req?: any): Observable<HttpResponse<CourseBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<CourseBO[]>(`${this.resourceUrl}/employer`, { params: options, observe: 'response' });
    }

    delete(code: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${code}`, { observe: 'response' });
    }

    getLevels(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/levels`);
    }

    getLevelsPromise() {
        if (this.levels.length > 0) {
            return Promise.resolve(this.levels);
        }
        return this.getLevels()
        .toPromise()
        .then(response => {
            this.levels = response || [];
            return this.levels;
        })
        .catch(err => {
            this.levels = [];
            return null;
        });
    }
    //
    queryMyCourses(req?: any): Observable<HttpResponse<any>> {
        const options = createRequestOption(req);
        return this.http.get<any>(`${this.resourceUrl}/employer/my-courses`, { params: options, observe: 'response' });
    }

    queryLectureCompleted(courseCode?: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/employer/lecture-completed/${courseCode}`);
    }

    toggleCompletedLecture(lectureId?: any) {
        return this.http.post(`${this.resourceUrl}/employer/lecture-completed/${lectureId}`, { observe: 'response' });
    }

    queryCourseSuggest(keyword?: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/suggest?keyword=${keyword}`);
    }

    // instructor
    queryForInstructor(req?: any): Observable<HttpResponse<CourseBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<CourseBO[]>(`${SERVER_API_URL}api/instructor/courses`, { params: options, observe: 'response' });
    }
}
