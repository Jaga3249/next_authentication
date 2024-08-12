import { User } from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Connect } from "@/DbConfig/DbConfig";
Connect();
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = request.json();
    const { token, password } = await reqBody;
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid token", sucess: true },
        { status: 404 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json(
      {
        message: "password reset sucessfully",
        sucess: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, sucess: false },
      { status: 500 }
    );
  }
};
