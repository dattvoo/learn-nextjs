import { AccountItem } from "@/app/manage/accounts/account-table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "./alert-dialog"
import { useDeleteAccountMutation } from "@/queries/useAccount"
import { toast } from "sonner"
import { handleErrorApi } from "@/lib/utils"




function AlertDialogDeleteAccount({
    employeeDelete,
    setEmployeeDelete
}: {
    employeeDelete: AccountItem | null
    setEmployeeDelete: (value: AccountItem | null) => void
}) {

    console.log('Employee Delete: ', employeeDelete);
    const { mutateAsync: mutateAsyncDeleteAccount } = useDeleteAccountMutation()

    const deleteAccount = async () => {
        if (employeeDelete) {
            try {
                const result = await mutateAsyncDeleteAccount(employeeDelete.id)
                setEmployeeDelete(null)
                toast(result.payload.message)
            } catch (error: any) {
                handleErrorApi(error)
            }
        }
    }

    return (
        <AlertDialog
            open={Boolean(employeeDelete)}
            onOpenChange={(value) => {
                if (!value) {
                    setEmployeeDelete(null)
                }
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xóa nhân viên?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tài khoản <span className='bg-foreground text-primary-foreground rounded px-1'>{employeeDelete?.name}</span>{' '}
                        sẽ bị xóa vĩnh viễn
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteAccount}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default AlertDialogDeleteAccount