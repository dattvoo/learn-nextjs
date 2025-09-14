import guestApiRequest from "@/apiRequests/guest";
import { useMutation } from "@tanstack/react-query";

export const useGuestLoginMutation = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: guestApiRequest.login,
    });
};

export const useGuestLogoutMutation = () => {
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: guestApiRequest.logout,
    });
};
