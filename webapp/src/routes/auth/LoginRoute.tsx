import { useState } from "react";

export const LoginRoute = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submitForm = (e) => {
    e.preventDefault();

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
    }).then((res) => console.log(res));
  };

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <input
        type="password"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={(e) =>
          setFormData({ ...formData, password_confirmation: e.target.value })
        }
      />
      <button type="submit">Submit form</button>
    </form>
  );
};
