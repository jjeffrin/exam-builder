import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  showErrMsg: boolean = false;
  errMsg: string = "";
  userList: any[] = [];
  showModal: boolean = false;
  updateName: string = '';
  updateUsername: string = '';
  selectedUser: UserModel;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  newUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    type: new FormControl('dataEntry')
  })

  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
      console.log(data)
    });
  }

  onSubmit(): void {
    if (!this.newUserForm.invalid) {
      this.showErrMsg = false;
      console.log('then submit form');
      this.userService.addNewUser(this.newUserForm.value).toPromise().then(data => {
        this.errMsg = "User added successfully.";
        this.showErrMsg = true;
        this.getAllUsers();
        this.newUserForm.reset();
      }).catch(err => {
        this.errMsg = "User add process failed. Try again.";
        this.showErrMsg = true;
      });
    }
    else {
      this.errMsg = "Please fill in all fields."
      this.showErrMsg = true;
    }
  }

  closeAlert() {
    this.showErrMsg = false;
  }

  deleteUser(id: string) {
    this.userService.deleteUserById(id).toPromise().then(data => {
      if (data) {
        this.getAllUsers();
      }
    }).catch(err => {
      alert(err)
    })
  }

  updateUser(user: UserModel) {
    this.selectedUser = user;
    this.showModal = true;
    this.updateName = user.name;
    this.updateUsername = user.username;
    console.log(user.id)
  }

  closeModal() {
    this.showModal = false;
  }

  saveChanges() {
    this.selectedUser.name = this.updateName;
    this.selectedUser.username = this.updateUsername;
    this.userService.updateUser(this.selectedUser).toPromise().then(() => {
      this.showModal = false;
      this.getAllUsers();
    }).catch((err) => {
      alert(err);
    });
  }

}
