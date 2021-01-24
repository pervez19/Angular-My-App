import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/_services/account.service';
import { AlertService } from '@app/_services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  account = this.accountService.userValue;
  form: FormGroup;
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService,
      private alertService: AlertService
  ) { }


  
  ngOnInit() {
      this.form = this.formBuilder.group({
         
          firstName:new FormControl (this.account.firstName, [Validators.required]),
          lastName: new FormControl (this.account.lastName, [Validators.required]),
          dateOfBirth: new FormControl (this.account.dateOfBirth, [Validators.required]),
          gender:new FormControl (this.account.gender, [Validators.required]),
          phone:new FormControl (this.account.phone,[ Validators.pattern("^[0-9]*$"),
                    Validators.maxLength(11),Validators.minLength(11)
                  ])
      });
  }

  get f() { return this.form.controls; }

  onSubmit() {


      this.submitted = true;


      this.alertService.clear();

      if (this.form.invalid) {
        return;
    }
     
      this.loading = true;
      this.accountService.update(this.account.id, this.form.value)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Update successful', { keepAfterRouteChange: true });
                  this.router.navigate(['../'], { relativeTo: this.route });
              },
              error: error => {
                  this.alertService.error(error);
                  this.loading = false;
              }
          });
  }

}
