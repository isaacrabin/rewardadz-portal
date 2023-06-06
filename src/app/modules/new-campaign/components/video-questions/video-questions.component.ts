import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-video-questions',
  templateUrl: './video-questions.component.html',
  styleUrls: ['./video-questions.component.scss']
})
export class VideoQuestionsComponent implements OnInit {

  form!:FormGroup;
  submitted = false;
  loading = false;
  attempt = 0;

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ApiService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      question:["",[Validators.required]],
      option1:["",[Validators.required]],
      option2:["",[Validators.required]],
      option3:["",Validators.required]
    });
    this.attempt = this.service.noOfAttempts;
  }

  ngOnInit(): void {
  }

  saveDetails(){
    this.submitted = true;
    this.loading = true;
    if (this.form.invalid) {
      this.toastr.warning("Provide all required fields");
      this.loading = false;
      return;
    }
    else {
      const {question,option1,option2,option3} = this.form.value;
      const campaignAddress = sessionStorage.getItem('campaignAddress');
      const payload = {
        question: question,
        solution:option1,
        opt1: option1,
        opt2:option2,
        opt3:option3
      };
      this.service.addQuestionaire(campaignAddress, payload).subscribe({
        next:(resp) =>{
          this.loading = false
          this.toastr.success('Follow up question saved successfully','');
          this.submitted = false;
          this.service.noOfAttempts += 1;
          this.form.reset()
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false
          if(err.status === 403){
            this.toastr.info("Your session expired","");
            this.router.navigate(['./auth/sign-in']);
          }
          else if(err.status === 401){
            this.toastr.info("Contact your admin for access to this page","");
            this.router.navigate(['/app/dashboard/analytics']);
          }
          else{
            this.toastr.error(err.message);
          }

        }
      })
    }
  }

  nextPage(){
    if(this.service.noOfAttempts < 3){
      this.toastr.info('Add atleast three follow up questions and continue.')
    }
    else{
      this.router.navigate(['/app/new-campaign/metrics']);
    }
  }

}
