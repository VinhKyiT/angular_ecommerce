import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(
    private _api: ApiService,
    private _token: TokenStorageService,
    private _router: Router,
    private _auth: AuthService
  ) {
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {
    console.log({ user: this.user });
  }
}
