import './polyfill';
// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import  store  from './hooks/store';
import { Provider } from 'react-redux';

// import apollo client providers
import {gql,ApolloClient,ApolloProvider,InMemoryCache} from '@apollo/client'

// ----------------------------------------------------------------------

const client = new ApolloClient({
  uri:'http://localhost:1337/graphql',
  cache:new InMemoryCache()
});

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
    <ApolloProvider client={client}>
     <Provider store={store}>
      <App />
      </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
