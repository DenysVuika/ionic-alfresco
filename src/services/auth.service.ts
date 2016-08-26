import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {

  constructor(private api: ApiService) {
  }

  isLoggedIn(): boolean {
    return this.api.getInstance().isLoggedIn();
  }

  getEcmTicket(): string {
    return this.api.getInstance().getTicketEcm();
  }

  getBpmTicket(): string {
    return this.api.getInstance().getTicketBpm();
  }

  login(username: string, password: string): Promise<string> {
    return this.api.getInstance().login(username, password);
  }

  logout(): Promise<any> {
    return this.api.getInstance().logout();
  }

}
