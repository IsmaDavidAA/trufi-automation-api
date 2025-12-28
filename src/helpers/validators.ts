/**
 * Helpers para validar respuestas de la API OTP
 */

import { PlanResponse, Itinerary } from '../services/otp.service';

/**
 * Valida que la respuesta de plan tenga la estructura correcta
 */
export function validatePlanResponse(response: PlanResponse): void {
  expect(response).toBeDefined();
  expect(response).toHaveProperty('plan');
  expect(response.plan).toHaveProperty('itineraries');
  expect(Array.isArray(response.plan.itineraries)).toBe(true);
}

/**
 * Valida que haya al menos un itinerario
 */
export function validateHasItineraries(response: PlanResponse, minCount: number = 1): void {
  validatePlanResponse(response);
  expect(response.plan.itineraries.length).toBeGreaterThanOrEqual(minCount);
}

/**
 * Valida la estructura de un itinerario
 */
export function validateItinerary(itinerary: Itinerary): void {
  expect(itinerary).toBeDefined();
  expect(itinerary).toHaveProperty('duration');
  expect(itinerary).toHaveProperty('walkTime');
  expect(itinerary).toHaveProperty('transitTime');
  expect(itinerary).toHaveProperty('walkDistance');
  expect(itinerary).toHaveProperty('legs');
  expect(Array.isArray(itinerary.legs)).toBe(true);
  expect(typeof itinerary.duration).toBe('number');
  expect(itinerary.duration).toBeGreaterThan(0);
}

/**
 * Valida que las coordenadas estén en el rango válido
 */
export function validateCoordinates(lat: number, lon: number): void {
  expect(lat).toBeGreaterThanOrEqual(-90);
  expect(lat).toBeLessThanOrEqual(90);
  expect(lon).toBeGreaterThanOrEqual(-180);
  expect(lon).toBeLessThanOrEqual(180);
}

/**
 * Valida que la fecha esté en formato YYYY-MM-DD
 */
export function validateDateFormat(date: string): void {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  expect(date).toMatch(dateRegex);
  
  const dateObj = new Date(date);
  expect(dateObj.toString()).not.toBe('Invalid Date');
}

/**
 * Valida que la hora esté en formato HH:MM
 */
export function validateTimeFormat(time: string): void {
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  expect(time).toMatch(timeRegex);
}

/**
 * Convierte segundos a minutos
 */
export function secondsToMinutes(seconds: number): number {
  return Math.round(seconds / 60);
}

/**
 * Convierte metros a kilómetros
 */
export function metersToKilometers(meters: number): number {
  return Math.round((meters / 1000) * 100) / 100;
}

