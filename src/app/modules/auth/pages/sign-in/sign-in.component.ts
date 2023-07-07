import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  loading = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr:ToastrService,
    private readonly _router: Router) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;

  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;
    const payload = {
      email:email,
      password: password
    }
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    else{
      this.loading = true;
      this.service.loginUser(payload).subscribe((resp: any) => {
        this.loading = false;
        switch (resp.success) {
          case true:
            this.toastr.success("Login Success","");
            this.router.navigate(['/app/dashboard']);
            sessionStorage.setItem('profile',JSON.stringify(resp.data));
            sessionStorage.setItem('username',resp.data.user.username);
            sessionStorage.setItem('orgEmail',resp.data.user.email);
            sessionStorage.setItem('userId',resp.data.user._id);
            // sessionStorage.setItem('org',resp.data.organization.icon);
            sessionStorage.setItem('token',resp.data.token);
            console.log('TOKEN',resp.data.token)
            break;

          case false:
            this.toastr.warning("Invalid email or password");
            break;

           default:
             this.toastr.error("An error occured. Please try again later","");
             break
        }
      });
    }

    // this._router.navigate(['/']);
  }
}
