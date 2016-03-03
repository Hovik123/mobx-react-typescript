import {Component} from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';

import {ContactList} from './components/ContactList';
import {ContactDetails} from './components/ContactDetails';
import {SearchBox} from './components/SearchBox';
import Contact from './interfaces/Contact';
import {AppState, appState} from './appState';

// TODO: Use import see
declare const require;
const DevTools = require('mobx-react-devtools').default;

@observer
class App extends Component<{appState: AppState}, {}> {
    render() {
      return (
        <div className="container">
          <header className="main-header"></header>
          <main>
            <aside>
              <SearchBox appState={appState} />
              <ContactList appState={appState} />
            </aside>
            <ContactDetails appState={appState} />
          </main>
          <footer className="main-footer"></footer>
          <DevTools />
        </div>
       );
     }
};

@observer
class ContactDetailsWrapper extends Component<{params}, {}> {
  render() {
    return <ContactDetails appState={appState} />
  }
}

ReactDOM.render(
  <App appState={appState} />,
  document.getElementById('root')
);