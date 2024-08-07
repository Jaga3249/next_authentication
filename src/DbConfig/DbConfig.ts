import mongoose from "mongoose";
export const Connect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL!);
    console.log(connect);
  } catch (error) {
    console.log("Something Went Wrong");
    console.log(error);
  }
};
