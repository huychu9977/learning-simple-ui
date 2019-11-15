import { OnInit, Component, ElementRef } from '@angular/core';
import { EventBO } from 'src/app/models/eventBO.model';
import { Validators, FormBuilder } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SlugifyPipe } from 'src/app/shared/util/string-to-slug.pipe';

@Component({
    selector: 'event-management-update',
    templateUrl: './event-management-update.component.html'
})
export class EventManagementUpdateComponent implements OnInit {
    bsValue = new Date();
    event: EventBO;
    isSaving: boolean;
    selectedImage: FileList;
    imageUrl;
    editForm = this.fb.group({
        id: [null],
        code: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*')]],
        title: ['', [Validators.required, Validators.maxLength(250)]],
        activated: [true],
        content: ['', [Validators.required]],
        startDate: [''],
        endDate: [''],
        createdAt: [''],
        imageFile: ['']
    });
    constructor(
        private eventService: EventService,
        private route: ActivatedRoute,
        private router: Router,
        private elRef: ElementRef,
        private fb: FormBuilder,
        private slugifyPipe: SlugifyPipe
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ event }) => {
        this.event = event.body ? event.body : event;
        this.updateForm(this.event);
        });
    }
    slugify() {
        this.editForm.get(['code']).setValue(this.slugifyPipe.transform(this.editForm.get(['title']).value));
    }

    private updateForm(event: EventBO): void {
        this.editForm.patchValue({
        id: event.id,
        code: event.code,
        title: event.title,
        activated: event.activated === undefined ? true : event.activated,
        content: event.content,
        startDate: event.startDate,
        endDate: event.endDate,
        createdAt: event.createdAt
        });
        this.imageUrl = this.event.imageUrl ? this.event.imageUrl : 'assets/images/default.png';
    }

    previousState() {
        window.history.back();
    }
    get f() { return this.editForm.controls; }
    save() {
        this.isSaving = true;
        if (this.editForm.invalid) {
        return;
        }
        // swal('Thông báo', 'Đồng ý thực hiện thao tác này?', 'warning', {
        // buttons: ['Từ chối', 'Đồng ý']
        // }).then(confirm => {
        //     if (confirm) {
        //     this.confirm();
        //     }
        // });
    }
    confirm() {
        const formdata: FormData = new FormData();
        formdata.append('imageFile', this.selectedImage ? this.selectedImage.item(0) : null);
        formdata.append('eventBO', new Blob([JSON.stringify(this.updateEvent())], {
        type: 'application/json'
        }));

        this.eventService.update(formdata).subscribe(response => this.onSaveSuccess(response), (error) => this.onSaveError(error));
    }

    private updateEvent() {
        const courseTmp = {
        id : this.event.id,
        code : this.editForm.get(['code']).value,
        title : this.editForm.get(['title']).value,
        activated : this.editForm.get(['activated']).value,
        startDate : this.editForm.get(['startDate']).value,
        content : this.editForm.get(['content']).value,
        endDate : this.editForm.get(['endDate']).value,
        createdAt : this.editForm.get(['createdAt']).value,
        };
        if (!this.event.id) { delete courseTmp.id; }
        return courseTmp;
    }

    private onSaveSuccess(result) {
       // this.toastr.success('Thao tác thành công!');
        setTimeout(() => {
            this.previousState();
        }, 1700);
    }

    private onSaveError(err) {
       // this.toastr.error('Thao tác thất bại!', err.error.message);
        this.isSaving = false;
    }
    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        // tslint:disable-next-line:variable-name
        reader.onload = (_event: any) => {
            this.imageUrl = _event.target.result;
        };
        }
        if (
            event.target.files[0].name.endsWith('.jpg') ||
            event.target.files[0].name.endsWith('.png') ||
            event.target.files[0].name.endsWith('.JPG') ||
            event.target.files[0].name.endsWith('.PNG') ||
            event.target.files[0].name.endsWith('.JPEG') ||
            event.target.files[0].name.endsWith('.jpeg')
        ) {
            this.selectedImage = event.target.files;
        } else {
            const element = this.elRef.nativeElement.querySelector('#fileImage');
            element.value = '';
            // swal('Lỗi', 'Chỉ tải file với đuôi (jpg|png|jpeg)', 'error').then(() => {
            //     this.selectedImage = null;
            // });
        }
    }
}
