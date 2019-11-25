import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';

@Injectable({ providedIn: 'root' })
export class TicketService {
    public resourceUrl = SERVER_API_URL + 'api/admin/tickets';

    constructor(private http: HttpClient) {}

    findAllByStatus(statusId?: any): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/${statusId}`);
    }

    findByFollowByAndLectureId(lectureId?: any): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/lecture/${lectureId}`);
    }

    findByFollowByAndCourseId(courseId?: any): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/course/${courseId}`);
    }

    setStatusLecture(body: any): Observable<any> {
        return this.http.put<any>(`${this.resourceUrl}/lecture`, body, { observe: 'response' });
    }

    setStatusCourse(body: any): Observable<any> {
        return this.http.put<any>(`${this.resourceUrl}/course`, body, { observe: 'response' });
    }

    changeTicketStatus(ticketId?: any, statusId?: any): Observable<boolean> {
        return this.http.put<boolean>(`${this.resourceUrl}?ticketId=${ticketId}&newStatusId=${statusId}`, {observe: 'response' });
    }

}
