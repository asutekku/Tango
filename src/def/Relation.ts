import {v4 as uuid} from 'uuid';

import {StudySubject} from './StudySubject';
import {DBSubject} from '../api/definitions';

export class Relation {
    private readonly _id: number;

    constructor(question: DBSubject, answer: DBSubject) {
        this._question = question;
        this._answer = answer;
        this._id = 0;
        this._tip = '';
    }

    private _tip: string;

    get tip(): string {
        return this._tip;
    }

    set tip(value: string) {
        this._tip = value;
    }

    private _question: DBSubject;

    get question(): DBSubject {
        return this._question;
    }

    set question(value: DBSubject) {
        this._question = value;
    }

    private _answer:DBSubject;

    get answer(): DBSubject {
        return this._answer;
    }

    set answer(value: DBSubject) {
        this._answer = value;
    }

    get id(): number {
        return this._id;
    }
}