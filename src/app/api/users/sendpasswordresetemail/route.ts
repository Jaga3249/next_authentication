import { Connect } from "@/DbConfig/DbConfig";
import { sendEmail } from "@/helper/sendEmail";
import { User } from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";
Connect();
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = request.json();
    const { email } = await reqBody;
    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "user is not found", sucess: true },
        { status: 404 }
      );
    }
    await sendEmail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json(
      { message: "reset mail send sucessfully", sucess: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ eror: error.message }, { status: 500 });
  }
};
