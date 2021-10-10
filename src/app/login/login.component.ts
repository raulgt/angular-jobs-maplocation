import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserLoginDtoInput } from 'src/interfaces/user-authentication/UserLoginDtoInput';
import { UserLoginDtoOutput } from 'src/interfaces/user-authentication/UserLoginDtoOutput';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // variable to control shake animation in login form 
  public shake: boolean = false;

  //login form
  forms: FormGroup;
  
  constructor(private fb: FormBuilder, 
              private loginService: LoginServiceService,
              private router: Router) { 
    this.createForms();
  }

  ngOnInit(): void {
    this.checkForActiveUser();
  }

  createForms() {
    this.forms = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    });
  }

  saveLogginForm(){
     const userCredentials: UserLoginDtoInput = {
       email: this.forms.value.username,
       password: this.forms.value.pass
     }
      this.loginUser(userCredentials);
  }
  
  loginUser(userCredentials: UserLoginDtoInput){
    this.loginService.loginUser(userCredentials)
    .pipe(
      tap((res: UserLoginDtoOutput) =>{
         if(res && res.expires_in > 0){
          this.router.navigateByUrl('/tasks');
         }else{
           this.wrongLogin();
         }       
      })
    ).subscribe();
  }

  checkForActiveUser(){    
    const token = this.loginService.getToken();
     if(this.loginService.tokenValidation(token)){
      this.router.navigateByUrl('/tasks');
     }   
  }

  private wrongLogin(){
    this.loginService.logout();
    this.shakeAnimation(true);
    this.forms.reset();
    setTimeout(() => {
     this.shakeAnimation(false);
   }, 1500);
  }

  private shakeAnimation(flag: boolean){
    this.shake = flag;
  }

}
