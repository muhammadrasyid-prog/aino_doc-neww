import { Component, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent { 
  role_code = '';

  private apiUrl: string;

  constructor(
    private cookieService: CookieService,
    // private router: Router,
    @Inject('apiUrl') apiUrl: string
  ) {
    this.apiUrl = apiUrl;
  }

  ngOnInit() {
    this.fetchProfileData();
    console.log('psdvzv',this.role_code)
    console.log(this.apiUrl);
    
  } 

  fetchProfileData(): void {
    const token = this.cookieService.get('userToken');

    axios
      .get(`${this.apiUrl}/auth/my/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // this.user_uuid = response.data.user_uuid;
        // this.user_name = response.data.user_name;
        this.role_code = response.data.role_code;
        console.log(this.role_code);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
} 
