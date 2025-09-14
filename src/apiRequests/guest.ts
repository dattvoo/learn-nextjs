import http from "@/lib/http";
import { LogoutBodyType } from "@/schemaValidations/auth.schema";
import {
  GuestLoginBodyType,
  GuestLoginResType,
} from "@/schemaValidations/guest.schema";

const guestApiRequest = {
  // slogin la next server goi den backend
  sLogin: (body: GuestLoginBodyType) =>
    http.post<GuestLoginResType>("/guest/auth/login", body),
  //   client goi den next server
  login: (body: GuestLoginBodyType) =>
    http.post<GuestLoginResType>("/api/guest/auth/login", body, {
      baseUrl: "",
    }),
  // Logout from next sv to server
  sLogout: (body: LogoutBodyType & { accessToken: string }) =>
    http.post<LogoutBodyType>(
      "/guest/auth/logout",
      {
        refressToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),
  // Logout from next client call to next server dont need to send accesstoken and refresh token because it will auto send by cookies
  logout: () => http.post("api/guest/auth/logout", null, { baseUrl: "" }),
};

export default guestApiRequest;
