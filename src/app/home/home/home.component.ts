import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  user = this.accountService.userValue;

  constructor(private accountService: AccountService) { }
}

 


