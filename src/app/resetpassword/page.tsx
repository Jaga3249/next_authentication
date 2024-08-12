"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const resetPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      toast.success("password reset sucessfully");
      router.push("/login");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const url = window.location.search.split("=")[1];
    setToken(url);
  }, [token]);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-[1px] border-gray-400 rounded-sm w-[30%] p-2 flex flex-col gap-3">
        <p className="text-center font-serif text-2xl">Reset your password</p>
        <input
          type="text"
          placeholder="Password"
          className="input input-bordered w-full "
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ConfirmPassword"
          className="input input-bordered w-full "
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {password != confirmPassword && <p>Password is not match</p>}
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={resetPassword}
        >
          {loading && <span className="loading loading-spinner"></span>}
          Reset password
        </button>
      </div>
    </div>
  );
};
export default ResetPassword;
