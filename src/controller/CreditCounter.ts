import {Course} from "./Course";
import CourseRequirements from "./CourseRequirements";

export default class CreditCounter {
    // ASSUME: Everyone is CPSC Major - choose major
    private myCourses: any[] = [];
    private usedCourses: any[] = [];
    private facultyCourses: Map<any, any[]> = new Map<any, any[]>();
    private req = new CourseRequirements();

    public setupFacultyCourses(): void {
        this.facultyCourses.set("Faculty of Arts", ["ACAM", "AFST", "ANTH", "ARBC", "ARCL", "ARTC", "ARTH", "ARTS",
            "ASIA", "ASLA", "ASTU", "CCST", "CDST", "CENS", "CHIL", "CHIN", "CLCH", "CLST", "CNRS", "CNTO", "COLX",
            "CRWR", "CSIS", "CTLN", "DANI", "DMED", "ENGL", "FACT", "FHIS", "FIPR", "FIST", "FMST", "FNEL", "FNIS",
            "FREN", "GEOG", "GERM", "GPP", "GREK", "GRSJ", "HEBR", "HESO", "HINU", "HIST", "IAR", "IEST",
            "INDO", "INFO", "INLB", "ITAL", "ITST", "JAPN", "KORN", "LASO", "LAST", "LATN", "LING", "MDVL", "NEST",
            "PERS", "PHIL", "POLI", "POLS", "PORT", "PSYC", "PUNJ", "RELG", "RGLA", "RMST", "RUSS", "SANS", "SCAN",
            "SEAL", "SLAV", "SOAL", "SOCI", "SPAN", "SWED", "THTR", "TIBT", "UKRN", "URST", "VISA", "WRDS"]
        );
        this.facultyCourses.set("Faculty of Science", ["ARC", "ASIC", "ASTR", "ATSC", "BIOF", "BIOL", "BIOT", "BOTA",
            "CHEM", "COGS", "CPSC", "CSPW", "DSCI", "ENPH", "ENVR", "EOSC", "FISH", "GEOB", "GSAT", "ISCI", "MATH",
            "MICB", "MRNE", "PHYS", "RES", "SCIE", "STAT", "ZOOL"]
        );
    }

    public parseToCourses(nameAndIDs: any[], credits: any[]) {
        for (let i = 0; i < nameAndIDs.length; i++) {
            let newCourse = new Course(nameAndIDs[i], credits[i]);
            this.myCourses.push(newCourse);
        }
    }

    public countTotalRequirement(): number {
        let credit = 0;
        for (let course of this.myCourses) {
            credit += course.credit;
        }
        return credit;
    }

    // remove courses as you go to avoid duplicates?
    // does not account for CPSC 110 (or 103 and 107)
    public countCSRequirement(): number {
        let credit = 0;
        while (credit < this.req.getTotalCSCredit()) {
            for (let course of this.myCourses) {
                const CPSC110 = course.name === "CPSC" && course.id === "110";
                const CPSC103 = course.name === "CPSC" && course.id === "103";
                const CPSC107 = course.name === "CPSC" && course.id === "107";
                const CPSC121 = course.name === "CPSC" && course.id === "121";
                const MATH100 = course.name === "MATH" && course.id === "100";
                const MATH102 = course.name === "MATH" && course.id === "102";
                const MATH104 = course.name === "MATH" && course.id === "104";
                const MATH101 = course.name === "MATH" && course.id === "101";
                const MATH103 = course.name === "MATH" && course.id === "103";
                const MATH105 = course.name === "MATH" && course.id === "105";
                const CPSC210 = course.name === "CPSC" && course.id === "210";
                const CPSC213 = course.name === "CPSC" && course.id === "213";
                const CPSC221 = course.name === "CPSC" && course.id === "221";
                const MATH200 = course.name === "MATH" && course.id === "200";
                const MATH221 = course.name === "MATH" && course.id === "221";
                const STAT241 = course.name === "STAT" && course.id === "241";
                const STAT251 = course.name === "STAT" && course.id === "251";
                const CPSC310 = course.name === "CPSC" && course.id === "310";
                const CPSC313 = course.name === "CPSC" && course.id === "313";
                const CPSC3XX = course.name === "CPSC" && this.is300Level(course);
                const CPSC4XX = course.name === "CPSC" && this.is400Level(course);
                if ((CPSC110 || CPSC103 || CPSC107 || CPSC121 || CPSC121 || MATH100 ||
                    MATH102 || MATH104 || MATH101 || MATH103 || MATH105 || CPSC210 || CPSC213 ||
                    CPSC221 || MATH200 || MATH221 || STAT241 || STAT251 || CPSC310 || CPSC313 ||
                    CPSC3XX || CPSC4XX) && this.isNotUsed(course)) {
                    credit += course.credit;
                    this.usedCourses.push(course);
                }
            }
            break;
        }
        return credit;
    }

