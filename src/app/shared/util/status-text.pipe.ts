import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusText'
})

export class StatusText implements PipeTransform {

    transform(value: any): string {
        if (value === null) { return ''; }
        // tslint:disable-next-line:radix
        value = parseInt(value);
        switch (value) {
            case 1 : {
                return 'Mới tạo';
            }
            case 2 : {
                return 'Đang duyệt';
            }
            case 3 : {
                return 'Cảnh báo';
            }
            case 4 : {
                return 'Mới cập nhật';
            }
            case 5 : {
                return 'Kích hoạt';
            }
            case 8 : {
                return 'Chờ duyệt';
            }
            case 9 :
                case 10: {
                    return 'Chờ kích hoạt';
            }
            case 0 : {
                return 'CHƯA ĐC KIỂM TRA';
            }
        }
        return '';
    }
}
