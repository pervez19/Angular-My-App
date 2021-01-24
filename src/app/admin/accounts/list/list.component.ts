import { Component, OnInit } from '@angular/core';
import { Role } from '@app/_models/role.enum';
import { AccountService } from '@app/_services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  accounts: any[];
  Role = Role;
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
      this.accountList();
    }


    accountList(){
      this.accountService.getAll(this.thePageNumber-1,
        this.thePageSize)
          .pipe(first())
          .subscribe(accounts =>{
            this.accounts = accounts;
           // this.thePageNumber=accounts.page.number+1;
           // this.thePageSize=accounts.page.size;
           // this.theTotalElements=accounts.page.totalElements;
          });
    }
 

    deleteAccount(id: number) {
        const account = this.accounts.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id) 
            });
    }

    updatePageSize(pageSize:number)
    {
      this.thePageSize=pageSize;
      this.thePageNumber=1;
      this.accountList();
    }  

}
