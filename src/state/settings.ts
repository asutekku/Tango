export class AppSettings {
    private static _darkMode: boolean = false;

    static get darkMode(): boolean {
        return this._darkMode;
    }

    private static _showHiragana: boolean = false;

    static get showHiragana(): boolean {
        return AppSettings._showHiragana;
    }

    static toggleDarkMode(): boolean {
        this._darkMode = !this._darkMode;
        return this._darkMode;
    }

    static toggleHiragana(): boolean {
        this._showHiragana = !this._showHiragana;
        return this._showHiragana;
    }
}