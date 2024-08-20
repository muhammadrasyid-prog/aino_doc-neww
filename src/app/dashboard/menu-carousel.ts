// menu-carousel.ts

export interface CarouselItem {
    title: string;
    description: string;
    imageSrc: string;
  }
  
  export const carouselItems: CarouselItem[] = [
    {
      title: 'Membaca Seluruh Informasi',
      description: 'Membaca seluruh informasi ketentuan dan persyaratan yang berada di situs web ini.',
      imageSrc: 'https://img.freepik.com/free-photo/rainbow-with-rainbow-sky_1340-34542.jpg?t=st=1723687575~exp=1723691175~hmac=e99dcd0739f38f1afebf8650af6bdc9f30d24e6674ff63465aefe326c48ad9cc&w=996',
    },
    {
      title: 'Mengisi Formulir',
      description: 'Isi semua data yang diperlukan dengan benar.',
      imageSrc: 'https://i.pinimg.com/originals/c3/2a/cb/c32acb8b243d78c196a5ed7c89d52ea5.jpg',
    },
    {
      title: 'Mengunggah Dokumen',
      description: 'Unggah dokumen yang diperlukan untuk validasi.',
      imageSrc: 'https://img.freepik.com/free-photo/rainbow-with-rainbow-sky_1340-34542.jpg?t=st=1723687575~exp=1723691175~hmac=e99dcd0739f38f1afebf8650af6bdc9f30d24e6674ff63465aefe326c48ad9cc&w=996',
    },
    {
      title: 'Verifikasi Data',
      description: 'Tunggu verifikasi data dari tim kami.',
      imageSrc: 'https://i.pinimg.com/originals/c3/2a/cb/c32acb8b243d78c196a5ed7c89d52ea5.jpg',
    },
    {
      title: 'Selesai',
      description: 'Anda telah menyelesaikan seluruh proses.',
      imageSrc: 'https://img.freepik.com/free-photo/rainbow-with-rainbow-sky_1340-34542.jpg?t=st=1723687575~exp=1723691175~hmac=e99dcd0739f38f1afebf8650af6bdc9f30d24e6674ff63465aefe326c48ad9cc&w=996',
    }
  ];
  