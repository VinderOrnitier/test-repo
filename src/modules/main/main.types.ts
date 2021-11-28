export interface IPersonalStep {
  personalAddress: string;
  personaPhone: string;
}

export interface ICompanyStep {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
}

export interface IStepper extends IPersonalStep, ICompanyStep {
  displayName?: string,
  formComplete?: boolean,
  uid?: string,
  userImage?: string,
}