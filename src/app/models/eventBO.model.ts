export class EventBO {
    constructor(
        public id?: any,
        public code?: string,
        public title?: string,
        public content?: string,
        public startDate?: any,
        public endDate?: any,
        public createAt?: string,
        public imageUrl?: string,
        public activated?: boolean
    ) {}
}
