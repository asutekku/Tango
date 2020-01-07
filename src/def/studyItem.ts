import {v4 as uuid} from 'uuid';

export class StudyItem {
    types: StudyType[];
    parent: number;
    private readonly _id: string;

    constructor(parent: number, types?: StudyType[]) {
        this._id = uuid().substring(0, 13);
        this.types = types ? types : [];
        this.parent = parent;

    }

    get id() {
        return this._id;
    }

    /**
     * Simply adds the subjectID to a the subjectID array
     * @param type
     */
    addType(type: StudyType) {
        this.types.push(type);
    }

    public updateTypeByID(id: string, value: string) {
        let type = this.types.find(e => e.subjectID == id);
        if (type !== undefined) {
            type.value = value;
        } else {
            let newType = new StudyType(id, value);
            this.types.push(newType);
        }
    }

    /**
     * Removes subjectID from array by subjectID by subjectID id
     */
    removeTypeBySubjectID(subjectID: string) {
        this.types = this.types.filter((type: StudyType) => {
            return type.subjectID !== subjectID;
        });
    }
}

export class StudyType {
    subjectID: string; //E.g. Japanese
    value: string; //E.g. ねこ

    constructor(subjectID: string, value?: string) {
        this.subjectID = subjectID;
        this.value = value ? value : '';
    }
}