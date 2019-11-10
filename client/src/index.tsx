import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Exchange from './containers/exchange';

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Exchange/>
            </Provider>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
