'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const querryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false
        }
    }
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={querryClient}>
            <ReactQueryDevtools initialIsOpen />

            {children}
        </QueryClientProvider>
    )
}
