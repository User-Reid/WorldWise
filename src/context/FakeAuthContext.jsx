import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "wrong/login":
      return {
        initialState,
        error: action.payload,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        initialState,
      };
    default:
      throw new Error("Unknown action occured");
  }
}

const FAKE_USER = {
  name: "Reid",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({
        type: "wrong/login",
        payload: alert("you input wrong credentials"),
      });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("You are trying to use provider outside its paramaters.");
  return context;
}

export { AuthProvider, useAuth };
