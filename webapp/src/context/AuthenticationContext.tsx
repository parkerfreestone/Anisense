import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosUtil from "../utils/axiosUtil";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  user: SessionUser | null;
  errors: LoginErrors | null;
  getUser: () => Promise<void>;
  login: ({ ...data }) => void;
  register: ({ ...data }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

interface SessionUser {
  id: number | null;
  name: String;
  email: String;
  email_verified_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

interface LoginErrors {
  name?: String[];
  email?: String[];
  password?: String[];
  password_confirmation?: String[];
}

// LORD FORVIE ME...
const AuthContext = createContext<AuthContextProps>({
  user: null,
  errors: null,
  getUser: async () => {
    return Promise.resolve();
  },
  login: async () => {
    return Promise.resolve();
  },
  register: async () => {
    return Promise.resolve();
  },
  logout: async () => {
    return Promise.resolve();
  },
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  });
  const [errors, setErrors] = useState<LoginErrors>({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const csrf = () => axiosUtil.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axiosUtil.get("/api/user");
    setUser(data);
  };

  const login = async ({ ...data }) => {
    await csrf();

    setErrors({});

    try {
      await axiosUtil.post("/login", data);
      await getUser();

      setIsAuthenticated(true);

      navigate("/");
    } catch (err: any) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const register = async ({ ...data }) => {
    await csrf();

    setErrors({});

    try {
      await axiosUtil.post("/register", data);
      await getUser();

      setIsAuthenticated(true);

      navigate("/");
    } catch (err: any) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const logout = async () => {
    axiosUtil.post("/logout").then(() => {
      setUser(null);
    });

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        getUser,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
