import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-camapign-assets',
  templateUrl: './camapign-assets.component.html',
  styleUrls: ['./camapign-assets.component.scss']
})
export class CamapignAssetsComponent implements OnInit {

  percentDone: any = "";
  form: FormGroup;
  loading = false;
  uploadingLogo = false;
  uploadingFile = false;
  progress: number = 0;
  iconUrl!: string | ArrayBuffer | null;
  format!: string;

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
    this.uploadingLogo = true;
    const icon = event.target.files && event.target.files[0];
    const campaignAddress = sessionStorage.getItem('campaignAddress');

    if(icon.size > 26214400){
      this.toastr.error("File too big.Upload a file less than 25Mb","");
    }else{
      let formData = new FormData();
      this.uploadIcon = this.icon.nativeElement.files.item(0);
      formData.append("icon",  this.uploadIcon);
      this.service.newStep21(formData,campaignAddress, ).subscribe({
        next:(event: HttpEvent<any>)=>{
        this.loading = false
        this.uploadingLogo = false;
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




  addFile(event:any){
    this.loading = true;
    this.uploadingFile = true;
    const file = event.target.files && event.target.files[0];
    const campaignAddress = sessionStorage.getItem('campaignAddress');

    if(file.size > 26214400){
      this.toastr.error("File too big.Upload a file less than 25Mb","");
    }else{
      let formData = new FormData();
      this.uploadFile = this.file.nativeElement.files.item(0);
      formData.append("file",this.uploadFile);
      this.service.newStep22(formData,campaignAddress).subscribe({
        next:(event: HttpEvent<any>)=>{
        this.loading = false
        this.uploadingFile = false;
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
            this.toastr.success('Campaign file saved successfully','')
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
        }
        },
        error:(err) => {
          if(err.status === 403){
            this.toastr.info("Your session expired","");
            this.router.navigate(['./auth/sign-in']);
          }
          else if(err.status === 401){
            this.toastr.info("Contact your admin for access to this page","");
            this.router.navigate(['/dashboard/analytics']);
          }
          else{
            this.toastr.info('Error: ',err);
          }

        }
      })
    }

  }

  saveDetails(){

  }

}
