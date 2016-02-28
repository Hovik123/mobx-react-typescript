import * as React from 'react';
import {Component} from 'react';
import {observer} from 'mobx-react';

import Contact from '../../interfaces/Contact';
import {AppState} from '../..';

@observer
export class SearchBox extends Component<{appState: AppState},{}> {
  searchChanged(event: React.SyntheticEvent) {
    const appState = this.props.appState;
    const target = event.target as HTMLInputElement;
    appState.searchQuery = target.value;
    appState.contacts =  appState.allContacts.filter(contact => match(contact, target.value));
    appState.selectedContact = appState.contacts[0] || null;
  }
  render() {
    const appState = this.props.appState;
    return (
      <div className="search-box">
        <input
          type="search"
          placeholder="Search..."
          value={appState.searchQuery}
          onChange={this.searchChanged.bind(this)}/>
      </div>
    );
  }
}

/**
 * @param  {Contact} contact
 * @param  {string} query
 * @returns boolean
 */
function match(contact:Contact, query: string): boolean {
  return (contact.firstName && contact.firstName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1) ||
    (contact.lastName && contact.lastName.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1);
}