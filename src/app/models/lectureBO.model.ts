export class LectureBO {
    constructor(
        public id?: any,
        public code?: string,
        public name?: string,
        public videoUrl?: string,
        public type?: any,
        public typeName?: string,
        public createdBy?: string,
        public createdAt?: any,
        public modifiedBy?: string,
        public modifiedAt?: any,
        public activated?: boolean,
        public status?: any,
        public parentCode?: string,
        public lectures?: any[],
        public questions?: any[],
        public sortOrder?: any,
        public fileAttachments?: any[],
        public requiredCompleteRate?: any,
        public content?: string,
    ) {}
}
