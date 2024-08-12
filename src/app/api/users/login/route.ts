import { Connect } from "@/DbConfig/DbConfig";
import { User } from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

Connect();
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // check user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user is not found" }, { status: 404 });
    }
    // check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    // create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    // create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "user loggedIn sucessfully",
      sucess: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
