import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { UserBO } from '../models/userBO.model';
import { createRequestOption } from '../shared/util/request-util';

@Injectable({ providedIn: 'root' })
export class UserService {
    public resourceUrl = SERVER_API_URL + 'api/users';

    constructor(private http: HttpClient) {}

    createWithImage(body: any) {
        return this.http.post(this.resourceUrl, body, { observe: 'response' });
    }

    updateWithImage(body: any) {
        return this.http.put(this.resourceUrl, body, {observe: 'response' });
    }

    find(username: string): Observable<HttpResponse<UserBO>> {
        return this.http.get<UserBO>(`${this.resourceUrl}/${username}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<UserBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserBO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    getRoles(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/users/roles');
    }

    requestUpdateRoleTeacher(body): Observable<HttpResponse<boolean>> {
        return this.http.post<boolean>(this.resourceUrl + '/request-update-role-teacher', body, { observe: 'response' });
    }

    updateRoleTeacher(isAccept?: boolean, username?: string): Observable<boolean> {
        return this.http.put<boolean>(this.resourceUrl + '/update-role-teacher/' + username + '/' + isAccept, { observe: 'response' });
    }

    getListTopUserEnroll(req?: any): Observable<any> {
        const options = createRequestOption(req);
        return this.http.get<any>(this.resourceUrl + '/top-enroll', { params: options});
    }
}
