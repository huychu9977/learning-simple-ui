import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';

@Injectable({ providedIn: 'root' })
export class CourseRegistrationService {
    public resourceUrl = SERVER_API_URL + 'api/course-registration';

    constructor(private http: HttpClient) {}

    findOne(courseCode?: string): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/${courseCode}`);
    }

    registrationCourse(courseCode?: string) {
        return this.http.post(`${this.resourceUrl}/${courseCode}`, { observe: 'response' });
    }
}
