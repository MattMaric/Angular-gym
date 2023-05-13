export class ClassSchedule{
    constructor(
        public id: number,
        public className: string,
        public trainerName: string,
        public startTime: string,
        public endTime: string,
        public location: string,
        public date: Date
    ){}
}