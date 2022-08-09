import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/store";
import { RootState } from "../store";
import { authActions } from "../store/auth";

export const LoginArea = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <button
      onClick={() => {
        isLoggedIn
          ? dispatch(authActions.logout())
          : dispatch(authActions.login({ token: "MY_TOKEN" }));
      }}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );
};
