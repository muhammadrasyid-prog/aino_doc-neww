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
import { documentService } from '../../services/doc-control-service/doc-control-service.service';
import Swal from 'sweetalert2';
import axios from 'axios';

declare var $: any;

interface documents {
  document_uuid: string;
  document_code: string;
  document_name: string;
}

@Component({
  selector: 'app-document-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './document-control.component.html',
  styleUrl: './document-control.component.css'
})
export class DocumentControlComponent implements OnInit {

  searchText: string = '';

  document_uuid: string = '';
  document_code: string = '';
  document_name: string = '';
  user_uuid: any;
  user_name: any;
  role_code: any;

  isModalAddOpen = false;
  isModalEditOpen = false;
  isModalDetailOpen = false;

  constructor(
    private cookieService: CookieService,
    public documentService: documentService,
    @Inject('apiUrl') private apiUrl: string
  ) {

    this.apiUrl = apiUrl;
  }

  ngOnInit(): void {
    this.fetchDataDoc();
    this.profileData();
  }

  dataListDoc: documents[] = [];

  matchesSearch(item: documents): boolean {
    const searchLowerCase = this.searchText.toLowerCase();
    return (
      item.document_code.toLowerCase().includes(searchLowerCase) ||
      item.document_name.toLowerCase().includes(searchLowerCase)
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

  fetchDataDoc(): void {
    axios.get(`${environment.apiUrl2}/document`) 
      .then((response) => {
        this.dataListDoc = response.data;
        this.documentService.updateDataListDoc(this.dataListDoc);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error.response.data.message)
        } else if (error.response.status === 404) {
          console.log(error.response.data.message)
        }
      })
  }

  openModalAdd() {
    this.isModalAddOpen = true;
    this.document_code = '';
    this.document_name = '';
  }

  closeModalAdd() {
    this.isModalAddOpen = false;
  }

  addDocument() {
    const token = this.cookieService.get('userToken');

    axios.post(`${environment.apiUrl2}/superadmin/document/add`,
    { document_code: this.document_code, document_name: this.document_name },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )
      .then((response) => {
        console.log(response.data.message);
        this.fetchDataDoc();
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        $('#addDocModal').modal('hide');
        this.document_code = '';
        this.document_name = '';
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 422 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Terjadi kesalahan',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      this.isModalAddOpen = false;
  } 

  openModalEdit(documentUuid: string): void {
    axios.get(`${environment.apiUrl2}/document/` + documentUuid)
      .then((response) => {
        console.log(response.data)
        this.isModalEditOpen = true;
        const documentData = response.data;
        this.document_uuid = documentData.document_uuid;
        this.document_code = documentData.document_code;
        this.document_name = documentData.document_name;
      })
      .catch((error) => {
        if (error.response.status === 500 || error.response.status === 404) {
          console.log(error.response.data.message);
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          })
        } else (
          Swal.fire({
            title: 'Error',
            text: 'Terjadi kesalahan',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          })
        )
      })
      this.isModalEditOpen = false;
  }
  
  closeModalEdit() {
    this.isModalEditOpen = false;
  }

  updateDocument(): void {
    this.isModalEditOpen = true;
    const token = this.cookieService.get('userToken');
    const documentUuid = this.document_uuid;
    
    axios.put(`${environment.apiUrl2}/superadmin/document/update/${documentUuid}`,
    { document_code: this.document_code, document_name: this.document_name },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    )
      .then((response) => {
        console.log(response.data.message);
        this.fetchDataDoc();
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });

        $('#editDocModal').modal('hide');
      }) 
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 422 || error.response.status === 404 || error.response.status === 500) {
          Swal.fire({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Terjadi kesalahan',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      this.isModalEditOpen = false;
  }

  openModalDetail() {
    this.isModalDetailOpen = true;
  }

  closeModalDetail() {
    this.isModalDetailOpen = false;
  }
}

export { documents };
