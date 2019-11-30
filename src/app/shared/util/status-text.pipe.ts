import { Pipe, PipeTransform } from '@angular/core';
import { CREATE, CHECKING, ERROR, UPDATE, SUCCESS, WAIT_CHECK } from '../constants/status.constants';

@Pipe({
    name: 'statusText'
})

export class StatusText implements PipeTransform {

    transform(value: string): string {
        if (!value) { return ''; }
        switch (value) {
            case CREATE : {
                return 'Mới tạo';
            }
            case CHECKING : {
                return 'Đang duyệt';
            }
            case ERROR : {
                return 'Lỗi';
            }
            case UPDATE : {
                return 'Mới cập nhật';
            }
            case SUCCESS : {
                return 'Kích hoạt';
            }
            case WAIT_CHECK : {
                return 'Chờ duyệt';
            }
        }
        return '';
    }
}
