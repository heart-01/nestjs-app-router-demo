"use server";

import { SignJWT, importJWK } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const login = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email !== "admin" || password !== "1234") {
    return {
      ...prevState,
      message: "Invalid email or password",
    };
  }

  const secretJWK = {
    kty: "oct",
    k: process.env.JWT_SECRET,
  };

  const secretKey = await importJWK(secretJWK, "HS256");
  const token = await new SignJWT({ email }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("2h").sign(secretKey);
  cookies().set("token", token);

  redirect("/blog");
};
