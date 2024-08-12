"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post(`api/users/verifyemail`, { token });
      console.log(res);
      if (res.status === 200) {
        setVerified(true);
      }
    } catch (error: any) {
      console.log("verifytokenError", error.message);
    }
  };

  useEffect(() => {
    const url = window.location.search.split("=")[1];
    setToken(url);
  }, []);
  useEffect(() => {
    verifyUserEmail();
  }, [token]);

  return (
    <div>
      <h1>Email verify</h1>
      <h2>{token ? `${token}` : "no token"}</h2>
      {verified && (
        <div>
          <h2>Email verified</h2>
          <Link href={"/login"}>login</Link>
        </div>
      )}
    </div>
  );
};
export default VerifyEmailPage;
