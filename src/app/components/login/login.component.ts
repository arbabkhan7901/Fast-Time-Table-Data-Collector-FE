import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cilUser, cilLockLocked } from '@coreui/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public users = [
    {"username": "computer science", "password": "CS123"},
    {"username": "electrical engineering", "password": "EE123"},
    {"username": "civil engineering", "password": "civil123"},
    {"username": "humanity & management", "password": "hm123"}
  ]
  public error = '';
  public icons = { cilUser, cilLockLocked };
  constructor(private router: Router) {}

  login(username: string, password: string) {
    if (this.users.find(u => u.username === username && u.password === password)) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", username);
      localStorage.setItem("password", password )
      this.error = '';
      this.router.navigate(['nav-bar']);
      return;
    }
    this.error = "Wrong username or password";
  }
}
