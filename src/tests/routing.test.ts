/**
 * Tests para el endpoint de routing (plan) de OTP
 */

import { otpService } from '../services/otp.service';
import { testRoutes } from '../fixtures/test-data';
import {
  validatePlanResponse,
  validateHasItineraries,
  validateItinerary,
  validateCoordinates,
  secondsToMinutes,
  metersToKilometers,
} from '../helpers/validators';
import { COCHABAMBA_LOCATIONS } from '../config/api.config';

describe('OTP Routing API', () => {
  describe('Basic Routing Tests', () => {
    test('should return route from Plaza Colón to Plaza 14 de Septiembre', async () => {
      const route = testRoutes.PLAZA_COLON_TO_PLAZA_14;
      const response = await otpService.planRoute(route.params);

      expect(response.status).toBe(200);
      validatePlanResponse(response.data);
      validateHasItineraries(response.data, 1);
    });

    test('should return route from Plaza 14 de Septiembre to Plaza Colón', async () => {
      const route = testRoutes.PLAZA_14_TO_PLAZA_COLON;
      const response = await otpService.planRoute(route.params);

      expect(response.status).toBe(200);
      validatePlanResponse(response.data);
      validateHasItineraries(response.data, 1);
    });

    test('should return route from Plaza Colón to Catedral', async () => {
      const route = testRoutes.PLAZA_COLON_TO_CATEDRAL;
      const response = await otpService.planRoute(route.params);

      expect(response.status).toBe(200);
      validatePlanResponse(response.data);
    });

    test('should return route from Catedral to Terminal', async () => {
      const route = testRoutes.CATEDRAL_TO_TERMINAL;
      const response = await otpService.planRoute(route.params);

      expect(response.status).toBe(200);
      validatePlanResponse(response.data);
    });
  });

  describe('Response Structure Validation', () => {
    test('should have correct structure for plan response', async () => {
      const route = testRoutes.PLAZA_COLON_TO_PLAZA_14;
      const response = await otpService.planRoute(route.params);

      validatePlanResponse(response.data);
      
      const firstItinerary = response.data.plan.itineraries[0];
      validateItinerary(firstItinerary);
    });

    test('should have valid coordinates in response', async () => {
      const route = testRoutes.PLAZA_COLON_TO_PLAZA_14;
      const response = await otpService.planRoute(route.params);

      validatePlanResponse(response.data);
      
      const plan = response.data.plan;
      validateCoordinates(plan.from.lat, plan.from.lon);
      validateCoordinates(plan.to.lat, plan.to.lon);
    });

    test('should have valid itinerary data', async () => {
      const route = testRoutes.PLAZA_COLON_TO_PLAZA_14;
      const response = await otpService.planRoute(route.params);

      if (response.data.plan.itineraries.length > 0) {
        const itinerary = response.data.plan.itineraries[0];
        
        expect(itinerary.duration).toBeGreaterThan(0);
        expect(itinerary.walkTime).toBeGreaterThanOrEqual(0);
        expect(itinerary.transitTime).toBeGreaterThanOrEqual(0);
        expect(itinerary.walkDistance).toBeGreaterThanOrEqual(0);
        
        // Verificar que tiene legs
        expect(itinerary.legs.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Route Information', () => {
    test('should provide route duration and distance', async () => {
      const route = testRoutes.PLAZA_COLON_TO_PLAZA_14;
      const response = await otpService.planRoute(route.params);

      validateHasItineraries(response.data, 1);
      
      const itinerary = response.data.plan.itineraries[0];
      const durationMinutes = secondsToMinutes(itinerary.duration);
      const distanceKm = metersToKilometers(itinerary.walkDistance);

      console.log(`Route: ${route.name}`);
      console.log(`Duration: ${durationMinutes} minutes`);
      console.log(`Distance: ${distanceKm} km`);
      console.log(`Walk time: ${secondsToMinutes(itinerary.walkTime)} minutes`);
      console.log(`Transit time: ${secondsToMinutes(itinerary.transitTime)} minutes`);

      expect(durationMinutes).toBeGreaterThan(0);
    });
  });

  describe('Parameter Validation', () => {
    test('should handle custom coordinates', async () => {
      const params = {
        fromPlace: COCHABAMBA_LOCATIONS.PLAZA_COLON.coords,
        toPlace: COCHABAMBA_LOCATIONS.PLAZA_14_SEPTIEMBRE.coords,
        date: '2023-12-15',
        time: '14:00',
      };

      const response = await otpService.planRoute(params);
      expect(response.status).toBe(200);
      validatePlanResponse(response.data);
    });

    test('should handle different times', async () => {
      const baseParams = {
        fromPlace: COCHABAMBA_LOCATIONS.PLAZA_COLON.coords,
        toPlace: COCHABAMBA_LOCATIONS.PLAZA_14_SEPTIEMBRE.coords,
        date: '2023-12-15',
      };

      const times = ['06:00', '12:00', '18:00'];
      
      for (const time of times) {
        const response = await otpService.planRoute({
          ...baseParams,
          time,
        });
        expect(response.status).toBe(200);
      }
    });
  });

  describe('Performance Tests', () => {
    test('should respond within reasonable time', async () => {
      const route = testRoutes.PLAZA_COLON_TO_PLAZA_14;
      const startTime = Date.now();
      
      await otpService.planRoute(route.params);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      console.log(`Response time: ${responseTime}ms`);
      expect(responseTime).toBeLessThan(10000); // Menos de 10 segundos
    });
  });
});

