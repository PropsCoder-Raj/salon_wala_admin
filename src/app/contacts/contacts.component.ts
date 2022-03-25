import { Component, OnInit } from '@angular/core';
import { ApiService } from '../__helper/api/api.service';
declare var $: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Array<any> = [];
  contactsCount = 0;

  constructor(public apiS: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.contacts = [];
    $("#contactsTable").DataTable().destroy();
    this.apiS.getAllContacts().subscribe(data => {
      if(data['data'].length > 0){
        this.contacts = data['data'];
        this.contactsCount++;

        let interval = setInterval(() => {
          if(this.contacts.length === data['data'].length){
            clearInterval(interval);
            $("#contactsTable").dataTable();
          }
        }, 500)
      }
    })
  }

}
