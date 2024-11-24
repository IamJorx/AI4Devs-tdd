export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export interface DatabaseCandidate extends CandidateData {
  id: number;
}