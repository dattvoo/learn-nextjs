import http from "@/lib/http";
import {
  AccountListResType,
  AccountResType,
  ChangePasswordBodyType,
  ChangePasswordV2BodyType,
  ChangePasswordV2ResType,
  CreateEmployeeAccountBodyType,
  UpdateEmployeeAccountBodyType,
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

  getEmployeeList: () => {
    return http.get<AccountListResType>(`${prefix}`);
  },
  addNewEmployee: (body: CreateEmployeeAccountBodyType) => {
    return http.post<AccountResType>(prefix, body);
  },
  updateEmployee: (id: number, body: UpdateEmployeeAccountBodyType) => {
    return http.put<AccountResType>(`${prefix}/detail/${id}`, body);
  },
  getEmployee: (id: number) => {
    return http.get<AccountResType>(`${prefix}/detail/${id}`);
  },
  deleteEmployee: (id: number) => {
    return http.delete<AccountResType>(`${prefix}/detail/${id}`);
  },
};

export default accountAPIRequest;
