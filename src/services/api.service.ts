import { Injectable } from '@angular/core';
import { AlfrescoJsApi, AlfrescoApiConfig } from 'alfresco-js-api';
import { SettingsService } from './settings.service';

declare let AlfrescoApi: AlfrescoJsApi;

@Injectable()
export class ApiService {

  private _instance: AlfrescoJsApi;

  public getInstance(): AlfrescoJsApi {
    if (!this._instance) {
      let config = {
        hostEcm: this.settings.getEcmHost(),
        hostBpm: this.settings.getBpmHost()
      };

      this._instance = new AlfrescoApi(config as AlfrescoApiConfig);
    }

    return this._instance;
  }

  public setInstance(value: AlfrescoJsApi) {
    this._instance = value;
  }

  constructor(private settings: SettingsService) {
  }
}
