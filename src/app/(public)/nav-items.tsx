'use client'

import { getAccessTokenFromLocalStorage } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface IMenuItem {
  title: string,
  href: string,
  authRequired: boolean | undefined
}

const menuItems: IMenuItem[] = [
  {
    title: 'Món ăn',
    href: '/menu',
    authRequired: undefined // undifined nghĩa là dăng nhâpj hay không vẫn sẽ hiển thị
  },
  {
    title: 'Đơn hàng',
    href: '/orders',
    authRequired: true
  },
  {
    title: 'Đăng nhập',
    href: '/login',
    authRequired: false // khi false nghĩa là chưa đăng nhâpj thì sẽ hiển thị
  },
  {
    title: 'Quản lý',
    href: '/manage/dashboard',
    authRequired: true // khi true nghĩa là đăng nhâpj mới hiển thị
  }
]

export default function NavItems({ className }: { className?: string }) {
  // const isAuth = Boolean(getAccessTokenFromLocalStorage())
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(Boolean(getAccessTokenFromLocalStorage()))
  }, [])

  return menuItems.map((item) => {
    if (item.authRequired === false && isAuth || item.authRequired === true && !isAuth) return null
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
