"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
interface InitialStateType {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<InitialStateType>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginData);
  };
  // console.log(signUpData);

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
        <button className="btn btn-info uppercase  mt-2">login</button>
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
