import { Connect } from "@/DbConfig/DbConfig";
import { User } from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/sendEmail";
Connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    //check user exist or not
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user already exits" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });
    const saveUser = await newUser.save();
    await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });
    return NextResponse.json({
      message: "user created sucessfully",
      sucess: true,
      saveUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
