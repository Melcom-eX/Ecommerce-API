import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const sendOTPToUser = async (userId: string): Promise<string> => {
  const otp = generateOTP(6);
  const expirationTime = new Date(Date.now() + 20 * 60 * 1000); // OTP valid for 5 minutes

  // Save OTP to database with expiration time
  await prisma.user.update({
    where: { id: userId },
    data: { otp, otpExpiration: expirationTime },
  });



  // Return the OTP string
  return otp;
};

function generateOTP(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}
