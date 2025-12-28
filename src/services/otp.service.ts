/**
 * Servicio para interactuar con la API de OpenTripPlanner (OTP)
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api.config';

export interface PlanRequestParams {
  fromPlace: string; // Formato: "lat,lon"
  toPlace: string; // Formato: "lat,lon"
  date: string; // Formato: "YYYY-MM-DD"
  time: string; // Formato: "HH:MM"
  mode?: string; // Opcional: "WALK", "TRANSIT,WALK", etc.
  numItineraries?: number; // Opcional: número de itinerarios
}

export interface Itinerary {
  duration: number; // en segundos
  walkTime: number;
  transitTime: number;
  walkDistance: number;
  legs: Array<{
    mode: string;
    from: { lat: number; lon: number; name?: string };
    to: { lat: number; lon: number; name?: string };
    distance: number;
    duration: number;
    route?: string;
  }>;
}

export interface PlanResponse {
  plan: {
    date: number;
    from: { lat: number; lon: number; name?: string };
    to: { lat: number; lon: number; name?: string };
    itineraries: Itinerary[];
  };
  requestParameters?: Record<string, string>;
  error?: {
    id: number;
    msg: string;
    message: string;
  };
}

export class OTPService {
  private client: AxiosInstance;

  constructor(baseURL: string = API_CONFIG.BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Health check del servidor OTP
   */
  async healthCheck(): Promise<AxiosResponse> {
    return this.client.get(API_CONFIG.ENDPOINTS.HEALTH);
  }

  /**
   * Obtiene rutas entre dos puntos
   */
  async planRoute(params: PlanRequestParams): Promise<AxiosResponse<PlanResponse>> {
    const queryParams: Record<string, string | number> = {
      fromPlace: params.fromPlace,
      toPlace: params.toPlace,
      date: params.date,
      time: params.time,
    };

    if (params.mode) {
      queryParams.mode = params.mode;
    }

    if (params.numItineraries) {
      queryParams.numItineraries = params.numItineraries;
    }

    return this.client.get<PlanResponse>(API_CONFIG.ENDPOINTS.PLAN, {
      params: queryParams,
    });
  }
}

// Instancia singleton
export const otpService = new OTPService();

