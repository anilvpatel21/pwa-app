import { Component } from '@angular/core';
import { PwaService } from './pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My PWA App - Unilever Assessment';
  promptEvent: any;
  accepted: boolean;
  showAlert: boolean;

  constructor(
    private pwa: PwaService
  ) {

    this.accepted = true;
    this.showAlert = false;
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.promptEvent = event;
      this.accepted = false;
    });

  }

  installPwa(): void {
    this.promptEvent.prompt();
    this.promptEvent.userChoice.then((choiceResult) => {
      if(choiceResult.outcome === 'accepted'){
        this.showAlert = true;
        this.accepted = true;
        // console.log('User Accepted');
      } else {
        this.showAlert = true;
        this.accepted = false;
        // console.log('User Dismissed');
      }
      this.promptEvent = null;
    });
  }

}
