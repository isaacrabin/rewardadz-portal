import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transactions';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.scss']
})
export class ExpenditureComponent implements OnInit {
  public rows: Transaction[] = [];



  noCampaign: any;

  page = {
    currentPage:1,
    collectionSize:0,
    pageSize:10
  };


  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private service: TransactionService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAllPrimaryCampaigns()
  }



  getAllPrimaryCampaigns(){
    this.spinner.show()
    const userId = sessionStorage.getItem('userId');
    this.service.walletTransactions(userId).subscribe({
      next: (response) => {
        if(response.success === true){
       this.spinner.hide()
       let campaignlist = response.data
       this.rows = campaignlist.reverse();
       console.log(this.rows)
       this.page.collectionSize = this.rows.length;
       this.noCampaign = this.rows.length;

     }
     else{
      // this.loading = false
      this.spinner.hide()
       this.toastr.error("Error fetching campaigns","")
     }
      },
      error: (err) => {
      if(err.status === 403){
        this.toastr.info("Your session expired","");
        this.router.navigate(['./auth/login']);
      }
      if(err.status === 401){
        this.toastr.info("Contact your admin for access to this page","");
        this.router.navigate(['/dashboard/analytics']);
      }
      }
  });

  }

}
