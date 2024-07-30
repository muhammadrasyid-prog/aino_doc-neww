import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormGroupDirective,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product-service/product-service.service';
import Swal from 'sweetalert2';
import axios from 'axios';

declare var $: any;

interface Product {
  product_uuid: string;
  product_name: string;
  product_owner: string;
  product_order: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  deleted_by: string;
  deleted_at: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  searchText: string = '';

  product_uuid: string = '';
  product_name: string = '';
  product_owner: string = '';
  product_order: string = '';
  created_by: string = '';
  created_at: string = '';
  updated_by: string = '';
  updated_at: string = '';
  deleted_by: string = '';
  deleted_at: string = '';
  user_uuid: any;
  user_name: any;
  role_code: any;

  isModalAddOpen = false;
  isModalEditOpen = false;
  isModalDetailOpen = false;

  constructor(
    private cookieService: CookieService,
    public productService: ProductService,
    @Inject('apiUrl') private apiUrl: string
    ) {
      this.apiUrl = apiUrl;
    }

  dataListProduct: any[] = [];

  ngOnInit(): void {
    this.fetchDataProduct();
    this.profileData();
  }

  matchesSearch(item: any): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    return (
      item.product_name.toLowerCase().includes(searchLowerCase) ||
      item.product_owner.toLowerCase().includes(searchLowerCase)
    );
  }

  profileData(): void {
    const token = this.cookieService.get('userToken');

    axios.get(`${this.apiUrl}/auth/my/profile`, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        this.user_uuid = response.data.user_uuid;
        this.user_name = response.data.user_name;
        this.role_code = response.data.role_code;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchDataProduct(): void {
    axios.get(`${environment.apiUrl2}/product`)
    .then((response) => {
      this.dataListProduct = response.data;
      this.productService.updateDataListProduct(this.dataListProduct);
    })
    .catch((error) => {
      if(error.response.status === 500) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    });
  }

  openModalAdd() {
    this.isModalAddOpen = true;
    this.product_name = '';
    this.product_owner = '';
  }

  closeModalAdd() {
    this.isModalAddOpen = false;
  }

  addProduct(): void {
    const token = this.cookieService.get('userToken');

    axios.post(`${environment.apiUrl2}/superadmin/product/add`, {
      product_name: this.product_name,
      product_owner: this.product_owner
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
      this.fetchDataProduct();
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Product baru ditambahkan',
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch((error) => {
      if (error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Terjadi kesalahan',
          icon: 'error'
        });
      }
    });
    this.isModalAddOpen = false;
  }

  openModalEdit(product_uuid: string) {
    axios.get(`${environment.apiUrl2}/product/${product_uuid}`)
    .then((response) => {
      this.isModalEditOpen = true;
      console.log(response.data);
      this.product_uuid = response.data.product_uuid;
      this.product_name = response.data.product_name;
      this.product_owner = response.data.product_owner;
      $('#editProductModal').modal('show');
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
    this.isModalEditOpen = false;
  }

  closeModalEdit() {
    this.isModalEditOpen = false;
  }

  updateProduct(): void {
    const token = this.cookieService.get('userToken');
    axios.put(`${environment.apiUrl2}/superadmin/product/update/${this.product_uuid}`, {
      product_name: this.product_name,
      product_owner: this.product_owner
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
      this.fetchDataProduct();
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Produk diperbarui',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 500 || error.response.status === 404 || error.response.status === 422 || error.response.status === 400) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
    this.isModalEditOpen = false;
  }

  openModalDetail() {
    this.isModalDetailOpen = true;
  }

  closeModalDetail() {
    this.isModalDetailOpen = false;
  }

}
export { Product };