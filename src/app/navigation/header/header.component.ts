import { Component, OnInit ,EventEmitter , Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/authService.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  isAuthenticated:any;
  authSubsription:Subscription;
  @Output() sideNavToggle = new EventEmitter<void>() 

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.authService.isAuth.subscribe(authData => this.isAuthenticated = authData)
  }
  onSideNavToggle(){
    this.sideNavToggle.emit();
  }
  onLogout(){
      this.authService.logout();
  }
  ngOnDestroy(){
    this.authSubsription.unsubscribe();
  }
}
