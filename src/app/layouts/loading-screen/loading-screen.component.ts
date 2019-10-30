import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoadingScreenService } from './loading-screen.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'lbp-loading-screen',
    templateUrl: './loading-screen.component.html',
    styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
    loading = false;
    loadingSubscription: Subscription;

    constructor(private loadingScreenService: LoadingScreenService, private cdRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value: boolean) => {
            this.loading = value;
            this.cdRef.detectChanges();
        });
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }
}
