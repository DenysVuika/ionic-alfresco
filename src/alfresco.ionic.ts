import { SettingsService } from './services/settings.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

export * from './services/settings.service';
export * from './services/api.service';
export * from './services/auth.service';

export const ALFRESCO_IONIC_PROVIDERS: any[] = [
  SettingsService,
  ApiService,
  AuthService
];
