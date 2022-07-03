import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// backend url : https://open-academy-staging.herokuapp.com/graphql
// localhpost backend url : http://localhost:1337/graphql


const httpLink = createHttpLink({
  uri: 'http://localhost:1337/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')|| ""
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
 //  link: authLink.concat(httpLink),
  uri:'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
  
});

export {client};
