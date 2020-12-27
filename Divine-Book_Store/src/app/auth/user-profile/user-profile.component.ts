import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@core/user';
import { LogService } from '@core/utils/log.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'dp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  uname: string;
  email: String;
  oldpwd: string;
  pwd: string;
  confpwd: string;
  address: string;

  err: BehaviorSubject<string>;
  gotUser: User;
  userGroup: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private regSnakeBar: MatSnackBar,
    private logService: LogService
  ) {
    this.gotUser = this.authService.currentUser;
    //this.gotUser = this.authService.auth_get_user(this.authService.currentUser.email.toString());
    this.userGroup = new FormGroup({
      uname: new FormControl(this.gotUser.uname, [Validators.required]),
      oldpwd: new FormControl(this.gotUser.pwd, [Validators.required]),
      pwd: new FormControl(this.gotUser.pwd, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      confpwd: new FormControl(this.gotUser.pwd, [
        Validators.required,
        this.confpwdMatcher,
      ]),
      address: new FormControl(this.gotUser.address, [Validators.required]),
    });
    this.email = this.gotUser.email;
  }

  ngOnInit(): void {
    this.err = new BehaviorSubject('');
  }

  update() {
    if (this.userGroup.invalid) {
      return;
    }
    if (!this.old_pwd_validate()) {
      this.setErr('Old Password did not match');
      return;
    }
    const user = this.userGroup.getRawValue();
    user.email = this.email;
    delete user.oldpwd;
    const updUser = this.authService.auth_update(user).subscribe(
      (redirectUrl) => {
        this.openSnackBar('Account updated ', 'Successfully !');
        this.router.navigate([redirectUrl]);
      },
      (e) => this.setErr('Update failed. Please try again.')
    );
    if (!updUser) {
      this.setErr('Update Failed');
    }
  }

  old_pwd_validate() {
    if (this.userGroup.invalid) {
      return;
    }
    this.setErr('');
    const user = this.userGroup.getRawValue();
    const retUser = this.authService
      .auth_old_pwd_validate(
        this.email.toString(),
        this.userGroup.get('oldpwd').value
      )
      .subscribe(
        (a) => console.log('Old password matched'),
        (e) => {
          return null;
        }
      ); // this.setErr('Old Password Not matched'));
    this.logService.log(retUser, `    `, typeof retUser, ` In old_pwd_vali`);
    if (retUser !== null) {
      return true;
    } else {
      return false;
    }
  }

  delete() {
    if (!this.old_pwd_validate()) {
      this.setErr('Old Password did not match');
      return;
    }
    const delUser = this.authService.auth_delete(this.email);
    this.authService.auth_logout();
    this.router.navigate(['/']);
  }

  getEmailErrorMessage() {
    if (this.userGroup.get('email').hasError('required')) {
      return 'You must enter an email address';
    }

    return this.userGroup.get('email').hasError('email')
      ? 'Not a valid email address'
      : '';
  }

  getPwdErrorMessage() {
    if (this.userGroup.get('pwd').hasError('required')) {
      return 'You must enter a password';
    } else if (this.userGroup.get('pwd').hasError('minlength')) {
      return 'Minimum length is 3 letters';
    } else if (this.userGroup.get('pwd').hasError('maxlength')) {
      return 'Maximum length is 10 letters';
    }
    return '';
  }

  getConfpwdErrorMessage() {
    if (this.userGroup.get('confpwd').hasError('required')) {
      return 'You must enter a password again';
    }
    return 'Password did not matched with above';
  }

  hide = true;
  hide_conf = true;
  hide_old = true;

  confpwdMatcher(cntrl: FormControl) {
    const tpwd = cntrl.root.get('pwd');
    const matched =
      cntrl?.value != tpwd?.value ? { confpwdMatcher: true } : null;
    return tpwd && matched;
  }

  openSnackBar(message: string, action: string) {
    this.regSnakeBar.open(message, action, {
      duration: 2000,
    });
  }

  private setErr(err: any) {
    return this.err.next(err);
  }
}
