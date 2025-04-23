'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLogoutMutation } from '@/queries/useAuth'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useGetProfile } from '@/queries/useAccount'
import { useEffect, useState } from 'react'
import { AccountType } from '@/schemaValidations/account.schema'


export default function DropdownAvatar() {
    const mutation = useLogoutMutation();
    const router = useRouter()
    const [profile, setProfile] = useState<AccountType>();

    const { data } = useGetProfile()

    useEffect(() => {
        if (data) {
            setProfile(data.payload.data)
        }
    }, [data])


    const handleLogout = async () => {
        if (mutation.isPending) return
        try {

            await mutation.mutateAsync();
            router.push('/');

        } catch (error: any) {
            handleErrorApi(error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
                    <Avatar>
                        <AvatarImage src={profile?.avatar ?? undefined} alt={profile?.name as string} />
                        <AvatarFallback>{profile ? (profile?.name as string).slice(0, 2).toUpperCase() : ""}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>{profile?.name as string ?? ""}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={'/manage/setting'} className='cursor-pointer'>
                        Cài đặt
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}