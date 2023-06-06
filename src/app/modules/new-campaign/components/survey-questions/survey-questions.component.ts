import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit {

  form!:FormGroup;
  submitted = false;
  loading = false;
  attempt = 0;
  openQuestion = true;

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
      option1:[""],
      option2:[""],
      option3:[""]
    });
    this.attempt = this.service.noOfAttempts;
  }

  ngOnInit(): void {
  }

  toggleQuestionType(){
    this.openQuestion = !this.openQuestion;
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

      switch(this.openQuestion){
        case true:
          const payload = {
            campaignQuestion:question,
            type:'open'
          };
          this.service.addOpenSurvey(campaignAddress, payload).subscribe({
            next:(resp) =>{
              this.loading = false
              this.submitted = false;
              this.service.surveyQuizes += 1;
              this.toastr.success('Saved successfully','');
              this.form.reset();
            },
            error:(err: HttpErrorResponse) =>{
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
          break;

        case false:
          const payload2 = {
            question: question,
            solution:option1,
            opt1:option1,
            opt2:option2,
            opt3:option3,
            type:'closed',
            inputType: 'radio'
          };
          this.service.addQuestionaire(campaignAddress, payload2).subscribe({
            next:(resp) =>{
              this.loading = false
              this.toastr.success('Saved successfully','');
              this.submitted = false;
              this.service.surveyQuizes += 1;
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
          break;

        default:
          this.toastr.error('Could not add questionnaire. Please try again later.');
          break;

      }
    }
  }

  nextPage(){
    if(this.service.surveyQuizes < 3){
      this.toastr.info('Add atleast three questions and continue.')
    }
    else{
      this.router.navigate(['/app/new-campaign/metrics']);
    }
  }


}
