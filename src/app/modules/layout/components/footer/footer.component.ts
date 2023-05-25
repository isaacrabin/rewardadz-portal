import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  myDate = new Date()

  public year: number = new Date().getFullYear();

  constructor() {
    this.myDate = new Date();
  }

  ngOnInit(): void { }
}
