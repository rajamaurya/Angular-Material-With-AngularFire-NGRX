import { Component, OnInit , EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/authService.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  constructor(private authService: AuthService) { }
   @Output() sideListClose = new EventEmitter<void>();
  ngOnInit() {
  }
  onClose(){
     this.sideListClose.emit();
  }
  onLogout(){
      this.authService.logout();
      this.onClose();
  }
}
