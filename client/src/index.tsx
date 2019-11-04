import * as React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/home';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Home/>
            </Provider>
        );
    }
}

render(<App />, document.getElementById('app'));
