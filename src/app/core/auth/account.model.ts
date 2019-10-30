export class Account {
    constructor(
        public activated: boolean,
        public roleBOs: string[],
        public email: string,
        public name: string,
        public username: string,
        public imageDTO: any
    ) {}
}
