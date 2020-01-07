/**
 * The definitions in this file are for the models in the database. They should be used
 * to get the right types when you're using the request API.
 */

interface dbItem {
    id: number;
    created_on: string;
}

export interface DBCollection extends dbItem {
    id: number;
    name: string;
    owner_id: number;
    description: string;
    created_on: string;
}

export interface DBDeck extends dbItem {
    id: number;
    name: string;
    owner_id: number;
    collection_id: number;
    description: string;
    created_on: string;
}

export interface DBWord extends dbItem {
    id: number;
    values: {}
}

export interface DBSubject {
    id: number;
    name: string;
    description: string;
    collections: number;
    image: string;
    learners: number;
    created_on: string;
}