import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/_services/account.service';
import { AlertService } from '@app/_services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  id: number;
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
  this.id = this.route.snapshot.params['id'];

  this.form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
   });

   this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
 }
 
 get f() { return this.form.controls; }

 onSubmit() {
  this.submitted = true;

  this.alertService.clear();

  if (this.form.invalid) {
      return;
  }
  this.accountService.update(this.id, this.form.value)
  .pipe(first())
  .subscribe({
      next: () => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
      },
      error: error => {
          this.alertService.error(error);
          this.loading = false;
      }
  });
 
} 
}