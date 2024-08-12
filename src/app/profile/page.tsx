"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();
  const laogout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("user logout sucessfully");
      router.push("/login");
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };
  const getUserDetail = async () => {
    try {
      const res = await axios.get("/api/users/me");
      if (res.status === 200) {
        setUserId(res?.data?.data?._id);
      }
    } catch (error: any) {
      console.log("getProfileerror", error.message);
    }
  };
  return (
    <div className="h-screen flex  flex-col  gap-3 justify-center items-center">
      <h1 className="font-serif font-semibold text-2xl">Profile</h1>
      <h2 className="font-serif font-semibold text-2xl text-orange-400">
        {userId && <Link href={`/profile/${userId}`}>{userId}</Link>}
      </h2>

      <button className="btn btn-primary" onClick={laogout}>
        Logout
      </button>
      <button className="btn btn-secondary" onClick={getUserDetail}>
        GetUserDetails
      </button>
    </div>
  );
};
export default Profile;
