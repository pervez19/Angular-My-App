import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
     const users = [
      { id: 108, email: 'user@gmail.com', password: '123456', firstName: 'Fokhrul', lastName: 'Pervez', role: 'Role.User' },
      { id: 110, email: 'admin@gmail.com', password: '123456', firstName: 'Fokhrul', lastName: 'Pervez', role: 'Role.Admin' }
     ];
    return {users};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 110;
  }

}
