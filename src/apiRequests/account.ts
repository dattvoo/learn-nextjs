import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountAPIRequest = {
  getAccount: () => http.get<AccountResType>("/accounts/me"),
};

export default accountAPIRequest;
