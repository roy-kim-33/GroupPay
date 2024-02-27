// import type { Metadata } from "next";
// import { Inter } from "next/font/google";


// import Footer from "@/components/footer";
// import Header from "@/components/header";


// import "./globals.css";

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Groupay App | Paying Made Easy',
//   description: 'Generated by create next app',



// }




// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" className="!scroll-smooth">
//       <body className={`${inter.className }
//       bg-blue-200 text-gray-950 relative pt-28 sm:pt-36 `}>
        
//         <ApolloProvider client={client}>
//         <Header />
          
//         {children}
//         <Footer />
        
//         </ApolloProvider>
        
//       </body>
//     </html>
//   )
// }

import type { Metadata } from "next";
import React, { ReactNode } from 'react';
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

import "./globals.css";


// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


// // Initialize Apollo Client
// const client = new ApolloClient({
//   uri: 'http://127.0.0.1:8000/api/', // Make sure to replace 'your_graphql_endpoint' with your actual GraphQL endpoint
//   cache: new InMemoryCache(),
// });

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Groupay App | Paying Made Easy',
  description: 'Generated by create next app',
};

interface RootLayoutProps {
  children: ReactNode;
}

// export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
//   return (
//     <html lang="en" className="!scroll-smooth">
//       <body className={`${inter.className} bg-blue-200 text-gray-950 relative pt-28 sm:pt-36`}>
//         <ApolloProvider client={client}>
//           {/* <Header /> */}
//           {children}
//           {/* <Footer /> */}
//         </ApolloProvider>
//       </body>
//     </html>
//   )
// }
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} bg-blue-200 text-gray-950 relative pt-28 sm:pt-36`}>
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}
