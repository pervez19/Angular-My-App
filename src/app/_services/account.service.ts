import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Role } from '@app/_models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( 
    private router: Router,
    private http: HttpClient
    ) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: any, password: any) {
    console.log(email);
      return this.http.post<User>(`${environment.apiUrl}/authenticate`, { email, password },this.httpOptions)
          .pipe(map(user => {
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
          }));
  }

  logout() {
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/account/login']);
  }

  register(user: User) : Observable<any> {
      if(user.role==null){user.role= Role.User;}
      return this.http.post(`${environment.apiUrl}/register`, user, this.httpOptions);
  }

  getAll(thePage:number,thePageSize:number): Observable<User[]> {
      return this.http.get<User[]>(`${environment.apiUrl}`);
  }

  getById(id: number) {
      return this.http.get<User>(`${environment.apiUrl}/${id}`);
  }

  update(id:number, params: any) {
      return this.http.put(`${environment.apiUrl}/${id}`, params,this.httpOptions)
          .pipe(map(x => {
              if (id == this.userValue.id) {
                  const user = { ...this.userValue, ...params };
                  localStorage.setItem('user', JSON.stringify(user));
                  this.userSubject.next(user);
              }
              return x;
          }));
  }

  delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/${id}`,this.httpOptions)
          .pipe(map(x => {
              if (id == this.userValue.id) {
                  this.logout();
              }
              return x;
          }));
  }

}


interface GetResponseUsers{
  
    users:User[];

  page:{
    size: number;
    totalElements:number;
    totalPages:number;
    number:number;
  }
}