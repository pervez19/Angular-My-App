import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,  AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { NoWhiteSpace } from '../../_shared/customvalidator.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  
  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
  ) { }

  ngOnInit(): void {
   // NoWhiteSpace
   this.form = this.formBuilder.group({
      firstName: new FormControl( '', [ Validators.required ]),
      lastName: new FormControl('',[ Validators.required ]),
      email: new FormControl('',[ Validators.required, Validators.email ]),
      password: new FormControl ('',[Validators.required, Validators.minLength(6)])
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
      this.accountService.register(this.form.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                  this.router.navigate(['../login'], { relativeTo: this.route });
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  
    


  }
}
