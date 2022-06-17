import { TokenStorageService } from './../../services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _auth: AuthService,
    private _token: TokenStorageService
  ) {}

  // On Forgotpassword link click
  onForgotpassword() {
    this.router.navigate(['forgot-password'], {
      relativeTo: this.route.parent,
    });
  }

  // On Signup link click
  onSignup() {
    this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
  }

  onSubmit() {
    if (this.email && this.password) {
      this._auth
        .login({ email: this.email, password: this.password })
        .subscribe(
          (res) => {
            this.router.navigate(['/']);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  ngOnInit(): void {
    const { id, fname, email } = this._token.getUser();
    if (id) {
      this.router.navigate(['/']);
    }
  }
}
