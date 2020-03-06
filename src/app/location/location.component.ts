import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {
  isTracking: boolean;
  currentLat: any;
  currentLong: any;
  map: google.maps.Map;

  @ViewChild('gmap', {static: false}) gRef: ElementRef;
  @ViewChild('place', {static: false}) place: ElementRef;
  marker: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.place.nativeElement.innerHTML = 'Searching your current location...';
    const mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gRef.nativeElement, mapProp);
    this.findMe();
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      this.place.nativeElement.innerHTML = 'Sorry! Geolocation is not supported by this browser.';
      alert('Geolocation is not supported by this browser.');
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    this.place.nativeElement.innerHTML = `Latitude  ${position.coords.latitude} - Longitude ${position.coords.longitude}`;
    const location = new google.maps.LatLng(this.currentLat, this.currentLong);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Here you are!'
      });
    } else {
      this.marker.setPosition(location);
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Here your are!'
      });
    } else {
      this.marker.setPosition(location);
    }
  }


}
