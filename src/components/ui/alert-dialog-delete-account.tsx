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




function AlertDialogDeleteAccount({
    employeeDelete,
    setEmployeeDelete
}: {
    employeeDelete: AccountItem | null
    setEmployeeDelete: (value: AccountItem | null) => void
}) {
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
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default AlertDialogDeleteAccount