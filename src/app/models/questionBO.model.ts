export class QuestionBO {
    constructor(
        public id?: any,
        public content?: string,
        public activated?: boolean,
        public answers?: any[],
    ) {}
}
