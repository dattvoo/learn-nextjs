// NEXTJS SEVER

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { ChangePasswordV2BodyType } from "@/schemaValidations/account.schema";
import accountAPIRequest from "@/apiRequests/account";
import { HttpError } from "@/lib/http";

export async function PUT(request: Request) {
  const cookieStore = await cookies();

  const body = (await request.json()) as ChangePasswordV2BodyType;

  const accessToken = cookieStore.get("accessToken")?.value;
  console.log("Old accessToken", accessToken);
  if (!accessToken) {
    return Response.json(
      {
        message: "Khong tim thay  accesstoken ",
      },
      {
        status: 200,
      }
    );
  }

  try {
    const { payload } = await accountAPIRequest.sChangePasswordV2(
      accessToken,
      body
    );
    const refreshToken = payload.data.refreshToken;
    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };

    cookieStore.set("accessToken", payload.data.accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });

    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: true,
      secure: true,
      expires: decodedRefreshToken.exp * 1000,
    });
    // Nextjs server truyen thang data ve client component
    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Something Error",
        },
        {
          status: 505,
        }
      );
    }
  }
}
