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

      <div
        className="z-10  mb-0"
        style={{
          width: "40%",
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
