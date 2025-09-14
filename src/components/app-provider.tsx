'use client'
import { decodeToken, getAccessTokenFromLocalStorage, removeTokensFromLocalStorage } from '@/lib/utils';
import { RoleType } from '@/type/jwt.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const querryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false
        }
    }
});


const AppContext = createContext({
    role: undefined as RoleType | undefined,
    isAuth: false,
    setRole: (role?: RoleType | undefined) => { }
})

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRoleState] = useState<RoleType | undefined>()

    useEffect(() => {
        const accessToken = getAccessTokenFromLocalStorage();
        if (accessToken) {
            const role = decodeToken(accessToken).role
            setRoleState(role)
        }
    }, []);

    const setRole = useCallback((role?: RoleType | undefined) => {
        setRoleState(role)
        if (!role)
            removeTokensFromLocalStorage()

    }, [])
    const isAuth = Boolean(role)
    return (
        <AppContext.Provider value={{ role, setRole, isAuth }}>

            <QueryClientProvider client={querryClient}>
                <ReactQueryDevtools initialIsOpen />

                {children}
            </QueryClientProvider>
        </AppContext.Provider>

    )
}
