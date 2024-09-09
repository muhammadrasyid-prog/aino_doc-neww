import { Router } from '@angular/router';
import { ShepherdService } from 'angular-shepherd';
import { StepOptions, PopperPlacement } from 'shepherd.js'; // Impor tipe yang dibutuhkan

export const STEPS_BUTTONS = {
  back: {
    classes: 'back-button',
    secondary: true,
    text: 'Back',
    action: 'back', // Gunakan string untuk aksi
  },
  cancel: {
    classes: 'cancel-button',
    secondary: true,
    text: 'Exit',
    action: 'cancel', // Gunakan string untuk aksi
  },
  next: {
    classes: 'next-button',
    text: 'Next',
    action: 'next', // Gunakan string untuk aksi
  },
};

export const defaultStepOptions: StepOptions = {
  classes: 'shepherd-theme-arrows custom-default-class',
  scrollTo: true,
  cancelIcon: {
    enabled: true,
  },
};

export function getSteps(router: Router, service: ShepherdService): StepOptions[] {
  return [
    {
      attachTo: {
        element: 'header h1',
        on: 'bottom' as PopperPlacement, // Ubah ke PopperPlacement
      },
      buttons: [STEPS_BUTTONS.cancel, STEPS_BUTTONS.next],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'welcome',
      title: 'Welcome to Adventure Tours',
      text: 'Your journey begins here',
    },
    {
      attachTo: {
        element: '.main-content h2',
        on: 'bottom' as PopperPlacement, // Ubah ke PopperPlacement
      },
      buttons: [STEPS_BUTTONS.cancel, STEPS_BUTTONS.back, STEPS_BUTTONS.next],
      classes: 'orange',
      id: 'choose-adventure',
      title: 'Choose Your First Adventure',
      text: '',
    },
    {
      attachTo: {
        element: '.tour-card:nth-child(1) h2',
        on: 'bottom' as PopperPlacement, // Ubah ke PopperPlacement
      },
      buttons: [STEPS_BUTTONS.cancel, STEPS_BUTTONS.back, STEPS_BUTTONS.next],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'tour1',
      title: 'Tour 1: Mountain Expedition',
      text: 'Explore breathtaking mountain landscapes and challenge yourself with thrilling hikes.',
    },
    {
      attachTo: {
        element: '.tour-card:nth-child(2) h2',
        on: 'bottom' as PopperPlacement, // Ubah ke PopperPlacement
      },
      buttons: [STEPS_BUTTONS.cancel, STEPS_BUTTONS.next],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'tour2',
      title: 'Tour 2: Beach Paradise',
      text: 'Relax on pristine beaches, snorkel in crystal-clear waters, and enjoy the tropical sun.',
    },
    {
      attachTo: {
        element: '.tour-card:nth-child(3) h2',
        on: 'bottom' as PopperPlacement, // Ubah ke PopperPlacement
      },
      buttons: [STEPS_BUTTONS.cancel, STEPS_BUTTONS.back, STEPS_BUTTONS.next],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'tour3',
      title: 'Tour 3: Cultural Experience',
      text: 'Immerse yourself in the rich culture and history of the destinations we offer.',
    },
    {
      attachTo: {
        element: 'footer',
        on: 'top' as PopperPlacement, // Ubah ke PopperPlacement
      },
      buttons: [
        STEPS_BUTTONS.cancel,
        {
          text: 'Next',
          classes: 'dx-button-mode-contained dx-button-default dx-state-hover',
          action: function () {
            router.navigateByUrl('/promotion?showGuide=true');
            service.complete(); // Lengkapi tur ketika tombol diklik
          },
        },
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      id: 'footer',
      title: 'Adventure Tours',
      text: '© 2023 Adventure Tours. All rights reserved.',
    },
  ];
}
