import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  // slogin la next server goi den backend
  sLogin: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  //   client goi den next server
  login: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: "",
    }),
  // Logout from next sv to server
  sLogout: (body: LogoutBodyType & { accessToken: string }) =>
    http.post<LogoutBodyType>(
      "/auth/logout",
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
  logout: () => http.post("api/auth/logout", null, { baseUrl: "" }),
};

export default authApiRequest;
