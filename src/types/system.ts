/**
 * Response returned by the service health check endpoint.
 */
export interface HealthResponse {
  status: string;
}

/**
 * Response returned by the service version endpoint.
 */
export interface VersionResponse {
  version: string;
  language: string;
  language_version?: string;
}
