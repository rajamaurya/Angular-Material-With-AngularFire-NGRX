import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from '../auth/user.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router'

@Injectable({
    providedIn:'root'
})
export class AuthService{

    user:User;
    authData: AuthData;
    isAuth = new Subject<boolean>();
   
   constructor(private  router: Router){

   }

    register(authData: AuthData){
      this.user = {
         email: authData.email,
         userId: Math.floor(Math.random()* 10000).toString()
      }
      this.isAuth.next(true);
      this.router.navigate(['/login']);
    }
    login(authData: AuthData){
        this.authData = {
           email: authData.email,
           password: authData.password
        }
        this.isAuth.next(true);
        this.router.navigate(['/training'])
      }
      logout(){
          this.user = null;
          this.isAuth.next(false);
          this.router.navigate(['/login'])
      }
      getUser(){
          return {...this.user}
      }
      isValidUser(){
          return this.user!=null;
      }
      
}