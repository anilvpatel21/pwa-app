import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements AfterViewInit {

  @ViewChild('ulResults', {static: false}) ulResults: ElementRef;
  scannerIsRunning = false;

  @ViewChild(BarecodeScannerLivestreamComponent, {static: false}) barecodeScanner: BarecodeScannerLivestreamComponent;

  barcodeValue;

  ngAfterViewInit() {
      this.barecodeScanner.start();
  }

  onValueChanges(result) {
      this.barcodeValue = result.codeResult.code;
  }

  onStarted(started) {
      console.log(started);
  }
}
