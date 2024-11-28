import randomatic from "randomatic";

/**
 * Generates a unique 11-digit wallet ID using only numbers
 * @returns string - 11 digit wallet ID
 */
export const generateWalletId = (): number => {
  // Generate random 11 digit string with only numbers
  const walletId = parseInt(randomatic("0", 11));
  return walletId;
};
