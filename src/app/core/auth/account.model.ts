export class Account {
    constructor(
        public id: any,
        public activated: boolean,
        public roleBOs: string[],
        public email: string,
        public name: string,
        public username: string,
        public phone: string,
        public address: string,
        public imageUrl: string,
        public status: boolean
    ) {}
}
