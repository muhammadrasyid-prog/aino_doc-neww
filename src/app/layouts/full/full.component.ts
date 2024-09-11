import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../../navigations/sidebar/sidebar.component';
import { HeaderComponent } from '../../navigations/header/header.component';
import { ShepherdService } from 'angular-shepherd';
import Shepherd from 'shepherd.js';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './full.component.html',
  styleUrl: './full.component.css'
})
export class FullComponent implements AfterViewInit, OnDestroy {
  private tour: Shepherd.Tour | null = null;
  private routerSubscription: Subscription | null = null;
  private dashboardTourCompleted = false;

  constructor(
    private shepherdService: ShepherdService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.handleRouteChange(event.url);
    });

    // Inisialisasi tour dashboard jika ini adalah halaman awal
    if (this.router.url === '/dashboard') {
      setTimeout(() => {
        this.initTour('dashboardTour');
      }, 500);
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  handleRouteChange(url: string) {
    if (url === '/dashboard' && !this.dashboardTourCompleted) {
      this.initTour('dashboardTour');
    } else if (url === '/form/itcm' && this.dashboardTourCompleted) {
      this.initTour('itcmTour');
    }
  }

  initTour(tourType: 'dashboardTour' | 'itcmTour') {
    if (this.tour) {
      this.tour.complete();
    }

    this.tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: 'shepherd-theme-default',
        scrollTo: { behavior: 'smooth', block: 'center' },
      },
      useModalOverlay: true,
    });

    if (tourType === 'dashboardTour') {
      this.addDashboardTourSteps();
    } else {
      this.addItcmTourSteps();
    }

    this.startTour();
  }

  addDashboardTourSteps() {
    if (!this.tour) return;

    this.tour.addSteps([
      {
        id: 'dashboard-welcome',
        text: 'Selamat datang di Dashboard. Mari kita mulai tour!',
        attachTo: {
          element: '#dashboard',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Next',
            action: this.tour.next
          }
        ]
      },
      // ... Tambahkan langkah-langkah lain untuk tour dashboard
      {
        id: 'dashboard-end',
        text: 'Ini adalah akhir dari tour dashboard.',
        buttons: [
          {
            text: 'Finish',
            action: () => {
              this.dashboardTourCompleted = true;
              this.tour?.complete();
            }
          }
        ]
      }
    ]);
  }

  addItcmTourSteps() {
    if (!this.tour) return;

    this.tour.addSteps([
      {
        id: 'itcm-welcome',
        text: 'Selamat datang di Form ITCM. Mari kita mulai tour!',
        attachTo: {
          element: '#table-search',
          on: 'bottom'
        },
        buttons: [
          {
            text: 'Next',
            action: this.tour.next
          }
        ]
      },
      // ... Tambahkan langkah-langkah lain untuk tour ITCM
      {
        id: 'itcm-end',
        text: 'Ini adalah akhir dari tour ITCM.',
        buttons: [
          {
            text: 'Finish',
            action: () => {
              this.tour?.complete();
            }
          }
        ]
      }
    ]);
  }

  startTour() {
    if (this.tour) {
      this.tour.start();
    }
  }
}