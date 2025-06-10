export const BASE_URL = "https://apostolati.minisquaretechnologies.com";
export const TERMS_URL = BASE_URL + "/api/v2/users/termsAndCondition";
export const PRIVACY_URL = BASE_URL + "/api/v2/users/privacy";
export const CERTIFICATE_LINK = `${BASE_URL}/api/v2/users/downloadShareableCard`;
export const DONWLOAD_LINK = `${BASE_URL}/api/v2/users/downloadCard`;
export const ApiUserInventory = {
  login: "/api/v2/users/authenticate",
  changeFirstPassword: "/api/v2/users/change-first-password",
  forgotPassword: "/api/v2/users/forgot-password",
  verifyAccount: "/api/v2/user/verifyOtp",
  changePassord: "/api/v2/users/change-password",
  resetPassword: "/api/v2/user/reset-password",
  resendOtp: "/api/v2/user/resendOtp",
  updateProfile: "/api/v2/users/update-profile",
  getProfile: "/api/v2/users/profile",
  deleteAccount: "/api/v2/users/delete-my-account",
};

export const ApiHomeInventory = {
  getAllClubList: "/api/v2/users/get-all-clubs",
  addEnroll: "/api/v2/users/add-enrolle-data",
  getMyClubs: "/api/v2/users/get-my-clubs",
  getEnrollData: "/api/v2/users/get-enrolle-data",
};
