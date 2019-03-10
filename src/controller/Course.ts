export class Course {
    public name: string;
    public id: string;
    public grade: string;
    public credit: number;


    constructor(name: string, id: string, grade: string, credit: number) {
        this.name = name;
        this.id = id;
        this.grade = grade;
        this.credit = credit;
    }
}