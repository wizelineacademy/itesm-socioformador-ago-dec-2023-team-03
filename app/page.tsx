"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation"

export default function Home() {

  const { user, error, isLoading } = useUser();

  if(error) { console.log(error) }
  if(isLoading) { return <div className="loader"></div> }

  if (!user) {

    // If not logged in, show login page
    return (
      <>
        {redirect("/login")}
      </>
    )
  } else {

    // If logged in, show main page
    return (
      <>
        {redirect("/home")}
      </>
    )
  }
}