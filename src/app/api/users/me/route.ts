import { getDataFromToken } from "@/helper/getDataFromToken";
import { User } from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json(
      {
        message: "user found",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
