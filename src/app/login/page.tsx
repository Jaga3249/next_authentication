"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
interface InitialStateType {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<InitialStateType>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", loginData);
      if (res.status === 200) {
        toast.success("user loggedIn sucessfully");
        router.push("/profile");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log("login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen flex justify-center items-center">
      <form
        className="border-[1px] border-gray-500 rounded-md w-1/3 p-2 flex flex-col gap-2 "
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-serif text-2xl font-semibold uppercase my-2">
          login
        </h1>
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-full "
          name="email"
          value={loginData?.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full "
          name="password"
          value={loginData?.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-info uppercase  mt-2" disabled={loading}>
          {loading && <span className="loading loading-spinner"></span>}
          login
        </button>
        <div>
          Don't have an account?
          <Link href={"/signup"} className="text-blue-400 font-semibold">
            {" "}
            signup
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
