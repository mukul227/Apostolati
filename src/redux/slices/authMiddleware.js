import { logout } from "./userSlicer";
const authMiddleware = (store) => (next) => (action) => {
  if (
    action?.payload?.status === 401 &&
    action?.meta?.arg?.endpointName !== "changePassword"
  ) {
    store.dispatch(logout());
  }
  return next(action);
};
export default authMiddleware;
