// components/ApolloProviderWrapper.js
import React, { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/utils'

interface ApolloProviderWrapperProps {
    children: ReactNode;
}

export default function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps): JSX.Element {
    return (
    <ApolloProvider client={apolloClient}>
        {children}
    </ApolloProvider>
    )
}