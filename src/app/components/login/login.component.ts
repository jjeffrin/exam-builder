import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // screen properties
  username: string;
  password: string;
  errMsg: string = "";
  showValidationMsg: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { 
    this.username = ''
    this.password = ''
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.username == undefined || this.password == undefined) {
      this.showValidationMsg = true;
      this.errMsg = "Please fill in both fields."
    }
    else if (this.username.trim() == '' || this.password.trim() == '') {
      this.showValidationMsg = true;
      this.errMsg = "Please fill in both fields."
    }
    else {
      this.showValidationMsg = false;
      this.userService.loginUser(this.username, this.password).toPromise().then(data => {
        localStorage.setItem("examBuilderUserId", data.body.id)
        localStorage.setItem("examBuilderUserName", data.body.name)
        localStorage.setItem("examBuilderUserType", data.body.type)
        this.router.navigate(['/dashboard'])
      }).catch((err) => {
        if (err.status != 200) {
          this.showValidationMsg = true;
          this.errMsg = "Please check your credentials."
        }
      })
    }
  }

  validateInputFields(): void {
    if (this.username.trim() == '' || this.password.trim() == '') {
      this.showValidationMsg = true;
      this.errMsg = "Please fill in both fields."
    }
    else {
      this.showValidationMsg = false;
    }
  }

  closeAlert() {
    this.showValidationMsg = false;
  }

}


