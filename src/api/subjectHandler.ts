import {http} from './calls';
import {DBSubject} from './definitions';

export async function getAllSubjects(): Promise<DBSubject[]> {
    return await http<DBSubject[]>(' http://localhost:3000/subjects/all/');
}

export async function getSubjectByID(id:number):Promise<DBSubject>{
    return await http<DBSubject>(` http://localhost:3000/subjects/find/${id.toString()}`);
}
