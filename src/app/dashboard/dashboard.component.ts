import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { CarouselItem, carouselItems } from './menu-carousel';
import { ShepherdService } from 'angular-shepherd';
import Shepherd from 'shepherd.js'; // Import Shepherd dari shepherd.js

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  dataDALength: any;
  dataITCMLength: any;
  dataBALength: any;
  dataListAllFormDA: any[] = [];
  dataListFormITCM: any[] = [];
  dataListAllBA: any[] = [];
  carouselItems: CarouselItem[] = carouselItems;
  currentIndex: number = 0;
  autoSlideInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private shepherdService: ShepherdService) {}
  private tour: Shepherd.Tour | null = null;

  ngOnInit(): void {
    this.fetchDataFormDA();
    this.fetchDataFormITCM();
    this.fetchAllDataBA();
    this.startAutoSlide();
    this.startTour();
  }

  fetchDataFormDA(): void {
    axios
      .get(`${environment.apiUrl2}/dampak/analisa`)
      .then((response) => {
        if (response.data) {
          this.dataListAllFormDA = response.data;
          this.dataDALength = this.dataListAllFormDA.length;
        } else {
          this.dataDALength = 0;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchDataFormITCM(): void {
    axios
      .get(`${environment.apiUrl2}/form/itcm`)
      .then((response) => {
        if (response.data) {
          this.dataListFormITCM = response.data;
          this.dataITCMLength = this.dataListFormITCM.length;
        } else {
          this.dataITCMLength = 0;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchAllDataBA(): void {
    axios
      .get(`${environment.apiUrl2}/form/ba`)
      .then((response) => {
        if (response.data) {
          this.dataListAllBA = response.data;
          this.dataBALength = this.dataListAllBA.length;
        } else {
          this.dataBALength = 0;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  setStep(index: number): void {
    this.currentIndex = index;
    this.resetAutoSlide();
  }

  prevStep(): void {
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    this.resetAutoSlide();
  }

  nextStep(): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    this.resetAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextStep();
    }, 8000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initTour();
    }, 500);
  }
  
  initTour() {
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
  
    this.addTourSteps();
    this.startTour();
  }
  
  addTourSteps() {
    if (!this.tour) return;
  
    this.tour.addSteps([
      {
        id: 'form-da-step',
        text: 'Ini adalah Form DA. Di sini Anda dapat melihat jumlah data yang terdaftar.',
        attachTo: {
          element: '#form-da',
          on: 'bottom'
        },
        scrollTo: { behavior: 'smooth', block: 'center' },
        modalOverlayOpeningPadding: 8,
        modalOverlayOpeningRadius: 4,
        buttons: [
          {
            text: 'Next',
            action: () => {
              this.tour?.next();
            }
          },
          {
            text: 'Cancel',
            action: () => {
              this.tour?.cancel();
            }
          }
        ]
      },
      {
        id: 'form-itcm-step',
        text: 'Ini adalah Form DA. Di sini Anda dapat melihat jumlah data yang terdaftar.',
        attachTo: {
          element: '#form-itcm',
          on: 'bottom'
        },
        scrollTo: { behavior: 'smooth', block: 'center' },
        modalOverlayOpeningPadding: 8,
        modalOverlayOpeningRadius: 4,
        buttons: [
          {
            text: 'Next',
            action: () => {
              this.tour?.next();
            }
          },
          {
            text: 'back',
            action: () => {
              this.tour?.back();
            }
          }
        ]
      },
      {
        id: 'form-da-step',
        text: 'Ini adalah Form DA. Di sini Anda dapat melihat jumlah data yang terdaftar.',
        attachTo: {
          element: '#form-ba',
          on: 'bottom'
        },
        scrollTo: { behavior: 'smooth', block: 'center' },
        modalOverlayOpeningPadding: 8,
        modalOverlayOpeningRadius: 4,
        buttons: [
          {
            text: 'Next',
            action: () => {
              this.tour?.next();
            }
          },
          {
            text: 'Back',
            action: () => {
              this.tour?.back();
            }
          }
        ]
      },
      // ... (langkah-langkah lainnya dengan pola yang sama)
      {
        id: 'form-hak-akses-step',
        text: 'Ini adalah langkah keempat dalam tour Anda.',
        attachTo: {
          element: '#form-hak-akses',
          on: 'bottom'
        },
        scrollTo: { behavior: 'smooth', block: 'center' },
        modalOverlayOpeningPadding: 8,
        modalOverlayOpeningRadius: 4,
        buttons: [
          {
            text: 'Finish',
            action: () => {
              this.closeTour();
            }
          },
          {
            text: 'Back',
            action: () => {
              this.tour?.back();
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

  closeTour() {
    if (this.tour) {
      this.tour.complete();
      const shepherdElements = document.querySelectorAll('.shepherd-element');
      shepherdElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
      const overlay = document.querySelector('.shepherd-modal-overlay-container');
      if (overlay) {
        overlay.remove();
      }
      this.tour = null;
    }
  }
  
  // startTour() {
  //   const tour = new Shepherd.Tour({
  //     defaultStepOptions: {
  //       classes: 'shepherd-theme-default',
  //       scrollTo: true,
  //       // Tambahkan opsi lain jika diperlukan
  //     },
  //     useModalOverlay: true,
  //   });
  
  //   tour.addSteps([
  //     {
  //       id: 'form-da-step',
  //       text: 'Ini adalah Form DA. Di sini Anda dapat melihat jumlah data yang terdaftar.',
  //       attachTo: {
  //         element: '#form-da',  // Sesuaikan ID elemen dengan elemen yang ada
  //         on: 'bottom'
  //       },
  //       scrollTo: { behavior: 'smooth', block: 'center' },
  //       modalOverlayOpeningPadding: 8,
  //       modalOverlayOpeningRadius: 4,
  //       buttons: [
  //         {
  //           text: 'Next',
  //           action: () => {
  //             tour.hide();
  //             setTimeout(() => {
  //               tour.next();
  //             }, 300); // sesuaikan dengan durasi transisi CSS
  //           }         
  //         },
  //         {
  //           text: 'Cancel',
  //           action: tour.cancel
  //         }
  //       ]
  //     },
  //     {
  //       id: 'form-itcm-step',
  //       text: 'Ini adalah langkah kedua dalam tour Anda.',
  //       attachTo: {
  //         element: '#form-itcm',  // Ganti dengan ID elemen yang relevan untuk langkah kedua
  //         on: 'bottom'
  //       },
  //       scrollTo: { behavior: 'smooth', block: 'center' },
  //       modalOverlayOpeningPadding: 8,
  //       modalOverlayOpeningRadius: 4,
  //       buttons: [
  //         {
  //           text: 'Next',
  //           action: () => {
  //             tour.hide();
  //             setTimeout(() => {
  //               tour.next();
  //             }, 300); // sesuaikan dengan durasi transisi CSS
  //           }
  //         },
  //         {
  //           text: 'Back',
  //           action: tour.back
  //         },
  //         {
  //           text: 'Cancel',
  //           action: tour.cancel
  //         }
  //       ]
  //     },
  //     {
  //       id: 'form-ba-step',
  //       text: 'Ini adalah langkah ketiga dalam tour Anda.',
  //       attachTo: {
  //         element: '#form-ba',  // Ganti dengan ID elemen yang relevan untuk langkah kedua
  //         on: 'bottom'
  //       },
  //       scrollTo: { behavior: 'smooth', block: 'center' },
  //       modalOverlayOpeningPadding: 8,
  //       modalOverlayOpeningRadius: 4,
  //       buttons: [
  //         {
  //           text: 'Next',
  //           action: () => {
  //             tour.hide();
  //             setTimeout(() => {
  //               tour.next();
  //             }, 300); // sesuaikan dengan durasi transisi CSS
  //           }
  //         },
  //         {
  //           text: 'Back',
  //           action: tour.back
  //         },
  //         {
  //           text: 'Cancel',
  //           action: tour.cancel
  //         }
  //       ]
  //     },
  //     {
  //       id: 'form-hak-akses-step',
  //       text: 'Ini adalah langkah keempat dalam tour Anda.',
  //       attachTo: {
  //         element: '#form-hak-akses',  // Ganti dengan ID elemen yang relevan untuk langkah kedua
  //         on: 'bottom'
  //       },
  //       scrollTo: { behavior: 'smooth', block: 'center' },
  //       modalOverlayOpeningPadding: 8,
  //       modalOverlayOpeningRadius: 4,
  //       buttons: [
  //         {
  //           text: 'Finish',
  //           action: function() {
  //             tour.complete();
  //           }

  //         },
  //         {
  //           text: 'Back',
  //           action: tour.back
  //         }
  //       ]
  //     }
  //   ]);
  
  //   // Mulai tur
  //   tour.start();
  // }  

}
