import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('body').css('overflow','hidden');
    // page loader hidden
    setTimeout(() => { 
     $('.lds-ellipsis').fadeOut();
     $('.preloader').delay(333).fadeOut('slow');
     $('body').delay(333);
     $('body').css('overflow','auto');
    },3000);

  }

}
