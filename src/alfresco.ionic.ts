import { SettingsService } from './services/settings.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { NodeService } from './services/node.service';

import { FileViewComponent } from './components/file-view/file-view';
import { LoginComponent } from './components/login/login.component';

export * from './services/settings.service';
export * from './services/api.service';
export * from './services/auth.service';
export * from './services/node.service';

export * from './components/file-view/file-view';
export * from './components/login/login.component';

export const ALFRESCO_IONIC_PROVIDERS: any[] = [
  SettingsService,
  ApiService,
  AuthService,
  NodeService
];

export const ALFRESCO_IONIC_DIRECTIVES: any[] = [
  FileViewComponent,
  LoginComponent
];
