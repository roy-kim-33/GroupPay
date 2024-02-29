import Image from "next/image";

// import Header from "@/components/header";
// import Head from "next/head";
import Link from 'next/link'

// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// // Initialize Apollo Client
// const client = new ApolloClient({
//   uri: 'http://127.0.0.1:8000/api/', // Make sure to replace 'your_graphql_endpoint' with your actual GraphQL endpoint
//   cache: new InMemoryCache(),
// });


export default function Home() {
  return (
      <main className="flex flex-col items-center px-4">
        <Link href="/login">
          Log In
        </Link>
        {/* <Link href="/addUser">
          Add User
        </Link>
        <Link href="/addGroup">
          Add Group
        </Link>
        <Link href="/profile">
          Profile
        </Link> */}
      </main>
  )
}
