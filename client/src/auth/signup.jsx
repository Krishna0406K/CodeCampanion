import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log("Sending Data:", { name, email, password });
    axios.post(
        "http://localhost:3000/api/users/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result);
        navigate('/login');
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121417]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Sign up
          </h2>
          <p className="mt-2 text-white">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-[#9CABBA]"
              >
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                name="name"
                placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-input bg-[#293038] text-white rounded-md shadow-sm placeholder-muted-foreground focus:outline-[#9CABBA] focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#9CABBA]"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-input bg-[#293038] text-white rounded-md shadow-sm placeholder-muted-foreground focus:outline-[#9CABBA] focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#9CABBA]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-input bg-[#293038] text-white rounded-md shadow-sm placeholder-muted-foreground focus:outline-[#9CABBA] focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-[#0A78ED] hover:bg-[#0A57ED] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors"
          >
            Sign up
          </button>

          <p className="text-center text-sm text-white">
            Already have an account?{" "}
            <a
              onClick={goToLogin}
              className="font-medium text-primary hover:underline  hover:text-[#9CABBA]"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
