"use client";

import { useSearchParams } from "react-router-dom";
import Review from "./Review";
import MessagingInterface from "./MessagingInterface";

const Communication = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "reviews";
  const userId = searchParams.get("userId") ? Number(searchParams.get("userId")) : null;

  return (
    <>
      {tab === "reviews" && <Review />}
      {tab === "messages" && <MessagingInterface initialPartnerId={userId} />}
    </>
  );
};

export default Communication;
