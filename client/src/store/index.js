import { configureStore } from "@reduxjs/toolkit";
import errors from "./errors";
import session from "./session";
import user from "./user";

export default configureStore({
  reducer: { errors, session, user },
});
