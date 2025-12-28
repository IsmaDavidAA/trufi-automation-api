/**
 * Tests para el health check del servidor OTP
 */

/// <reference types="jest" />

import { otpService } from "../services/otp.service";
import { API_CONFIG } from "../config/api.config";

describe("OTP Health Check", () => {
  test("should return 200 OK when server is running", async () => {
    const response = await otpService.healthCheck();

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  test("should respond within timeout limit", async () => {
    const startTime = Date.now();
    await otpService.healthCheck();
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(API_CONFIG.TIMEOUT);
  });

  test("should have correct base URL", () => {
    expect(API_CONFIG.BASE_URL).toBe("http://localhost:8080");
  });
});
