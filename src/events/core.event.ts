export class CoreEvent<T> {

  private _defaultPrevented: boolean = false;
  private _value: T;

  get value() {
    return this._value;
  }

  get defaultPrevented() {
    return this._defaultPrevented;
  }

  constructor(value: T) {
    this._value = value;
  }

  preventDefault() {
    this._defaultPrevented = true;
  }
}
