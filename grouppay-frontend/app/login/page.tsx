'use client'
import React from 'react'
import { ApolloProviderWrapper } from '@/components'
import { Login } from '@/components'

export default function addUser(): JSX.Element {
  return (
    <main className="flex flex-col items-center px-4">
      <ApolloProviderWrapper>
        <Login/>
      </ApolloProviderWrapper>
    </main>
  )
}
