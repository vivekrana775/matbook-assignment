import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful! Welcome back.");
      navigate("/workflow-builder");
    }, 1000);
  };

  return (
    <div
      className="p-8 "
      style={{
        backgroundColor: "#FAFAFA",
        width: "70%",
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
        height: "85vh",
      }}
    >
      <div className="mb-6">
        <h2 className="text-sm uppercase font-medium mb-1">WELCOME BACK!</h2>
        <h1 className="text-2xl font-bold mb-4">Log In to your Account</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Type here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Type here..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
              className="text-red-500 border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white"
            />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm hover:underline">
            Forgot Password?
          </a>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute border-t border-gray-300 w-full"></div>
          <span className="relative px-4 bg-white text-sm text-gray-500">
            Or
          </span>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => {
              toast.info("Google login initiated");
              navigate("/workflow-builder");
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Log in with Google</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => {
              toast.info("Facebook login initiated");
              navigate("/workflow-builder");
            }}
          >
            <svg
              className="w-5 h-5 text-[#1877F2]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
              />
            </svg>
            <span>Log in with Facebook</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => {
              toast.info("Apple login initiated");
              navigate("/workflow-builder");
            }}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              />
            </svg>
            <span>Log in with Apple</span>
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm">
          New User?{" "}
          <a href="/signup" className="font-bold hover:underline">
            SIGN UP HERE
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
