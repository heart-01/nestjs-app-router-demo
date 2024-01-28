"use server";

export const login = (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (email !== "admin" && password !== "1234") {
    return {
      ...prevState,
      message: "Invalid email or password",
    };
  }
};
