import {UIItem} from './IUIitem';
import {DBDeck, DBSubject} from '../api/definitions';
import {StudyItem} from './studyItem';
import {StudySubject} from './StudySubject';
import {Relation} from './Relation';

export class Deck implements UIItem, DBDeck {
    name: string;
    description: string;
    collection_id: number;
    owner_id: number;
    created_on: string;
    private readonly _id: number;
    studyItems: StudyItem[];
    relations: Relation[];
    subjects: StudySubject[];

    //ID should not be changed

    constructor(name: string, description: string, id: number, collection_id: number, owner_id: number, created_on: string) {
        this.name = name;
        this._id = 0;
        this.description = description ? description : '';
        this.created_on = created_on ? created_on : new Date().getTime().toString();
        this.collection_id = collection_id;
        this.owner_id = owner_id;
        this.studyItems = [];
        this.relations = [];
        this.subjects = [];
    }

    get id(): number {
        return this._id;
    }

    private _parent: number | undefined;

    get parent(): number {
        return this._parent;
    }

    set parent(value: number) {
        this._parent = value;
    }

    toString() {
        return this.name;
    }


    additem(item: StudyItem) {
        this.studyItems.push(item);
    }

    addRelation(question: DBSubject, answer: DBSubject) {
        let relation = new Relation(question, answer);
        this.relations.push(relation);
    }

    removeRelation() {

    }

    addStudySubject(subject: StudySubject) {
        this.subjects.push(subject);
    }

    removeItem(itemID: string) {
        this.studyItems.filter((item: StudyItem) => item.id !== itemID);
    }

}