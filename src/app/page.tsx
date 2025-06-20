"use client"

import dynamic from "next/dynamic";

const MainClient = dynamic(() => import("@/components/MainClient"), {
  ssr: false, 
});

export default function Home() {
  return <MainClient />;
}
