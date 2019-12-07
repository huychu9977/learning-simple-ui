import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { RoleBO } from '../models/roleBO.model';
import { createRequestOption } from '../shared/util/request-util';

@Injectable({ providedIn: 'root' })
export class RoleService {
    public resourceUrl = SERVER_API_URL + 'api/roles';

    constructor(private http: HttpClient) {}

    create(role: RoleBO): Observable<HttpResponse<RoleBO>> {
        return this.http.post<RoleBO>(this.resourceUrl, role, { observe: 'response' });
    }

    update(role: RoleBO): Observable<HttpResponse<RoleBO>> {
        return this.http.put<RoleBO>(this.resourceUrl, role, { observe: 'response' });
    }

    find(id: any): Observable<HttpResponse<RoleBO>> {
        return this.http.get<RoleBO>(`${this.resourceUrl}/id/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<RoleBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoleBO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    permissionBOs(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/roles/permissions');
    }
}
