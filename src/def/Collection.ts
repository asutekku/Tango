import {Deck} from './Deck';
import {UIItem} from './IUIitem';
import {DBCollection} from '../api/definitions';

export class Collection implements UIItem, DBCollection {
    private readonly _id: number;

    // ID should not be changed

    constructor(id: number, name: string, owner_id: number, description: string, created_on: string, decks?: Deck[]) {
        this._id = id ? id : 0;
        this._name = name;
        this._owner_id = owner_id;
        this._decks = decks ? decks : [];
        this._description = description ? description : '';
        this._created_on = created_on;
    }

    private _created_on: string;

    get created_on(): string {
        return this._created_on;
    }

    set created_on(value: string) {
        this._created_on = value;
    }

    private _owner_id: number;

    get owner_id(): number {
        return this._owner_id;
    }

    set owner_id(value: number) {
        this._owner_id = value;
    }

    private _description: string;

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    private _decks: Deck[]; //Array of deck IDs

    get decks(): Deck[] {
        return this._decks;
    }

    set decks(value: Deck[]) {
        this._decks = value;
    }

    get id(): number {
        return this._id;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    getDeckByID(id: number): Deck | undefined {
        return this.decks.find(d => d.id === id);
    }

    public addDeck(deck: Deck) {
        this._decks.push(deck);
    }

    public addDecks(decks: Deck[]) {
        this._decks = [...this._decks, ...decks];
    }

    toString() {
        return this._name;
    }

    public removeDeck(deck) {

    }
}