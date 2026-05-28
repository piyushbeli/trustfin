export const maskPhoneNumber = (phoneNumber: string): string => {
  const digits = phoneNumber.replace(/\D/g, '');
  if (digits.length !== 10) {
    return phoneNumber;
  }

  return `${digits.slice(0, 2)}****${digits.slice(-4)}`;
};
