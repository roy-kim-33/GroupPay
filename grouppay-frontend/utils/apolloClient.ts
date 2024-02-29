import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, Operation, NextLink, FetchResult, Observable } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'
interface Headers {
  [key: string]: string;
}

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/api/',
})

const authLink = new ApolloLink((operation, forward) => {
  // Get the authentication token from local storage
  // const authToken = localStorage.getItem('authToken') // need to test
  const authToken = Cookies.get('JWT') || '';
  console.log("token: ", authToken)
  console.log("all cookies: ", Cookies.get())
  // console.log("document.cookie: ", document.cookie)
  // Set the authentication headers
  operation.setContext((request: Operation, prevHeaders: Headers) => ({
    headers: {
      ...prevHeaders,
      authorization: authToken ? `JWT ${authToken}` : '', // ternary operator might cause error?
    }
  }))

  // Call the next link in the middleware chain
  return forward(operation)
})

// const authLink = setContext((_, { headers }) => {
//   const authToken = Cookies.get('JWT') || '';
//   console.log("token: ", authToken)
//   console.log("all cookies: ", Cookies.get())
//   console.log("document.cookie: ", document.cookie)

//   return {
//     headers: {
//       ...headers,
//       authorization: authToken ? `JWT ${authToken}` : '',
//     }
//   }
// })

// Initialize Apollo Client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: 'http://127.0.0.1:8000/api/',
  cache: new InMemoryCache(),
});

export default apolloClient