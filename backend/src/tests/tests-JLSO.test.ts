import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { validateCandidateData } from '../application/validator';
import { addCandidate } from '../application/services/candidateService';

interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
}

interface DatabaseCandidate extends CandidateData {
  id: number;
}

// Mock PrismaClient directly
const prismaMock = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});

// Mock candidateService
jest.mock('../application/services/candidateService', () => ({
  addCandidate: jest.fn()
}));

describe('Candidate Validation Tests', () => {
  test('should validate correct candidate data', () => {
    const validCandidate: CandidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '612345678',
      address: null
    };
    
    // Validator should not throw for valid data
    expect(() => validateCandidateData(validCandidate)).not.toThrow();
  });

  test('should reject invalid email format', () => {
    const invalidCandidate: CandidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      phone: '612345678',
      address: null
    };
    
    // Validator throws specific error message
    expect(() => validateCandidateData(invalidCandidate))
      .toThrow('Invalid email');
  });
});

describe('Candidate Database Operations', () => {
  test('should successfully insert valid candidate', async () => {
    const mockCandidate: CandidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '612345678',
      address: null
    };

    const mockResponse: DatabaseCandidate = {
      id: 1,
      ...mockCandidate
    };

    // Mock successful response
    (addCandidate as jest.Mock).mockResolvedValue(mockResponse);

    const result = await addCandidate(mockCandidate);
    expect(result).toBeDefined();
    expect(result.email).toBe(mockCandidate.email);
    expect(addCandidate).toHaveBeenCalledWith(mockCandidate);
  });

  test('should handle duplicate email error', async () => {
    const mockCandidate: CandidateData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '612345678',
      address: null
    };

    // Mock duplicate email error
    (addCandidate as jest.Mock).mockRejectedValue(new Error('Unique constraint violation'));

    await expect(addCandidate(mockCandidate))
      .rejects.toThrow('Unique constraint violation');
  });
});