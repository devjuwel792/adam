
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const Header = () => {
  return (
    <>
      <div>
        <h2 className=" font-semibold text-gray-800 text-[24px] leading-[32px] text-[">
          Welcome back, Admin Fariha
        </h2>
        <p className="text-[#8E8E8E]">
          Here's what's happening with Phlebotomist today
        </p>
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
      </div>
    </>
  );
};

export default Header;
