import mongoose from "mongoose";
export const Connect = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URL!);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error: any) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};
