import { Connect } from "@/DbConfig/DbConfig";
import { User } from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";

Connect();
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = request.json();

    const { token } = await reqBody;
    console.log("reqBody", reqBody);
    // console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid token", sucess: false },
        { status: 400 }
      );
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "email verify sucessfully",
      sucess: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, sources: false },
      { status: 500 }
    );
  }
};
