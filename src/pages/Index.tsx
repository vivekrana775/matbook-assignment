import React from "react";
import Logo from "@/components/ui/Logo";
import LoginForm from "@/components/auth/LoginForm";

const Index = () => {
  return (
    <div
      className="min-h-screen flex items-end justify-between bg-cover bg-center bg-no-repeat bg-fixed p-0"
      style={{ backgroundImage: "url('/uploads/bg-img.png')" }}
    >
      <div className="bg-black bg-opacity-70 absolute inset-0"></div>

      <div className="z-10 flex-1 flex items-center justify-center">
        <div
          className="max-w-md mx-10"
          style={{
            height: "100vh",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src="/uploads/logo_highbridge.svg"
            alt="Company Logo"
            className="w-full h-auto mb-4"
          />
          <div style={{ height: "100px" }}></div>
          <img
            src="/uploads/Slide.svg"
            alt="Company Slide"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Login Form (right side) */}
      <div
        className="z-10"
        style={{
          width: "40%",
          display: "flex",
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
