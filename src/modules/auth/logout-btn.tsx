import { useAppDispatch } from "../../shared/api/redux";
import { logoutThunk } from "./logout-thunk";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="border border-rose-300 p-3 rounded"
      onClick={() => dispatch(logoutThunk())}
    >
      Logout{" "}
    </button>
  );
};
