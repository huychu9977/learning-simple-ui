import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { PermissionBO } from '../models/permissionBO.model';
import { createRequestOption } from '../shared/util/request-util';

@Injectable({ providedIn: 'root' })
export class PermissionService {
    public resourceUrl = SERVER_API_URL + 'api/permissions';

    constructor(private http: HttpClient) {}

    create(permission: PermissionBO): Observable<HttpResponse<PermissionBO>> {
        return this.http.post<PermissionBO>(this.resourceUrl, permission, { observe: 'response' });
    }

    update(permission: PermissionBO): Observable<HttpResponse<PermissionBO>> {
        return this.http.put<PermissionBO>(this.resourceUrl, permission, { observe: 'response' });
    }

    find(id: any): Observable<HttpResponse<PermissionBO>> {
        return this.http.get<PermissionBO>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<PermissionBO[]>> {
        const options = createRequestOption(req);
        return this.http.get<PermissionBO[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(code: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${code}`, { observe: 'response' });
    }
}
