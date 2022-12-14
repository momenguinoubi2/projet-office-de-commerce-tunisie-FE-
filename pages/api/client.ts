import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { useMemo,createContext } from "react";
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({

    uri: 'http://127.0.0.1:8000/graphql',
    credentials: 'same-origin'
  });

  
const authLink = setContext((_, { headers }) => {

    // get the authentication token from local storage if it exists
  
    const token = localStorage.getItem('token');
  
    // return the headers to the context so httpLink can read them
  
    return {
  
      headers: {
  
        ...headers,
  
        authorization: token ? `Bearer ${token}` : "",
  
      }
  
    }
  
  });

const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache: new InMemoryCache(),
    
});



export default client;

