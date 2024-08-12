"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const PasswordResetPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendRestPasswordEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/sendpasswordresetemail", {
        email,
      });
      if (res.status === 200) {
        toast.success("reset email send sucessfully");
      }
    } catch (error: any) {
      console.log("resetpassword error", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-[1px] border-gray-400 rounded-sm w-[30%] p-2 flex flex-col gap-3">
        <p className="textarea-md font-mono text-gray-500">
          Enter your email and we'll send you a link to get back into your
          account.
        </p>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full "
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={sendRestPasswordEmail}
        >
          {loading && <span className="loading loading-spinner"></span>}
          Send login link
        </button>
      </div>
    </div>
  );
};
export default PasswordResetPage;
