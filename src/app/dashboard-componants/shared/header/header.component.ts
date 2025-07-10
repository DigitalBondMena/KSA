import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthoService } from 'src/app/autho.service';
import { DashserviceService } from '../../dashservice.service';
declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _AuthoService: AuthoService,
    private _Dashservice: DashserviceService
  ) {}

  href: any;
  user_name: any = localStorage.getItem('user_name');
  user_image: any = localStorage.getItem('user_image');
  userSrc = 'https://digitalbondmena.com/hioe/userImages/';

  logOut() {
    localStorage.clear();
    this._Router.navigate(['/login']);
  }

  check() {
    this._AuthoService.check().subscribe(
      (res: any) => {
        if (res.success != 'true') {
          localStorage.clear();
          this._Router.navigate(['/login']);
        }
      },
      (errors: any) => {
        if (errors.error.message == 'Unathenticated') {
          localStorage.clear();
          this._Router.navigate(['/login']);
        }
      }
    );
  }

  ngOnInit(): void {
    this.check();
    $(document).ready(() => {
      $('#side-menu').metisMenu();
    });

    let e = document.body.getAttribute('data-sidebar-size');

    $('#vertical-menu-btn').on('click', (event: any) => {
      event.preventDefault();

      const body = $('body');
      body.toggleClass('sidebar-enable');

      if (992 <= $(window).width()) {
        let sidebarSize = body.attr('data-sidebar-size');
        let e = sidebarSize;

        if (e === null || e === 'lg') {
          body.attr('data-sidebar-size', 'sm');
        } else if (e === 'md') {
          body.attr('data-sidebar-size', 'sm');
        } else if (e === 'sm') {
          body.attr('data-sidebar-size', 'lg');
        } else {
          body.attr('data-sidebar-size', 'sm');
        }
      }
    });

    $('#sidebar-menu a').each(() => {
      var t = window.location.href.split(/[?#]/)[0];
      if (this.href == t) {
        $(this).addClass('active');
        $(this).parent().addClass('mm-active');
        $(this).parent().parent().addClass('mm-show');
        $(this).parent().parent().prev().addClass('mm-active');
        $(this).parent().parent().parent().addClass('mm-active');
        $(this).parent().parent().parent().parent().addClass('mm-show');
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('mm-active');
      }
    });

    $(document).ready(function () {
      var t;
      if (
        $('#sidebar-menu').length > 0 &&
        $('#sidebar-menu .mm-active .active').length > 0
      ) {
        if (300 < (t = $('#sidebar-menu .mm-active .active').offset().top)) {
          t -= 300;
          $('.vertical-menu .simplebar-content-wrapper').animate(
            {
              scrollTop: t,
            },
            'slow'
          );
        }
      }
    });

    $('.navbar-nav a').each(() => {
      var t = window.location.href.split(/[?#]/)[0];
      if (this.href == t) {
        $(this).addClass('active');
        $(this).parent().addClass('active');
        $(this).parent().parent().addClass('active');
        $(this).parent().parent().parent().addClass('active');
        $(this).parent().parent().parent().parent().addClass('active');
        $(this).parent().parent().parent().parent().parent().addClass('active');
        $(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('active');
      }
    });
  }

  updateSiteMap() {
    console.log('updateSiteMap');
    this._Dashservice.updateSiteMap().subscribe();
    this._Router.navigate(['/dashboard-home']);
  }
}
