import { Routes, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { EventManagementComponent } from './event-management.component';
import { EventManagementUpdateComponent } from './event-management-update.component';
import { EventService } from 'src/app/services/event.service';
import { EventBO } from 'src/app/models/eventBO.model';


@Injectable({ providedIn: 'root' })
export class EventMgmtResolve implements Resolve<any> {
  constructor(private service: EventService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const code = route.params.code ? route.params.code : null;
    if (code) {
      return this.service.find(code);
    }
    const eventBO = new EventBO();
    eventBO.id = null;
    return eventBO;
  }
}
export const eventMgmtState: Routes = [
    {
        path: 'event-management',
        component: EventManagementComponent,
        data: {
            pageTitle: 'eventManagement.home.title'
        }
    },
    {
        path: 'event-management/new',
        component: EventManagementUpdateComponent,
        resolve: {
            event: EventMgmtResolve
        },
        data: {
            pageTitle: 'eventManagement.home.createOrEditLabel'
        }
    },
    {
        path: 'event-management/:code/edit',
        component: EventManagementUpdateComponent,
        resolve: {
            event: EventMgmtResolve
        },
        data: {
            pageTitle: 'eventManagement.home.createOrEditLabel'
        }
    },
    {
        path: 'event-management/:code/view',
        // component: EventManagementDetailComponent,
        resolve: {
            event: EventMgmtResolve
        },
        data: {
            pageTitle: 'eventManagement.detail.title',
        }
    }
];
