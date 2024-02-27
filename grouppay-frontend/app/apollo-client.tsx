// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";


//NOTE to my peers: I am as of yet unsure if this uri is correct to our needs.
const createApolloClient = () => {
  return new ApolloClient({
    uri: "/api/",
    cache: new InMemoryCache(),
  });
};

//We may need to add additional configuration to this file for authentication and other features. 
//Current setup:
    //uri: "/api/"
    //proxy: "http://127.0.0.1:8000"
    //TODO: add corsheaders to backend

export default createApolloClient;