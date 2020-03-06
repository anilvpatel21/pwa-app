import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable()
export class PwaService {
  promptEvent: Promise<void>;
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
        if (confirm('New version available. Load New Version')) {
            swUpdate.activateUpdate().then(() => window.location.reload());
        }
    });
  }
}
