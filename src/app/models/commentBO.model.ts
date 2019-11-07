export class CommentBO {
    constructor(
        public id?: any,
        public title?: string,
        public content?: string,
        public parentId?: any,
        public lectureId?: any,
        public createdBy?: any,
        public createdAt?: string,
        public replies?: any[]
    ) {}
}
