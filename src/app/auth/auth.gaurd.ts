import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'
import { AuthService } from './authService.service';

export class AuthGaurd implements CanActivate{

     constructor(private authService: AuthService, private router:Router){}
    canActivate( route: ActivatedRouteSnapshot,  state: RouterStateSnapshot){
     
        if(this.authService.isValidUser()){
            return true;
        }
        else{
           this.router.navigate(['/login'])
        }
    }
}