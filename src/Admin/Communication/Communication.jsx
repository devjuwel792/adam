"use client";

import { useState } from "react";

import Review from "./Review";
import MessagingInterface from "./MessagingInterface";

const Communication = ({ messageOpen }) => {
  const [selectedComponent, setSelectedComponent] = useState("reviews");

  return (
    <>
      {selectedComponent === "reviews" && !messageOpen && (
        <Review onPageShow={() => setSelectedComponent("message")} />
      )}
      {(selectedComponent === "message" || messageOpen) && (
        <MessagingInterface
          onPageShow={() => setSelectedComponent("reviews")}
        />
      )}
    </>
  );
};

export default Communication;
