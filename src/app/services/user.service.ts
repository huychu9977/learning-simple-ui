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

    create(user: UserBO): Observable<HttpResponse<UserBO>> {
        return this.http.post<UserBO>(this.resourceUrl, user, { observe: 'response' });
    }

    createWithImage(body: any) {
        return this.http.post(this.resourceUrl, body, { observe: 'response' });
    }

    updateWithImage(body: any) {
        return this.http.put(this.resourceUrl, body, {observe: 'response' });
    }

    update(user: UserBO): Observable<HttpResponse<UserBO>> {
        return this.http.put<UserBO>(this.resourceUrl, user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<UserBO>> {
        return this.http.get<UserBO>(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<UserBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserBO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    roleBOs(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/users/roleBOs');
    }
}
