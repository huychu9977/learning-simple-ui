export class LectureBO {
    constructor(
        public id?: any,
        public code?: string,
        public name?: string,
        public videoId?: any,
        public type?: any,
        public createdBy?: string,
        public createdAt?: any,
        public modifiedBy?: string,
        public modifiedAt?: any,
        public activated?: boolean,
        public parentCode?: string,
        public lectures?: any[],
        public questions?: any[],
        public sortOrder?: any
    ) {}
}