    public countGeneralScienceRequirement(): number {
        let credit = 0;
        for (let course of this.myCourses) {
            if (this.isScience(course)) {
                credit += course.credit;
            }
        }
        return credit;
    }

    public countCommunicationsRequirement(): number {
        let credit = 0;
        while (credit < this.req.getTotalCommCredit()) {
            for (let course of this.myCourses) {
                if (this.isCommunications(course) && this.isNotUsed(course)) {
                    credit += course.credit;
                    this.usedCourses.push(course);
                }
            }
            break;
        }
        return credit;
    }

    // 12+ credits, Faculty of Arts (excludign GEOB and PSYC X60+)
    public countArtsRequirement(): number {
        let credit = 0;
        while (credit > this.req.getTotalArtsCredit()) {
            for (let course of this.myCourses) {
                if (this.isArts(course) && this.isNotUsed(course)) {
                    credit += course.credit;
                    this.usedCourses.push(course);
                }
            }
            break;
        }
        return credit;
    }

    public countBreadthRequirement(): number {
        let credit = 0;
        while (credit < this.req.getTotalBreadthCredit()) {
            for (let course of this.myCourses) {
                if (this.isBreadth(course) && this.isNotUsed(course)) {
                    credit += course.credit;
                    this.usedCourses.push(course);
                }
            }
            break;
        }
        return credit;
    }

    public countLowerLevelRequirement(): number {
        let credit = 0;
        while (credit < this.req.getTotalLowerLevelCredit()) {
            for (let course of this.myCourses) {
                const ASTR101 = course.name === "ASTR" && course.id === "101";
                const ASTR102 = course.name === "ASTR" && course.id === "102";
                const BIOL112 = course.name === "BIOL" && course.id === "112";
                const BIOL121 = course.name === "BIOL" && course.id === "121";
                const EOSC110 = course.name === "EOSC" && course.id === "110";
                const EOSC114 = course.name === "EOSC" && course.id === "114";
                const GEOB101 = course.name === "GEOB" && course.id === "101";
                const GEOB102 = course.name === "GEOB" && course.id === "102";
                const GEOB103 = course.name === "GEOB" && course.id === "103";
                const MATH180 = course.name === "MATH" && course.id === "180";
                const MATH184 = course.name === "MATH" && course.id === "184";
                const MATH100 = course.name === "MATH" && course.id === "100";
                const MATH102 = course.name === "MATH" && course.id === "102";
                const MATH104 = course.name === "MATH" && course.id === "104";
                const MATH120 = course.name === "MATH" && course.id === "120";
                const CHEM121 = course.name === "CHEM" && course.id === "121";
                const CHEM123 = course.name === "CHEM" && course.id === "123";
                const PHYS101 = course.name === "PHYS" && course.id === "101";
                const PHYS117 = course.name === "PHYS" && course.id === "117";
                const PHYS118 = course.name === "PHYS" && course.id === "118";
                const PHYS107 = course.name === "PHYS" && course.id === "107";
                const PHYS108 = course.name === "PHYS" && course.id === "108";
                if ((ASTR101 || ASTR102 || BIOL112 || BIOL121 || EOSC110 || EOSC114 ||
                    GEOB101 || GEOB102 || GEOB103 || MATH180 || MATH184 || MATH100 || MATH102 ||
                    MATH104 || MATH120 || CHEM121 || CHEM123 || PHYS101 || PHYS117 || PHYS118 ||
                    PHYS107 || PHYS108) && this.isNotUsed(course)) {
                    credit += course.credit;
                    this.usedCourses.push(course);
                }
            }
            break;
        }
        return credit;
    }

