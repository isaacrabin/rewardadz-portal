import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  loading = false;
  form: FormGroup;
  submitted = false;
  rows: any[] = [];
  userId = sessionStorage.getItem('userId');

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: TeamService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.fb.group({
      name:["",[Validators.required]],
      email:["",[Validators.required]],
      password:["",[Validators.required]],
      role:["",[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.spinner.show()
    const userId = sessionStorage.getItem('userId');
    this.service.getOrgRoles(userId).subscribe({
      next: (resp) => {
        this.spinner.hide()
        switch (resp.success){
          case true:
            this.rows = resp.data;
            const totalUsers = this.rows.length;
            break;

          case false:
            this.rows = resp.data;
            this.service.teamMembers = resp.data;
            const totalUser = this.rows.length;
            break;

          default:
            this.toastr.error('Error occured. Try again later.')
            break;
        }
      },
      error: (err) => {
        this.spinner.hide()
      if(err.status === 403){
        this.toastr.info("Your session expired","");
        this.router.navigate(['./auth/sign-in']);
      }
      if(err.status === 401){
        this.toastr.info("Contact your admin for access to this page","");
        this.router.navigate(['/dashboard/analytics']);
      }
      }
  });

  }

  saveData(){
    this.submitted = true;
    this.loading = true;
    const {name, email, password,role} = this.form.value;
    const payload = {
      userName: name,
      userEmail: email,
      roleId: role,
      userPassword: password
    }
    this.service.addOrgUser(this.userId,payload).subscribe({
      next:(resp) => {
        this.loading = false;
        this.toastr.success("User added successfully");
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.error.error)
      }
    })


  }

}
