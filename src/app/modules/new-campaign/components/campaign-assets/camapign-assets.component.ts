import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ValidationError } from 'ngx-awesome-uploader';

@Component({
  selector: 'app-camapign-assets',
  templateUrl: './camapign-assets.component.html',
  styleUrls: ['./camapign-assets.component.scss']
})
export class CamapignAssetsComponent implements OnInit {

  percentDone: any = "";
  form: FormGroup;
  loading = false;
  progress: number = 0;

  selectedFile: File | null = null;



  uploadIcon!: File;
  uploadFile!: File;
  @ViewChild("file", { static: false })
  file!: ElementRef;
  @ViewChild("icon", { static: false })
  icon!: ElementRef;

  @ViewChild('icon') el!: ElementRef;
  selectedCampaignType = sessionStorage.getItem('selectedType');


  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private service: ApiService,
    private toastr: ToastrService,
    private _httpClient: HttpClient
    ){
   this.form = this.fb.group({
    icon:[''],
    file:['']
   })
  }



  ngOnInit(): void {

  }

  next(){
    this.router.navigate(['new-campaign/metrics'])
  }



  addLogo(event: any){
    this.loading = true;
    const icon = event.target.files && event.target.files[0];
    const campaignAddress = sessionStorage.getItem('campaignAddress');

    if(icon.size > 26214400){
      this.toastr.error("File too big.Upload a file less than 25Mb","");
    }else{
      let formData = new FormData();
      this.uploadIcon = this.icon.nativeElement.files.item(0);
      formData.append("icon",  this.uploadIcon);
      this.service.newStep21(campaignAddress, formData).subscribe({
        next:(event: HttpEvent<any>)=>{
        this.loading = false
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            let total: any = 0;
                total = event.total;
            this.progress = Math.round(event.loaded / total * 100);
            break;
          case HttpEventType.Response:
            this.toastr.success('Campaign icon saved successfully','')
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
        }
        },
        error:(err) => {
          this.toastr.error('Error:',err)
        }
      })
    }

  }

  public uploadSuccess(event: any): void {
    console.log(event);
  }

  public onValidationError(error: ValidationError): void {
    alert(`Validation Error ${error.error} in ${error.file?.name}`);
  }

  addFile(event:any){}

  saveDetails(){}

  uploadFile1(event: any) {
    this.percentDone = "0%";
    const campaignAddress = sessionStorage.getItem('campaignAddress');
    // console.log(event.target['files'][0]);
    const formData = new FormData();
    formData.append("file", event.target["files"][0]);


    this._httpClient
      .post(`https://demo.rewardadz.com/portal/campaigns/create/step2/icon/${campaignAddress}`, formData, {
        reportProgress: true,
        observe: "events",
        responseType:'json'

      })
      .subscribe((response: any) => {
        if (response.type === HttpEventType["UploadProgress"]) {
          const percentDone = Math.round(
            (100 * response.loaded) / response.total
          );
          this.percentDone = percentDone;
          if (this.percentDone === 100) {
            this.percentDone = this.percentDone + "%";
            setTimeout(() => {
              this.percentDone = "Completed...";
            }, 0);
            setTimeout(() => {
              this.percentDone = "";
            }, 2000);
          } else {
            this.percentDone = this.percentDone + "%";
          }
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          console.log("File is completely uploaded!");
        }
      });
  }

  onFileSelected(event: Event) {
    const campaignAddress = sessionStorage.getItem('campaignAddress');
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.service.uploadFile(this.selectedFile,campaignAddress)
      .subscribe(response => {
        // Handle the response here
        console.log(response);
      });
    } else {
      this.selectedFile = null;
    }
  }

  uploadFile9() {
    const campaignAddress = sessionStorage.getItem('campaignAddress');
    if (this.selectedFile) {
      this.service.uploadFile(this.selectedFile,campaignAddress)
        .subscribe(response => {
          // Handle the response here
          console.log(response);
        });
    }
  }
}
