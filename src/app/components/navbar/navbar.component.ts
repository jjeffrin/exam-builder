import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedInUserId: string | null;
  loggedInUserName: string | null;
  loggedInUserType: string | null;

  constructor(
    private router: Router
  ) { 
    this.loggedInUserId = ''
    this.loggedInUserName = ''
    this.loggedInUserType = ''
  }

  ngOnInit(): void {
    this.loggedInUserId = localStorage.getItem('examBuilderUserId')
    this.loggedInUserName = localStorage.getItem('examBuilderUserName')
    this.loggedInUserType = localStorage.getItem('examBuilderUserType')
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
