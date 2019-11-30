import { OnInit, Component, ElementRef } from '@angular/core';
import { EventBO } from 'src/app/models/eventBO.model';
import { Validators, FormBuilder } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SlugifyPipe } from 'src/app/shared/util/string-to-slug.pipe';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'event-management-update',
    templateUrl: './event-management-update.component.html'
})
export class EventManagementUpdateComponent implements OnInit {

    event: EventBO;
    isSaving: boolean;
    selectedImage: FileList;
    imageUrl;
    showOnTops: any[];
    accessTypes: any[];
    editForm = this.fb.group({
        id: [null],
        code: [''],
        title: ['', [Validators.required, Validators.maxLength(250)]],
        content: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: [''],
        createdAt: ['', [Validators.required]],
        isShowOnTop: ['', [Validators.required]],
        accessType: ['', [Validators.required]],
        imageFile: ['']
    });
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private eventService: EventService,
        private route: ActivatedRoute,
        private elRef: ElementRef,
        private fb: FormBuilder,
        private slugifyPipe: SlugifyPipe
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.showOnTops = [
            {id: true, title: 'Hiển thị'},
            {id: false, title: 'Không hiển thị'}
        ];
        this.accessTypes = [
            {code: 'PRIVATE', title: 'Chỉ người dùng đã đăng ký'},
            {code: 'PUBLIC', title: 'Tất cả người dùng'}
        ];
        this.route.data.subscribe(({ event }) => {
            this.event = event.body ? event.body : event;
            this.updateForm(this.event);
        });
    }

    private updateForm(event: EventBO): void {
        this.editForm.patchValue({
            id: event.id,
            code: event.code,
            title: event.title,
            content: event.content,
            startDate: event.startDate ? new Date(event.startDate) : null,
            endDate: event.endDate ? new Date(event.endDate) : null,
            createdAt: event.createdAt,
            isShowOnTop: event.isShowOnTop || false,
            accessType: event.accessType || 'PUBLIC'
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
        this.confirmationService.confirm({
            message: 'Đồng ý thực hiện thao tác này?',
            accept: () => {
              this.confirm();
            }
          });
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
            startDate : this.editForm.get(['startDate']).value,
            content : this.editForm.get(['content']).value.replace(/[ \t\r]+/g, ' '),
            endDate : this.editForm.get(['endDate']).value,
            createdAt : this.editForm.get(['createdAt']).value,
            accessType : this.editForm.get(['accessType']).value,
            isShowOnTop : this.editForm.get(['isShowOnTop']).value
        };
        if (!this.event.id) {
            delete courseTmp.id;
            courseTmp.code = this.slugifyPipe.transform(this.editForm.get(['title']).value);
        }
        return courseTmp;
    }

    private onSaveSuccess(result) {
        this.messageService.add({severity: 'success', summary: 'Thành công!', detail: 'Thao tác thành công!'});
        setTimeout(() => {
            this.previousState();
        }, 1500);
    }

    private onSaveError(err) {
        this.messageService.add({severity: 'error', summary: 'Thao tác thất bại!', detail: err.error.message});
        this.isSaving = false;
    }
    onFileChange(event) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          // tslint:disable-next-line:no-shadowed-variable
          reader.onload = (event: any) => {
              this.imageUrl = event.target.result;
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
            const element = this.elRef.nativeElement.querySelector('#filevideo');
            element.value = '';
            this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Chỉ tải file với đuôi (jpg|png|jpeg)'});
            this.selectedImage = null;
        }
    }
}
