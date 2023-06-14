import React from "react";
import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "signup" && mode !== "login") {
    throw json({ message: "invalid mode" }, { status: 422 });
  }
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:8082/auth/login", {
    method: "POST",
    body: JSON.stringify(authData),
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "could not authenticate" }, { status: 500 });
  }
  console.log(response.headers.get('set-cookie'))
  const resData = await response.json();
  const token = resData.access_token;
  if (token) {
    sessionStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    sessionStorage.setItem("expiration", expiration);
  }
  return redirect("/");
}
