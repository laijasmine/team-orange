import {Course} from "./Course";

export default class CourseRequirements {
    private totalCredit = 120;
    private totalScienceCredit = 72;
    private totalCommCredit = 6;
    private totalArtsCredit = 12;
    private totalBreadthCredit = 9;
    private totalLowerLevelCredit = 25; // may need to be updated
    private totalUpperLevelCredit = 48;
    private totalUpperLevelScienceCredit = 30;
    private totalCSCredit = 4+4+6+4+8+6+3+10+9+9; // rest are lower

    public getTotalCredit(): number {
        return this.totalCredit;
    }
    public getTotalScienceCredit(): number {
        return this.totalScienceCredit;
    }
    public getTotalCommCredit(): number {
        return this.totalCommCredit;
    }
    public getTotalArtsCredit(): number {
        return this.totalArtsCredit;
    }
    public getTotalBreadthCredit(): number {
        return this.totalBreadthCredit;
    }
    public getTotalLowerLevelCredit(): number {
        return this.totalLowerLevelCredit;
    }
    public getTotalUpperLevelCredit(): number {
        return this.totalUpperLevelCredit;
    }
    public getTotalUpperLevelScienceCredit(): number {
        return this.totalUpperLevelScienceCredit;
    }
    public getTotalCSCredit(): number {
        return this.totalCSCredit;
    }
}