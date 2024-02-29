'use client'
import React from 'react'
import { ApolloProviderWrapper } from '@/components'
import { GroupList } from '@/components'

export default function addUser(): JSX.Element {
  return (
    <main className="flex flex-col items-center px-4">
      <ApolloProviderWrapper>
        <GroupList />
      </ApolloProviderWrapper>
    </main>
  )
}
