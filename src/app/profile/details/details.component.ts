import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  account = this.accountService.userValue;

  constructor(private accountService: AccountService) { }
  ngOnInit(): void {}

}
