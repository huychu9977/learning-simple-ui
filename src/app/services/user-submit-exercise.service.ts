import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
    public resourceUrl = SERVER_API_URL + 'api/exercises';

    constructor(private http: HttpClient) {}

    submitExercise(body: any): Observable<boolean> {
        return this.http.post<boolean>(this.resourceUrl + '/submit', body);
    }

    update(body: any): Observable<boolean> {
        return this.http.post<boolean>(this.resourceUrl + '/update', body);
    }

    listByLecture(lectureId?: any): Observable<any[]> {
        return this.http.get<any[]>(this.resourceUrl + '/list/' + lectureId);
    }

    getExerciseSubmitted(lectureId?: any): Observable<any> {
        return this.http.get<any>(this.resourceUrl + '/submitted/' + lectureId);
    }

    checkingExercise(exerciseId: any): Observable<boolean> {
        return this.http.get<boolean>(this.resourceUrl + '/checking/' + exerciseId);
    }
}