    // EFFECTS: must have 48+ 300-/400-level where 30+ science;
    // remaining credits can be electives in any field or faculty
    public countUpperLevelRequirement(): number {
        let credits = 0;
        let scienceCredits = 0;
        for (let course of this.myCourses) {
            if (this.isUpperLevel(course)) {
                if (this.isScience(course)) {
                    scienceCredits += course.credit;
                }
                credits += course.credit;
            }
        }
        return credits;
    }

    // EFFECTS: must have 48+ 300-/400-level where 30+ science;
    // remaining credits can be electives in any field or faculty
    public countUpperLevelScienceRequirement(): number {
        let scienceCredits = 0;
        for (let course of this.myCourses) {
            if (this.isUpperLevel(course) && this.isScience(course)) {
                scienceCredits += course.credit;
            }
        }
        return scienceCredits;
    }

    // GENERAL CHECKS

    public is300Level(course: Course): boolean {
        return Number(course.id[0]) == 3;
    }

    public is400Level(course: Course): boolean {
        return Number(course.id[0]) == 4;
    }

    public isUpperLevel(course: Course): boolean {
        return Number(course.id[0]) >= 3;
    }

    public isLowerLevel(course: Course): boolean {
        return Number(course.id[0]) <= 2;
    }

    public isScience(course: Course): boolean {
        if (this.facultyCourses.get("Faculty of Science").includes(course.name) ||
            this.isSciencePsyc(course)) {
            return true;
        }
        return false;
    }

    // you need 12 (non-English that counts as Communications)
    // except PSYC X60 and GEOB
    public isArts(course: Course): boolean {
        if (this.facultyCourses.get("Faculty of Arts").includes(course.name) ||
            !this.isSciencePsyc(course)) {
            return true;
        }
        return false;
    }

    private isSciencePsyc(course: Course): boolean {
        if (course.name === "PSYC") {
            if (Number(course.id[2]) >= 6) {
                return true;
            }
        }
    }

    public isCommunications(course: Course): boolean {
        const ENGLCourses: any[] = ["100", "110", "111", "120", "121"];
        let isENGL = (course.name === "ENGL") && ENGLCourses.includes(course.id);
        let isSCIE = (course.name === "SCIE") &&
            ((course.id === "113") || (course.id === "300"));
        let isLFS150 = (course.name === "LFS") && (course.id === "150");
        let isCHEM300 = (course.name === "CHEM") && (course.id === "300");
        let isAPSC176 = (course.name === "APSC") && (course.id === "176");
        let isASTU = (course.name === "ASTU") &&
            ((course.id === "100") || (course.id === "101"));
        let isWRDS150 = (course.name === "WRDS") && (course.id === "150");
        if (isENGL || isSCIE || isLFS150 || isCHEM300 || isAPSC176 || isASTU || isWRDS150) {
            return true;
        }
        return false;
    }

    // 9+ credits outside of field of major** (for CPSC, it's just CPSC) or Arts (not witihin 12-credits)
    public isBreadth(course: Course): boolean {
        let isScience = this.facultyCourses.get("Faculty of Science").includes(course.name);
        let isArts = this.facultyCourses.get("Faculty of Science").includes(course.name);
        let isNotCPSC = course.name !== "CPSC";
        if (isScience || isArts || isNotCPSC) {
            return true;
        }
        return false;
    }

    public isNotUsed(course: Course) {
        return this.usedCourses.includes(course);
    }
}