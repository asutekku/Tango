export enum verbForms {
    plainAffirmative = 'plain affirmative',
    politeAffirmative = 'polite affirmative',
    plainNegative = 'plain negative',
    politeNegative = 'polite negative',
    plainPast = 'plain past'
}

export interface TangoSettings {
    questions: number;
    level: number;
}