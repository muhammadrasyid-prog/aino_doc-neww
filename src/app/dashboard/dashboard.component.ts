import { Component, OnInit, OnDestroy } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { CarouselItem, carouselItems } from './menu-carousel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  dataDALength: any;
  dataITCMLength: any;
  dataBALength: any;
  // topcards: topcard[];
  dataListAllFormDA: any[] = [];
  dataListFormITCM: any[] = [];
  dataListAllBA: any[] = [];

  carouselItems: CarouselItem[] = carouselItems; // Pastikan carouselItems diimpor dengan benar
  currentIndex: number = 0;
  autoSlideInterval: ReturnType<typeof setInterval> | null = null; // Inisialisasi dengan null untuk menghindari kebingungan


  // constructor() {
    
  // }

  ngOnInit(): void {
    this.fetchDataFormDA();
    this.fetchDataFormITCM();
    this.fetchAllDataBA();
    this.startAutoSlide();
  }

  fetchDataFormDA(): void {
    axios
      .get(`${environment.apiUrl2}/dampak/analisa`)
      .then((response) => {
        if (response.data) {
          this.dataListAllFormDA = response.data;
          console.log(response.data);
          this.dataDALength = this.dataListAllFormDA.length;
        } else {
          console.log('Data is null');
          this.dataDALength = 0;
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 500) {
            console.log(error.response.data.message);
          }
        } else {
          console.error(error);
        }
      });
  }

  fetchDataFormITCM(): void {
    axios
      .get(`${environment.apiUrl2}/form/itcm`)
      .then((response) => {
        if (response.data) {
          this.dataListFormITCM = response.data;
          console.log(response.data);
          this.dataITCMLength = this.dataListFormITCM.length;
        } else {
          console.log('Data is null');
          this.dataITCMLength = 0;
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 500) {
            console.log(error.response.data.message);
          } else if (error.response.status === 404) {
            console.log(error.response.data.message);
          }
        } else {
          console.error(error);
        }
      });
  }

  fetchAllDataBA(): void {
    axios
      .get(`${environment.apiUrl2}/form/ba`)
      .then((response) => {
        if (response.data) {
          this.dataListAllBA = response.data;
          console.log(response.data);
          this.dataBALength = this.dataListAllBA.length;
        } else {
          console.log('Data is null');
          this.dataBALength = 0;
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 500) {
            console.log(error.response.data.message);
          }
        } else {
          console.error(error);
        }
      });
  }

  // ngOnInit(): void {
  //   this.startAutoSlide(); // Mulai auto-slide ketika komponen diinisialisasi
  // }

  ngOnDestroy(): void {
    this.stopAutoSlide(); // Hentikan auto-slide ketika komponen dihapus
  }

  // Mengatur item carousel yang ditampilkan
  setStep(index: number): void {
    this.currentIndex = index;
    this.resetAutoSlide(); // Reset auto-slide when a step button is clicked
  }

  // Menampilkan item carousel sebelumnya
  prevStep(): void {
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    this.resetAutoSlide(); // Reset auto-slide ketika tombol prev diklik
  }

  // Menampilkan item carousel berikutnya
  nextStep(): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    this.resetAutoSlide(); // Reset auto-slide ketika tombol next diklik
  }

  // Memulai auto-slide
  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextStep(); // Geser ke item berikutnya setiap beberapa detik
    }, 8000); // Sesuaikan interval waktu (5000ms = 5 detik)
  }

  // Menghentikan auto-slide
  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null; 
    }
  }

  // Mengatur ulang auto-slide
  resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}