import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  fname: String;
  email: String;
  photoUrl: String;
  constructor(
    public sidebarservice: SidebarService,
    private _token: TokenStorageService,
    private _auth: AuthService
  ) {}

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  onSignOut() {
    this._auth.logout();
  }

  ngOnInit() {
    const { id, fname, email, photoUrl } = this._token.getUser();
    this.fname = fname;
    this.email = email;
    this.photoUrl = photoUrl;
    /* Search Bar */
    $(document).ready(function () {
      $('.mobile-search-icon').on('click', function () {
        $('.search-bar').addClass('full-search-bar');
      }),
        $('.search-close').on('click', function () {
          $('.search-bar').removeClass('full-search-bar');
        });
    });
  }
}
