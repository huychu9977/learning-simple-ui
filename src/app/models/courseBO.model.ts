export class CourseBO {
    constructor(
        public id?: any,
        public code?: string,
        public name?: string,
        public sortDescription?: string,
        public description?: string,
        public requiredCompleteRate?: any,
        public imageUrl?: string,
        public topicDTO?: any,
        public categoryDTO?: any,
        public videoUrl?: string,
        public levelBO?: any,
        public createdBy?: string,
        public createdAt?: any,
        public modifiedBy?: string,
        public modifiedAt?: any,
        public activated?: boolean,
        public status?: string,
        public totalLecture?: any,
        public totalObjective?: any,
        public totalRequirement?: any,
        public totalUserEnroll?: any,
        public objectiveSummaryBOs?: any[],
        public requirementBOs?: any[],
        public lectures?: any[],
        public ticketFollowBy?: string,
        public ticketStatus?: string,
    ) {}
}
