import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosUtil from "../utils/axiosUtil";
import { AxiosResponse } from "axios";

interface AuthContextProps {
  user: SessionUser | null;
  errors: LoginErrors | null;
  getUser: () => Promise<void>;
  login: ({ ...data }) => Promise<void>;
  register: ({ ...data }) => Promise<void>;
  logout: () => void;
  verifyEmail: () => void;
  isAuthenticated: boolean;
  csrf: () => Promise<AxiosResponse<any, any>>;
}

interface SessionUser {
  id: number | null;
  name: string;
  username: string;
  email: string;
  email_verified_at: Date | null;
  top_anime: any;
  created_at: Date | null;
  updated_at: Date | null;
}

interface LoginErrors {
  name?: string[];
  login?: string[];
  username?: string[];
  password?: string[];
  password_confirmation?: string[];
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
  verifyEmail: async () => {
    return Promise.resolve();
  },
  isAuthenticated: false,
  csrf: async () => {
    return Promise.resolve({ data: "" } as AxiosResponse<any, any>);
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  });
  const [errors, setErrors] = useState<LoginErrors>({
    name: [],
    username: [],
    login: [],
    password: [],
    password_confirmation: [],
  });

  const clearSession = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };

  useEffect(() => {
    axiosUtil.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 401) {
          setSessionExpired(true);
        }

        return Promise.reject(error);
      }
    );

    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState) {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
  }, []);

  useEffect(() => {
    if (sessionExpired) {
      clearSession();
    }
  }, [sessionExpired]);

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

      return Promise.resolve();
    } catch (err: any) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors);
      }

      return Promise.reject();
    }
  };

  const register = async ({ ...data }) => {
    await csrf();

    setErrors({});

    try {
      await axiosUtil.post("/register", data);
      await getUser();

      setIsAuthenticated(true);

      return Promise.resolve();
    } catch (err: any) {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors);
      }

      return Promise.reject();
    }
  };

  const logout = async () => {
    await axiosUtil.post("/logout").then(() => {
      clearSession();
    });
  };

  const verifyEmail = async () => {
    await csrf();

    try {
      const response = await axiosUtil.post("/email/verification-notification");

      console.log(response.status);
    } catch (err) {
      console.log(err);
    }
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
        verifyEmail,
        isAuthenticated,
        csrf,
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
