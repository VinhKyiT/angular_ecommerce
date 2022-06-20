import { Router } from '@angular/router';
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
  user: any;

  constructor(
    public sidebarservice: SidebarService,
    private _token: TokenStorageService,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.user = this._auth.getUser();
  }

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
    if (!this.user) {
      //navigate to login
      this._router.navigate(['/auth/sign-in']);
    } else {
      const { id, fname, email, photoUrl } = this._token.getUser();
      this.fname = fname;
      this.email = email;
      this.photoUrl = photoUrl || './assets/images/avatars/default-avatar.png';
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
}
