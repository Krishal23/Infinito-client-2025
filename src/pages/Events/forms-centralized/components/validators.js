export const validators = {
  name: (val) => {
    if (!val?.trim()) return "Name is required.";
    if (val.length > 30) return "Name must be ≤ 30 characters.";
    if (!/^[A-Za-z\s.'-]+$/.test(val)) return "Only letters and spaces allowed.";
    return "";
  },
  email: (val) => {
    if (!val?.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) return "Invalid email address.";
    return "";
  },
  phone: (val) => {
    if (!val?.trim()) return "Phone number is required.";
    if (!/^\d{10}$/.test(val)) return "Must be 10 digits.";
    return "";
  },
  aadhaar: (val) => {
    if (!val?.trim()) return "Aadhaar is required.";
    if (!/^\d{12}$/.test(val)) return "Must be 12 digits.";
    return "";
  },
};
