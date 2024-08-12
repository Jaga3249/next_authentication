import { Connect } from "@/DbConfig/DbConfig";
import { NextResponse } from "next/server";

Connect();
export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "user logout sucessfully",
      sucess: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
};
