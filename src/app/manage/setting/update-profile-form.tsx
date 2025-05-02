'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useForm } from 'react-hook-form'
import { UpdateMeBody, UpdateMeBodyType } from '@/schemaValidations/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGetProfile, useUpdateMeMutation } from '@/queries/useAccount'
import { useMediaMutation } from '@/queries/useMedia'
import { handleErrorApi } from '@/lib/utils'
import { toast } from 'sonner'

export default function UpdateProfileForm() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [imgFile, setImgFile] = useState<File | null>(null)

    const { data, refetch } = useGetProfile();
    const updateMeMutation = useUpdateMeMutation()
    const useMediaUploadMutation = useMediaMutation()


    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
            name: '',
            avatar: ''
        }
    })

    // console.log('Errors when submit form:', errors);
    // console.log('avatar', form.getValues('avatar'));

    useEffect(() => {
        if (data) {
            form.reset(
                {
                    name: data.payload.data.name,
                    avatar: data.payload.data.avatar ?? ''
                }
            )
        }
    }, [data, form])

    const avatar = form.watch('avatar')
    const name = form.watch('name')?.slice(0, 2).toUpperCase()

    const previewAvar = useMemo(() => {
        if (imgFile)
            return URL.createObjectURL(imgFile)
        return avatar
    }, [imgFile, avatar])


    const onReset = () => {
        form.reset()
        setImgFile(null)
    }

    const onSubmit = async (values: UpdateMeBodyType) => {
        if (updateMeMutation.isPending) return
        try {
            let body = values
            // O day se chia 2 truong hop upLoad anh, Neu nhu co chon file anh thi se upload anh truoc => tra ve URL roi ta moi lay URL de gan vao`
            if (imgFile) {
                console.log('in hrer')
                const formData = new FormData();
                formData.append('file', imgFile)
                const uploadImageResult = await useMediaUploadMutation.mutateAsync(formData)
                const urlImageResult = uploadImageResult.payload.data
                body = {
                    ...values,
                    avatar: urlImageResult
                }

            }
            const result = await updateMeMutation.mutateAsync(body)
            toast(result.payload.message)
            refetch()
        } catch (error: any) {
            handleErrorApi(error)
            console.log('error in hể?', error)
        }
    }


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={onReset}
                noValidate
                className='grid auto-rows-max items-start gap-4 md:gap-8'
            >
                <Card x-chunk='dashboard-07-chunk-0'>
                    <CardHeader>
                        <CardTitle>Thông tin cá nhân</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid gap-6'>
                            <FormField
                                control={form.control}
                                name='avatar'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='flex gap-2 items-start justify-start'>
                                            <Avatar className='aspect-square w-[100px] h-[100px] rounded-md object-cover'>
                                                <AvatarImage src={previewAvar} />
                                                <AvatarFallback className='rounded-none'>{name}</AvatarFallback>
                                            </Avatar>
                                            <input
                                                type='file'
                                                accept='image/*'
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const imgFile = e.target.files?.[0];
                                                    if (imgFile) {
                                                        setImgFile(imgFile)
                                                        field.onChange('http://localhost:3000/' + field.name)
                                                    }
                                                }}
                                                className='hidden'
                                                ref={inputRef}
                                            />
                                            <button
                                                className='flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed'
                                                type='button'
                                                onClick={() => inputRef.current?.click()}
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
                                        <div className='grid gap-3'>
                                            <Label htmlFor='name'>Tên</Label>
                                            <Input id='name' type='text' className='w-full'  {...field} />
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className=' items-center gap-2 md:ml-auto flex'>
                                <Button variant='outline' size='sm' type='reset'>
                                    Hủy
                                </Button>
                                <Button size='sm' type='submit'>
                                    Lưu thông tin
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}