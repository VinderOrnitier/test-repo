export interface IUserState {
  users: any;
  loading: boolean;
  error: any;
}

export interface IPersonalStep {
  personalAddress: string;
  personaPhone: string;
}

export interface ICompanyStep {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
}