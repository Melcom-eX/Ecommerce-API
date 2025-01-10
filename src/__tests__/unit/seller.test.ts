// src/controllers/__tests__/seller.controller.test.ts
import { Request, Response } from 'express';
import { sellerController } from '../../components/seller/seller.controller';
import { sellerService } from '../../components/seller/seller.service';
import { CreateSellerDto} from '../../components/seller/seller.validation';
import { SellerResponse } from '../../components/seller/seller.response';

// Mock the seller service
jest.mock('../seller.service');

describe('SellerController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockResponse: {
    status: jest.Mock;
    json: jest.Mock;
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Create fresh mock response functions
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    res = mockResponse as unknown as Partial<Response>;
  });

  describe('createSeller', () => {
    const mockSellerData: CreateSellerDto = {
      businessName: 'Test Business',
      description: 'Test Description',
      businessAddress: '123 Test St',
      taxId: 'TEST123',
      bankAccount: 'TEST456',
      businessPhone: '1234567890',
      businessEmail: 'test@business.com',
      logo: 'test-logo.jpg'
    };

    const mockSellerResponse: SellerResponse = {
      id: 'test-seller-id',
      businessName: 'Test Business',
      description: 'Test Description',
      businessAddress: '123 Test St',
      businessPhone: '1234567890',
      businessEmail: 'test@business.com',
      logo: 'test-logo.jpg',
      rating: 0,
      totalSales: 0,
      isVerified: false,
      createdAt: new Date()
    };

    it('should successfully create a seller account', async () => {
      // Arrange
      req = {
        user: { id: 'test-user-id' },
        body: mockSellerData
      };

      (sellerService.createSeller as jest.Mock).mockResolvedValue(mockSellerResponse);

      // Act
      await sellerController.createSeller(req as Request, res as Response);

      // Assert
      expect(sellerService.createSeller).toHaveBeenCalledWith('test-user-id', mockSellerData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: true,
        message: 'Seller account created successfully',
        data: mockSellerResponse
      });
    });

    it('should return 401 if user is not authenticated', async () => {
      // Arrange
      req = {
        user: undefined,
        body: mockSellerData
      };

      // Act
      await sellerController.createSeller(req as Request, res as Response);

      // Assert
      expect(sellerService.createSeller).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: false,
        message: 'User not authenticated',
        data: null
      });
    });

    it('should handle service errors appropriately', async () => {
      // Arrange
      req = {
        user: { id: 'test-user-id' },
        body: mockSellerData
      };

      const mockError = new Error('User already has a seller account');
      Object.defineProperty(mockError, 'status', { value: 400 });
      (sellerService.createSeller as jest.Mock).mockRejectedValue(mockError);

      // Act
      await sellerController.createSeller(req as Request, res as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: false,
        message: 'User already has a seller account',
        data: null
      });
    });

    it('should handle unknown errors with 500 status', async () => {
      // Arrange
      req = {
        user: { id: 'test-user-id' },
        body: mockSellerData
      };

      (sellerService.createSeller as jest.Mock).mockRejectedValue(new Error());

      // Act
      await sellerController.createSeller(req as Request, res as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: false,
        message: 'Internal server error',
        data: null
      });
    });

    it('should validate required fields in the request body', async () => {
      // Arrange
      const invalidSellerData = {
        // Missing required fields
        businessName: 'Test Business',
        // Missing businessAddress
        // Missing businessPhone
        // Missing businessEmail
      };

      req = {
        user: { id: 'test-user-id' },
        body: invalidSellerData
      };

      const mockError = new Error('Validation error');
      Object.defineProperty(mockError, 'status', { value: 400 });
      (sellerService.createSeller as jest.Mock).mockRejectedValue(mockError);

      // Act
      await sellerController.createSeller(req as Request, res as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: false,
        message: 'Validation error',
        data: null
      });
    });
  });

  // Additional tests for optional fields
  describe('createSeller with optional fields', () => {
    it('should create seller without optional fields', async () => {
      // Arrange
      const minimalSellerData = {
        businessName: 'Test Business',
        businessAddress: '123 Test St',
        businessPhone: '1234567890',
        businessEmail: 'test@business.com'
      };

      const minimalSellerResponse = {
        id: 'test-seller-id',
        businessName: 'Test Business',
        description: null,
        businessAddress: '123 Test St',
        businessPhone: '1234567890',
        businessEmail: 'test@business.com',
        logo: null,
        rating: 0,
        totalSales: 0,
        isVerified: false,
        createdAt: new Date()
      };

      req = {
        user: { id: 'test-user-id' },
        body: minimalSellerData
      };

      (sellerService.createSeller as jest.Mock).mockResolvedValue(minimalSellerResponse);

      // Act
      await sellerController.createSeller(req as Request, res as Response);

      // Assert
      expect(sellerService.createSeller).toHaveBeenCalledWith('test-user-id', minimalSellerData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: true,
        message: 'Seller account created successfully',
        data: minimalSellerResponse
      });
    });
  });
});