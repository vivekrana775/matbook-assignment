import React from "react";
import Logo from "@/components/ui/Logo";
import LoginForm from "@/components/auth/LoginForm";

const Index = () => {
  return (
    <div
      className="min-h-screen flex items-end justify-end bg-cover bg-center bg-no-repeat bg-fixed p-0"
      style={{ backgroundImage: "url('/uploads/bg-img.png')" }}
    >
      <div className="bg-black bg-opacity-70 absolute inset-0"></div>

      <div className="relative z-10  w-full max-w-3xl mb-0 mr-1">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
