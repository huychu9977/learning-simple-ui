export class UserBO {
    constructor(
        public id?: any,
        public username?: string,
        public name?: string,
        public phone?: string,
        public email?: string,
        public activated?: boolean,
        public address?: string,
        public imageUrl?: string,
        public roleBOs?: any[],
        public createdBy?: string,
        public createdAt?: any,
        public modifiedBy?: string,
        public modifiedAt?: any
    ) {}
}
