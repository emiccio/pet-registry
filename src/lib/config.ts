export const config = {
  apiLogin: `${process.env.NEXTAUTH_URL}/api/auth/login`,
  apiRegister: `${process.env.NEXTAUTH_URL}/api/auth/register`,
  apiForgotPassword: `${process.env.NEXTAUTH_URL}/api/auth/forgot-password`,
  apiResetPassword: `${process.env.NEXTAUTH_URL}/api/auth/reset-password`,
  apiValidateToken: `${process.env.NEXTAUTH_URL}/api/auth/validate-token`,
  resetPasswordUrl: `${process.env.NEXTAUTH_URL}/reset-password`,

  resendToken: process.env.RESEND_API_KEY,
}