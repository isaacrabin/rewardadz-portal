import { Permission } from './../../../../core/models/data.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.scss']
})
export class NewRoleComponent implements OnInit {

  submitted = false;
  loading = false;
  permissions: Permission[] = [];
  form: FormGroup;
  addedPermission: any[] = [];
  userId = sessionStorage.getItem('userId');

  geofencing = false;


  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CampaignService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ["",[Validators.required]],
      permission:[false,[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.getPermissions();
  }

  checkIfExists(arr: any[], str: any) {
    return arr.includes(str);
  }

  addPermission(event: any, perm: Permission){
    const permissionExist = this.checkIfExists(this.addedPermission, perm._id);
    if(event.target.checked && !permissionExist){
      this.addedPermission.push(perm._id);
    }
  }

  saveData(){
    const {name} = this.form.value;
    this.loading = true;
    const payload = {
      role_name: name,
      permissions: this.addedPermission,
      org_id:this.userId
    }
    this.service.addRole(payload).subscribe({
      next:(resp: any) => {
        this.loading = false;
        switch(resp.success){
          case true:
            this.toastr.success('Role added successfully');
            this.router.navigate(['app/dashboard/roles'])
            break;
          case false:
            this.toastr.error('Failed to add role');
            break;
          default:
            break;
        }
      },
      error:(err) => {
        this.loading = false;
        this.toastr.error('ailed to add role');
      }
    })
  }

  getPermissions(){
    this.loading = true;
    this.service.getPermissions().subscribe({
      next: (resp: any) => {
        this.loading = false;
        switch(resp.success){
          case true:
            this.permissions = resp.data;
            break;

          case false:
            break;

          default:
            break;
        }

      },
      error: (err) => {
        this.loading = false;
        if(err.status === 403){
          this.toastr.info("Your session expired","");
          this.router.navigate(['./auth/sign-in']);
        }
        else if(err.status === 401){
          this.toastr.info("Contact your admin for access to this page","");
          this.router.navigate(['/app/dashboard/analytics']);
        }
        else if(err.status === 400){
          this.toastr.info("Access to this page is denied. Please contact your Admin.","");
          this.router.navigate(['/app/dashboard/analytics']);
        }
        else{
          this.toastr.error("Error: ",err);
        }
      }
    })
  }

}
