import { ApolloClient, InMemoryCache } from '@apollo/client';


// Initialize Apollo Client
const apolloClient = new ApolloClient({
  uri: 'http://127.0.0.1:8000/api/', // Make sure to replace 'your_graphql_endpoint' with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

export default apolloClient