import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/redux/auth/authApiSlice";
import { setCredentials, setUser } from "@/redux/auth/authSlice";

export default function Login({ setOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { error, isSuccess }] = useLoginMutation();

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token }));
      dispatch(setUser({ user }));
    } catch (err) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      router.reload();
    }
  }, [isSuccess, router]);

  return (
    <div>
      <div className="w-full">
        <h1 className="text-[25px] text-black dark:text-white font-[500] font-Poppins text-center py-3">
          Login with ELearning{" "}
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="bg-transparent block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter your Email
          </label>
          <input
            type="email"
            onChange={handleEmailInput}
            value={email}
            name="email"
            id="email"
            className={`bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              error && "border-red-500"
            }`}
            placeholder="Loginmail@gmail.com"
            required
          />
          {error && <span className="text-red-500 pt-2 block"></span>}
          <div className="w-full mt-5 relative mb-1">
            <label
              htmlFor="password"
              className="bg-transparent block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter your Password
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={password}
              onChange={handlePwdInput}
              id="password"
              placeholder="••••••••"
              className={`bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                error && "border-red-500"
              }`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {error && <span className="text-red-500 pt-2 block"></span>}
          <div className=" w-full mt-5">
            <input
              type="submit"
              className="rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex flex-row justify-center items-center py-3 px-6 cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold"
              value="Login"
            />
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}
