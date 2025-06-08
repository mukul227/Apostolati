import { ApiUserInventory } from "@/utils/APIinventory";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: ApiUserInventory.login,
        method: "POST",
        body: credentials,
      }),
    }),

    register: build.mutation({
      query: (userInfo) => ({
        url: ApiUserInventory.signup,
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyAccount: build.mutation({
      query: (data) => ({
        url: ApiUserInventory.verifyAccount,
        method: "POST",
        body: data,
      }),
    }),
    updateProfileVerification: build.mutation({
      query: (data) => ({
        url: ApiUserInventory.updateProfileVerification,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: build.mutation({
      query: () => ({
        url: ApiUserInventory.forgotPassword,
        method: "POST",
      }),
    }),
    resetPassword: build.mutation({
      query: () => ({
        url: ApiUserInventory.resetPassword,
        method: "POST",
      }),
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: ApiUserInventory.changePassord,
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: build.mutation({
      query: (data) => ({
        url: ApiUserInventory.resendOtp,
        method: "POST",
        body: data,
      }),
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: ApiUserInventory.updateProfile,
        method: "POST",
        body: data,
      }),
    }),

    getProfile: build.mutation({
      query: () => ({
        url: ApiUserInventory.getProfile,
        method: "GET",
      }),
    }),

    deletAccount: build.mutation({
      query: (data) => ({
        url: ApiUserInventory.deleteAccount,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
  useUpdateProfileMutation,
  useGetProfileMutation,
  useVerifyAccountMutation,
  useUpdateProfileVerificationMutation,
  useChangePasswordMutation,
  useDeletAccountMutation,
} = authApi;
