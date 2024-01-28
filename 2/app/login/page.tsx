"use client";

import React from "react";
import { useFormState } from "react-dom";
import { login } from "./action";

type Props = {};

const initState = {
  message: "",
};

const page = ({}: Props) => {
  const [state, formAction] = useFormState(login, initState);

  return (
    <form action={formAction}>
      <div>
        <span>Email</span>
        <input type="text" name="email" />
      </div>
      <div>
        <span>Password</span>
        <input type="password" name="password" />
      </div>
      <div>Message: {state.message}</div>
      <button type="submit">Login</button>
    </form>
  );
};

export default page;
