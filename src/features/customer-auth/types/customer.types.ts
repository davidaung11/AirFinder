export interface CustomerProfile {
  fullName: string;
  phone: string;
  email: string;
  preferredArea: string;
  initials: string;
}

export interface CustomerRegistrationInput {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
