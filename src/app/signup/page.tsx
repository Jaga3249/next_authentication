"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
interface InitialStateType {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [signUpData, setSignUpData] = useState<InitialStateType>({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", signUpData);
      if (res.status === 200) {
        toast.success("user created sucessfully");
      }
      // console.log("signup process", res.data);
      router.push("/login");
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log("signup error", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(signUpData);

  return (
    <div className=" h-screen flex justify-center items-center">
      <form
        className="border-[1px] border-gray-500 rounded-md w-1/3 p-2 flex flex-col gap-2 "
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-serif text-2xl font-semibold uppercase my-2">
          SignUp
        </h1>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full "
          name="username"
          value={signUpData?.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full "
          name="email"
          value={signUpData?.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full "
          name="password"
          value={signUpData?.password}
          onChange={handleChange}
          required
        />

        <button className={`btn  btn-info uppercase mt-2 `} disabled={loading}>
          {loading && <span className="loading loading-spinner"></span>}
          SignUp
        </button>

        <div>
          Have an account?
          <Link href={"/login"} className="text-blue-400 font-semibold">
            {" "}
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
