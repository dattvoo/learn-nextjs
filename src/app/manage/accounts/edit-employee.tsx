/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UpdateEmployeeAccountBody, UpdateEmployeeAccountBodyType } from '@/schemaValidations/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Role } from '@/constant/type'
import { useGetAccount, useUpdateAccountMutation } from '@/queries/useAccount'
import { useMediaMutation } from '@/queries/useMedia'
import { toast } from 'sonner'
import { handleErrorApi } from '@/lib/utils'

export default function EditEmployee({
    id,
    setId,
    // onSubmitSuccess
}: {
    id?: number | undefined
    setId: (value: number | undefined) => void
    onSubmitSuccess?: () => void
}) {
    const [file, setFile] = useState<File | null>(null)

    const avatarInputRef = useRef<HTMLInputElement | null>(null)

    const updateAccountMutation = useUpdateAccountMutation()
    const useMediaUploadMutation = useMediaMutation()


    const form = useForm<UpdateEmployeeAccountBodyType>({
        resolver: zodResolver(UpdateEmployeeAccountBody),
        defaultValues: {
            name: '',
            email: '',
            avatar: undefined,
            password: undefined,
            confirmPassword: undefined,
            changePassword: false,
            role: Role.Employee, // 👈 cần thêm dòng này
        },
    })
    const avatar = form.watch('avatar')
    const name = form.watch('name')
    const changePassword = form.watch('changePassword')


    const previewAvatarFromFile = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file)
        }
        return avatar
    }, [file, avatar])

    const { data } = useGetAccount({ id: id as number })

    useEffect(() => {
        if (data) {
            const { name, avatar, email, role } = data.payload.data
            form.reset({
                name,
                avatar: avatar ?? undefined,
                email,
                changePassword: form.getValues('changePassword'),
                password: form.getValues('password'),
                role
            })
        }
    }, [data, form])

    const onReset = () => {
        form.reset();
        setFile(null)
    }


    console.log('Error when submit', form.getValues('name'));

    const onSubmit = async (values: UpdateEmployeeAccountBodyType) => {
        console.log('Inhere?');
        if (updateAccountMutation.isPending) return
        try {
            let body: UpdateEmployeeAccountBodyType & { id: number } = { id: id as number, ...values }

            // O day se chia 2 truong hop upLoad anh, Neu nhu co chon file anh thi se upload anh truoc => tra ve URL roi ta moi lay URL de gan vao`
            if (file) {
                const formData = new FormData();
                formData.append('file', file)
                const uploadImageResult = await useMediaUploadMutation.mutateAsync(formData)
                const urlImageResult = uploadImageResult.payload.data
                body = {
                    ...body,
                    avatar: urlImageResult
                }
                // dang hoc toi 23:41
                // edit user
            }
            console.log('body', body);
            const result = await updateAccountMutation.mutateAsync(body);
            toast(result.payload.message)
            setId(undefined)
            onReset()
        } catch (error: any) {
            handleErrorApi(error)
        }
    }



    return (
        <Dialog
            open={Boolean(id)}
            onOpenChange={(value) => {
                if (!value) {
                    setId(undefined)
                }
            }}
        >
            <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
                <DialogHeader>
                    <DialogTitle>Cập nhật tài khoản</DialogTitle>
                    <DialogDescription>Các trường tên, email, mật khẩu là bắt buộc</DialogDescription>
                </DialogHeader>
                <Form {...form} >
                    <form noValidate className='grid auto-rows-max items-start gap-4 md:gap-8' id='edit-employee-form' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid gap-4 py-4'>
                            <FormField
                                control={form.control}
                                name='avatar'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex gap-2 items-start justify-start'>
                                            <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                                                <AvatarImage src={previewAvatarFromFile} />
                                                <AvatarFallback className='rounded-none'>{name || 'Avatar'}</AvatarFallback>
                                            </Avatar>
                                            <input
                                                type='file'
                                                accept='image/*'
                                                ref={avatarInputRef}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        setFile(file)
                                                        field.onChange('http://localhost:3000/' + file.name)
                                                    }
                                                }}
                                                className='hidden'
                                            />
                                            <button
                                                className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                                                type='button'
                                                onClick={() => avatarInputRef.current?.click()}
                                            >
                                                <Upload className='h-4 w-4 text-muted-foreground' />
                                                <span className='sr-only'>Upload</span>
                                            </button>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                                            <Label htmlFor='name'>Tên</Label>
                                            <div className='col-span-3 w-full space-y-2'>
                                                <Input id='name' className='w-full' {...field} />
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                                            <Label htmlFor='email'>Email</Label>
                                            <div className='col-span-3 w-full space-y-2'>
                                                <Input id='email' className='w-full' {...field} />
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='changePassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                                            <Label htmlFor='email'>Đổi mật khẩu</Label>
                                            <div className='col-span-3 w-full space-y-2'>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {changePassword && (
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                                                <Label htmlFor='password'>Mật khẩu mới</Label>
                                                <div className='col-span-3 w-full space-y-2'>
                                                    <Input id='password' className='w-full' type='password' {...field} />
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            )}
                            {changePassword && (
                                <FormField
                                    control={form.control}
                                    name='confirmPassword'
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                                                <Label htmlFor='confirmPassword'>Xác nhận mật khẩu mới</Label>
                                                <div className='col-span-3 w-full space-y-2'>
                                                    <Input id='confirmPassword' className='w-full' type='password' {...field} />
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                    </form>
                </Form>
                <DialogFooter>
                    <Button type='submit' form='edit-employee-form'>
                        Lưu
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}