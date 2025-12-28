/**
 * Configuración de la API de Trufi OTP
 */

export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:8080',
  OTP_ROUTER: 'default',
  ENDPOINTS: {
    HEALTH: '/otp/routers/default',
    PLAN: '/otp/routers/default/plan',
  },
  TIMEOUT: 30000, // 30 segundos
} as const;

/**
 * Coordenadas de lugares conocidos en Cochabamba
 */
export const COCHABAMBA_LOCATIONS = {
  PLAZA_COLON: {
    name: 'Plaza Colón',
    lat: -17.3935,
    lon: -66.1568,
    coords: '-17.3935,-66.1568',
  },
  PLAZA_14_SEPTIEMBRE: {
    name: 'Plaza 14 de Septiembre',
    lat: -17.3895,
    lon: -66.1568,
    coords: '-17.3895,-66.1568',
  },
  CATEDRAL: {
    name: 'Catedral de Cochabamba',
    lat: -17.3933,
    lon: -66.1569,
    coords: '-17.3933,-66.1569',
  },
  TERMINAL_BUSES: {
    name: 'Terminal de Buses',
    lat: -17.3910,
    lon: -66.1580,
    coords: '-17.3910,-66.1580',
  },
} as const;

/**
 * Fechas válidas para el calendario GTFS (2023-07-29 a 2023-12-31)
 */
export const VALID_DATES = {
  START: '2023-07-29',
  END: '2023-12-31',
  DEFAULT: '2023-12-15',
} as const;

