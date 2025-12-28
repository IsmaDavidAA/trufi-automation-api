/**
 * Datos de prueba (fixtures) para los tests
 */

import { COCHABAMBA_LOCATIONS, VALID_DATES } from '../config/api.config';
import { PlanRequestParams } from '../services/otp.service';

/**
 * Datos de prueba para requests de routing
 */
export const testRoutes = {
  PLAZA_COLON_TO_PLAZA_14: {
    name: 'Plaza Colón → Plaza 14 de Septiembre',
    params: {
      fromPlace: COCHABAMBA_LOCATIONS.PLAZA_COLON.coords,
      toPlace: COCHABAMBA_LOCATIONS.PLAZA_14_SEPTIEMBRE.coords,
      date: VALID_DATES.DEFAULT,
      time: '14:00',
    } as PlanRequestParams,
  },
  PLAZA_14_TO_PLAZA_COLON: {
    name: 'Plaza 14 de Septiembre → Plaza Colón',
    params: {
      fromPlace: COCHABAMBA_LOCATIONS.PLAZA_14_SEPTIEMBRE.coords,
      toPlace: COCHABAMBA_LOCATIONS.PLAZA_COLON.coords,
      date: VALID_DATES.DEFAULT,
      time: '14:00',
    } as PlanRequestParams,
  },
  PLAZA_COLON_TO_CATEDRAL: {
    name: 'Plaza Colón → Catedral',
    params: {
      fromPlace: COCHABAMBA_LOCATIONS.PLAZA_COLON.coords,
      toPlace: COCHABAMBA_LOCATIONS.CATEDRAL.coords,
      date: VALID_DATES.DEFAULT,
      time: '14:00',
    } as PlanRequestParams,
  },
  CATEDRAL_TO_TERMINAL: {
    name: 'Catedral → Terminal de Buses',
    params: {
      fromPlace: COCHABAMBA_LOCATIONS.CATEDRAL.coords,
      toPlace: COCHABAMBA_LOCATIONS.TERMINAL_BUSES.coords,
      date: VALID_DATES.DEFAULT,
      time: '14:00',
    } as PlanRequestParams,
  },
};

/**
 * Fechas válidas para tests
 */
export const testDates = [
  VALID_DATES.DEFAULT,
  '2023-08-15',
  '2023-09-15',
  '2023-10-15',
  '2023-11-15',
  '2023-12-15',
];

/**
 * Horarios para tests
 */
export const testTimes = [
  '06:00',
  '09:00',
  '12:00',
  '14:00',
  '17:00',
  '20:00',
];

