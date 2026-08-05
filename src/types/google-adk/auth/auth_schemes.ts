/**
 * Vendored types from @google/adk v1.5.0
 *
 * These types are copied locally to keep the client library lightweight.
 * Update when @google/adk changes significantly.
 *
 * @see https://github.com/google/adk-js/blob/main/core/src/auth/auth_schemes.ts
 */

/**
 * OpenIdConnectWithConfig extends OpenIdSecurityScheme with additional
 * configuration options.
 */
export interface OpenIdConnectWithConfig {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userinfoEndpoint?: string;
  revocationEndpoint?: string;
  tokenEndpointAuthMethodsSupported?: string[];
  grantTypesSupported?: string[];
  scopes?: string[];
}

/**
 * AuthSchemes contains SecuritySchemes from OpenAPI 3.0 and an extra flattened
 * OpenIdConnectWithConfig.
 */
export type AuthScheme = OpenIdConnectWithConfig;
