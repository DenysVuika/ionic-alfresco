import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  private _ecmHost: string = 'http://0.0.0.0:8080';
  private _bpmHost: string = 'http://0.0.0.0:9999';

  getEcmHost(): string {
    return this._ecmHost;
  }

  setEcmHost(value: string) {
    this._ecmHost = value;
  }

  getBpmHost(): string {
    return this._bpmHost;
  }

  setBpmHost(value: string) {
    this._bpmHost = value;
  }
}
