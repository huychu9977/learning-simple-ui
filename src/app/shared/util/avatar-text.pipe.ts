import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'avatarText'
})
export class AvatarTextPipe implements PipeTransform {
    transform(name): string {
        if (!name) { return '44'; }
        const split = name.split(' ');
        if (split.length > 1) {
        return `${split[0].charAt(0).toUpperCase()}${split[1].charAt(0).toUpperCase()}`;
        }
        return split[0].charAt(0).toUpperCase();
    }
}
