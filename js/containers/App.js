import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Home from '../components/Home';
import {renderDevTools} from '../utils/devTools';

const store = configureStore();

export default React.createClass({
  render() {
    return (
        <section>
        {/* <Home /> is your app entry point */}
        <Provider store={store}>
          <Home />
        </Provider>

        {/* only renders when running in DEV mode */
          !window.devToolsExtension ? renderDevTools(store) : undefined
        }
      </section>
    );
  }
});
