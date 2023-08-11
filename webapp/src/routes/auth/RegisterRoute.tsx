import { FormEvent, useState } from "react";
import axiosUtil from "../../utils/axiosUtil";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../context/AuthenticationContext";
import { Eye, EyeOff, UserPlus2 } from "lucide-react";
import { FormGroup } from "../../components/common/FormGroup";
import { TextInput } from "../../components/common/TextInput";
import { Button } from "../../components/common/Button";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [passwordState, setPasswordState] = useState({
    showPass: false,
    showConfirmPass: false,
  });

  const navigate = useNavigate();

  const { register, errors } = useAuthContext();

  const csrf = () => axiosUtil.get("/sanctum/csrf-cookie");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await register({
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 max-w-xl bg-black/50 shadow-lg backdrop-blur-sm border border-white/10 rounded-md mx-auto mt-64"
      >
        <div className="pt-6 pb-3 border-b border-white/10 mx-6">
          <h1 className="text-3xl font-bold text-white">
            Create an Anisense Account
          </h1>
        </div>
        <div className="px-6 pb-6 flex flex-col gap-4">
          <FormGroup
            label="Full Name"
            htmlFor="name"
            error={errors?.name ? errors?.name[0] : undefined}
          >
            <TextInput
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              variant="glassmorphic"
            />
          </FormGroup>
          <FormGroup
            label="Username"
            htmlFor="username"
            error={errors?.username ? errors?.username[0] : undefined}
          >
            <TextInput
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              variant="glassmorphic"
            />
          </FormGroup>
          <FormGroup
            label="Email"
            htmlFor="email"
            error={errors?.email ? errors?.email[0] : undefined}
          >
            <TextInput
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              variant="glassmorphic"
            />
          </FormGroup>
          <FormGroup
            label="Password"
            htmlFor="password"
            error={errors?.password?.[0]}
            endComponent={
              <Button
                size="sm"
                type="button"
                onClick={() =>
                  setPasswordState({
                    ...passwordState,
                    showPass: !passwordState.showPass,
                  })
                }
              >
                {passwordState.showPass ? <EyeOff /> : <Eye />}
              </Button>
            }
          >
            <TextInput
              type={passwordState.showPass ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              variant="glassmorphic"
            />
          </FormGroup>
          <FormGroup
            label="Confirm Password"
            htmlFor="passwordConfirmation"
            error={errors?.password_confirmation?.[0]}
            endComponent={
              <Button
                size="sm"
                type="button"
                onClick={() =>
                  setPasswordState({
                    ...passwordState,
                    showConfirmPass: !passwordState.showConfirmPass,
                  })
                }
              >
                {passwordState.showConfirmPass ? <EyeOff /> : <Eye />}
              </Button>
            }
          >
            <TextInput
              type={passwordState.showConfirmPass ? "text" : "password"}
              value={formData.passwordConfirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passwordConfirmation: e.target.value,
                })
              }
              variant="glassmorphic"
            />
          </FormGroup>

          <div>
            <button
              className="py-2 px-8 flex items-center gap-2 float-right rounded font-bold text-white mt-4 bg-emerald-700"
              type="submit"
            >
              Register
              <UserPlus2 />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
