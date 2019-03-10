export class Course {
    public name: string;
    public id: string;
    public credit: number;


    constructor(nameAndID: string, credit: number) {
        this.name = nameAndID.split(" ")[0];
        this.id = nameAndID.split(" ")[1];
        this.credit = credit;
    }
}