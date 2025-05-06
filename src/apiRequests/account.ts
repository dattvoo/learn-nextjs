import http from "@/lib/http";
import {
  AccountResType,
  ChangePasswordBodyType,
  ChangePasswordV2BodyType,
  ChangePasswordV2ResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const prefix = "/accounts";

const accountAPIRequest = {
  getAccount: () => http.get<AccountResType>("/accounts/me"),

  updateMe: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("/accounts/me", body),

  changePassword: (body: ChangePasswordBodyType) =>
    http.put<AccountResType>("/accounts/change-password", body),

  // goi phia next server
  sChangePasswordV2: (accessToken: string, body: ChangePasswordV2BodyType) =>
    http.put<ChangePasswordV2ResType>(`${prefix}/change-password-v2`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  // goi o phia next client
  changePasswordV2: (body: ChangePasswordV2BodyType) =>
    http.put<ChangePasswordV2ResType>(
      `/api${prefix}/change-password-v2`,
      body,
      {
        baseUrl: "",
      }
    ),
};

export default accountAPIRequest;
