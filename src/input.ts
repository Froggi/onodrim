export class Input {
    private _currentKeyState: {[key: string]: boolean};
    constructor() {
        this._currentKeyState = {};
        window.addEventListener('keydown', (e) => {
            this._currentKeyState[e.keyCode] = true;
        });
        window.addEventListener('keyup', (e) => {
            this._currentKeyState[e.keyCode] = false;
        });
    }
    public isDown(key: KeyCode): boolean {
        return this._currentKeyState[key];
    }

    public isUp(key: KeyCode): boolean {
        return !this._currentKeyState[key];
    }
}
const instance = new Input();
export default instance;

export const enum KeyCode {
    Backspace=8,
    Tab=9,
    Enter=13,
    Shift=16,
    Ctrl=17,
    Alt=18,
    PauseBreak=19,
    CapsLock=20,
    Escape=27,
    PageUp=33,
    PageDown=34,
    End=35,
    Home=36,
    Left=37,
    Up=38,
    Right=39,
    Down=40,
    Insert=45,
    Delete=46,
    Key0=48,
    Key1=49,
    Key2=50,
    Key3=51,
    Key4=52,
    Key5=53,
    Key6=54,
    Key7=55,
    Key8=56,
    Key9=57,
    A=65,
    B=66,
    C=67,
    D=68,
    E=69,
    F=70,
    G=71,
    H=72,
    I=73,
    J=74,
    K=75,
    L=76,
    M=77,
    N=78,
    O=79,
    P=80,
    Q=81,
    R=82,
    S=83,
    T=84,
    U=85,
    V=86,
    W=87,
    X=88,
    Y=89,
    Z=90,
    LeftWindowsKey=91,
    RightWindowsKey=92,
    SelectKey=93,
    Numpad0=96,
    Numpad1=97,
    Numpad2=98,
    Numpad3=99,
    Numpad4=100,
    Numpad5=101,
    Numpad6=102,
    Numpad7=103,
    Numpad8=104,
    Numpad9=105,
    Multiply=106,
    Add=107,
    Subtract=109,
    Decimalpoint=110,
    Divide=111,
    F1=112,
    F2=113,
    F3=114,
    F4=115,
    F5=116,
    F6=117,
    F7=118,
    F8=119,
    F9=120,
    F10=121,
    F11=122,
    F12=123,
    Numlock=144,
    ScrollLock=145,
    SemiColon=186,
    EqualSign=187,
    Comma=188,
    Dash=189,
    Period=190,
    ForwardSlash=191,
    GraveAccent=192,
    OpenBracket=219,
    BackSlash=220,
    CloseBraket=221,
    SingleQuote=222
}
