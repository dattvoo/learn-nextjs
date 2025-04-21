// NEXTJS SEVER

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { HttpError } from "@/lib/http";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;

  const cookieStore = await cookies();

  try {
    const { payload } = await authApiRequest.sLogin(body);
    const { accessToken, refreshToken } = payload.data;
    // Cho nay muon lay time de set thoi` han. cho cookie thoi
    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };

    cookieStore.set("accessToken", accessToken, {
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
