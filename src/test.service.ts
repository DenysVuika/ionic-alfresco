import { Injectable } from '@angular/core';

@Injectable()
export class TestService {

  test(): string {
    return 'hello world';
  }

}
