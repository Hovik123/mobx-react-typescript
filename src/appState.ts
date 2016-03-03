import {observable, computed} from 'mobx';
import {browserHistory} from 'react-router';

import Contact from './interfaces/Contact';

declare const require;
const CONTACTS: Array<Contact> = require('../node_modules/contacts-mvc-data/index.json');


export class AppState {
    @observable private _selectedContactId: string = null;
    @observable contacts: Array<Contact> = [];
    @observable searchQuery: string = '';

    constructor() {
      this.contacts = CONTACTS;

      browserHistory.listen(location => {

        const found = CONTACTS.some(contact=> {
          if (contact.id === location.pathname) {
            this.setSelectedContactId(contact.id, {silent: true});
            return true;
          }
        });

        if (!found) {
          this.selectFirstContact();
        }
      });
    }

    @computed
    get filteredContacts() {
      if (!this.searchQuery) {
        return this.contacts;
      }

      return this.contacts.filter(contact=> match(contact, this.searchQuery));

      function match(contact:Contact, query: string): boolean {
        return (contact.firstName && contact.firstName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1) ||
          (contact.lastName && contact.lastName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1);
      }
    }

    @computed
    get selectedContact(): Contact {
      return this.filteredContacts.filter(contact=> contact.id === this._selectedContactId)[0] || null;
    }

    @computed
    get selectedContactId(): string {
     return this._selectedContactId;
    }

    setSelectedContactId(id: string, options: {silent: boolean} = {silent: false}) {
      if (!options.silent) {
        browserHistory.push(id);
      }
      this._selectedContactId = id;
    }

    private selectFirstContact() {
      this.setSelectedContactId(CONTACTS[0].id);
    }
}

export const appState =  new AppState();