'use client'

import Navbar from "@/components/navbar-components/navbar";
import Welcome from "@/components/welcome-components/welcome";

export default function Home() {

  return (
    <div className="min-h-screen">
      <Navbar/>
      <Welcome/>
    </div>
  );
}