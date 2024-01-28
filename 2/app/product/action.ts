"use server";

export const handleSubmitForm = async (formData: FormData) => {
  const email = formData.get("email");
  console.log(email);
};
