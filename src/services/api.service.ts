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

      // TODO: temp hack for csrf token problem (0.3.4)
      let bpmAuth: any = this._instance.bpmAuth;
      let bpmClient = Object.getPrototypeOf(Object.getPrototypeOf(bpmAuth)) || {};
      bpmClient.setCsrfToken = function() {};

      // TODO: temp hack for csrf token problem (0.3.4)
      let ecmAuth: any = this._instance.ecmAuth;
      let ecmClient = Object.getPrototypeOf(Object.getPrototypeOf(ecmAuth)) || {};
      ecmClient.setCsrfToken = function() {};
    }

    return this._instance;
  }

  public setInstance(value: AlfrescoJsApi) {
    this._instance = value;
  }

  constructor(private settings: SettingsService) {
  }
}
