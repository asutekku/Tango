import {v4 as uuid} from 'uuid';
import {UIItem} from './IUIitem';

export class StudySubject implements UIItem {
    subject: string;
    description: string;
    private readonly _id: number;

    constructor(subject: string, description?: string) {
        this._id = uuid().substring(0, 13);
        this.subject = subject;
        this.description = description ? description : '';
    }

    get id(): number {
        return this._id;
    }

    toString() {
        return this.subject;
    }
}