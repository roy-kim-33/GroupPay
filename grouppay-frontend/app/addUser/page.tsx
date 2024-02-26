'use client'
import React from 'react'
import Link from 'next/link'
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'lib'

export default function addUser(): JSX.Element {
  return (
    <main className="flex flex-col items-center px-4">
      <ApolloProvider client={apolloClient}>
        <Link href="/">
          Home
        </Link>
      </ApolloProvider>
    </main>
  )
}
