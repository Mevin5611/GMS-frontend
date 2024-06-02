import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("admin123@gmail.com");
  const [password, setPassword] = useState("Admin123#@");
  const { login, isLoading, error } = useLogin();
  const hadlesubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className=" py-6 lg:h-[100vh] flex flex-col items-center justify-center ">
      <div className="relative py-3  w-96 md:w-wx600">
        <div /* className="absolute inset-0 bg-gradient-to-r  from-orange-200 to-orange-500 shadow-lg transform-skew-y-6 skew-y-0 -rotate-6 rounded-xl" */></div>
        <div className="relative px-4 py-10 lg:mt-36 mt-44 bg-white shadow-xl rounded-xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-sans font-semibold">Admin Login</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form onSubmit={hadlesubmit}>  
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  {error && <div className="error">{error}</div>}
                  <div className="flex justify-end pt-5">
                    
                    <button className="bg-orange-500 text-white font-medium rounded-md px-2 py-1">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
