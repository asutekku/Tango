export class Assignment {
    subject_unlocked: number | false;
    subject_started: number | false;
    subject_passed: number | false;
    subject_fi_passed: boolean;
    subject_fi_failed: boolean;
    subject_jp_passed: boolean;
    subject_jp_failed: boolean;
    subject_jp_reading_passed: boolean;
    subject_jp_reading_failed: boolean;
    subject_completed: boolean;
    readonly subject_type: wordType;
    private subject_level: number;
    private subject_mode: subjectMode;
    private readonly subject_fi: string;
    private readonly subject_jp: string;
    private readonly subject_jp_reading: string;
    subject_id: number;

    constructor(id: number, type: wordType, jp: string, jp_reading: string, fi: string) {
        this.subject_id = id;
        this.subject_type = type;
        this.subject_jp = jp;
        this.subject_jp_reading = jp_reading;
        this.subject_fi = fi;
        this.subject_level = 1;
        this.subject_unlocked = new Date().getDate();
        this.subject_started = false;
        this.subject_passed = false;
        this.subject_fi_passed = false;
        this.subject_jp_passed = false;
        this.subject_jp_reading_passed = false;
        this.subject_fi_failed = false;
        this.subject_jp_failed = false;
        this.subject_jp_reading_failed = false;
        this.subject_completed = false;
        this.subject_mode = subjectMode.japaneseToFinnish;
    }

    get mode(): subjectMode {
        return this.subject_mode;
    }

    get finnish() {
        return this.subject_fi;
    }

    get japanese() {
        return this.subject_jp;
    }

    get reading() {
        return this.subject_jp_reading;
    }

    get type() {
        return this.subject_type;
    }

    get done() {
        return this.subject_completed;
    }

    get level() {
        return this.subject_level;
    }

    public levelUp() {
        this.subject_level++;
    }


    public levelDown() {
        this.subject_level--;
    }

    public nextMode() {
        if (this.subject_mode === subjectMode.japaneseToFinnish) {
            this.subject_mode = subjectMode.japaneseToReading;
            return;
        } else if (this.subject_mode === subjectMode.japaneseToReading) {
            this.subject_mode = subjectMode.finnishToJapanese;
            return;
        } else if (this.subject_mode === subjectMode.finnishToJapanese) {
            this.subject_completed = true;
            return;
        }
    }
}

export enum wordType {
    kanji = 'kanji',
    radical = 'radical',
    word = 'word'
}

export enum language {
    finnish = 'finnish',
    japanese = 'japanese'
}

export enum subjectMode {
    finnishToJapanese = 'finnish',
    japaneseToFinnish = 'japanese',
    japaneseToReading = 'japanese_reading',
    radicalToFinnish = 'radical'
}