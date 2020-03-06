import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, AfterViewInit {

  newVariable: any;
  cbMultiple: boolean;
  supported: boolean;

  @ViewChild('ulResults', {static: false}) ulResults: ElementRef;

  constructor() { 
    this.cbMultiple = false;
    this.newVariable = window.navigator;
    // const supported = ('contacts' in navigator && 'ContactsManager' in window);
    this.supported = ('contacts' in this.newVariable && 'ContactsManager' in window);
  }

  ngOnInit() {
  }

  chng() {
    this.cbMultiple = !this.cbMultiple;
    this.getContacts();
  }

  ngAfterViewInit() {
    if (!this.supported) {
      this.ulResults.nativeElement.innerHTML = 'Contact API Does Not Supported';
      console.log('Contact API Does Not Supported');
      // const contact = [
      //   {
      //     name: ['Anil', 'Patel'],
      //     tel: ['+91-4554', '+9w3rddf'],
      //     address: ['sdgdfgdfg', 'frewr'],
      //     email: ['anilkumar@gmail.com', 'sdssd']
      //   },
      //   {
      //     name: ['Anil', 'Patel'],
      //     tel: ['+91-4554', '+9w3rddf'],
      //     address: ['sdgdfgdfg', 'frewr'],
      //     email: ['anilkumar@gmail.com', 'sdssd']
      //   }
      // // ];
      // this.renderResults(contact);
    }
  }


// const butReq = document.getElementById('butRequest');
// butReq.addEventListener('click', getContacts);

// const cbMultiple = document.getElementById('multiple');
// const cbName = document.getElementById('name');
// const cbEmail = document.getElementById('email');
// const cbTel = document.getElementById('tel');
// const cbAddress = document.getElementById('address');
// const cbIcon = document.getElementById('icon');
// const ulResults = document.getElementById('results');
// const preResults = document.getElementById('rawResults');


  async getContacts() {
    const props = ['name', 'email', 'tel'];
    // if (cbName.checked) props.push('name');
    // if (cbEmail.checked) props.push('email');
    // if (cbTel.checked) props.push('tel');
    // if (cbAddress.checked) props.push('address');
    // if (cbIcon.checked) props.push('icon');

    const opts = {multiple: this.cbMultiple};

    try {
      const contacts = await this.newVariable.contacts.select(props, opts);
      this.handleResults(contacts);
    } catch (ex) {
      // ulResults.classList.toggle('error', true);
      // ulResults.classList.toggle('success', false);
      // ulResults.innerText = ex.toString();
      alert('error');
      console.log('error');
      console.log(ex);
      this.ulResults.nativeElement.innerHTML = `<code>${JSON.stringify(ex)}</code>`;
    }

  }

  handleResults(contacts) {
    // ulResults.classList.toggle('success', true);
    // ulResults.classList.toggle('error', false);
    this.ulResults.nativeElement.innerHTML = '';
    this.renderResults(contacts);
  }

  renderResults(contacts) {

    const ul = document.createElement('ul');
    ul.classList.add('collection');
    contacts.forEach((contact) => {
      const lines = [];

      // if (contact.icon) {
      //   contact.icon.forEach((icon) => {
      //     const imgURL = URL.createObjectURL(icon);
      //     lines.push(`<img  class="circle" src="${imgURL}">`);
      //   });
      // }

      if (contact.name) {
        lines.push(`<p><b>Name:</b></p> ${contact.name.join(', ')}`); }
      if (contact.email) { lines.push(`<p><b>E-mail:</b></p> ${contact.email.join(', ')}`); }
      if (contact.tel) { lines.push(`<p><b>Telephone:</b></p> ${contact.tel.join(', ')}`); }
      if (contact.address) {
        contact.address.forEach((address) => {
          lines.push(`<p><b>Address:</b></p> ${JSON.stringify(address)}`);
        });
      }

      // lines.push(`<p>Raw:</p> <code>${JSON.stringify(contact)}</code>`);
      const li = document.createElement('li');
      li.classList.add('collection-item');

      li.innerHTML = lines.join('');
      ul.appendChild(li);
    });
    this.ulResults.nativeElement.appendChild(ul);
    // const strContacts = JSON.stringify(contacts, null, 2);
    console.log(contacts);
  }


}
