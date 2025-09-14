// NEXTJS SEVER

import { cookies } from "next/headers";

import guestApiRequest from "@/apiRequests/guest";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: "K nhan dc accesstoken va refresh token",
      },
      {
        status: 200,
      }
    );
  }

  try {
    const result = await guestApiRequest.sLogout({
      accessToken,
      refreshToken,
    });

    return Response.json(result.payload);
  } catch (error) {
    console.log("error", error);
    return Response.json(
      {
        message: "Co loi khi goi den server",
      },
      {
        status: 200,
      }
    );
  }
}
