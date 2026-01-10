/**
 * The auth config sent by tool asking client to collect auth credentials and
 * adk and client will help to fill in the response.
 */
export interface AuthConfig {
  authScheme: AuthScheme;
  rawAuthCredential?: AuthCredential;
  exchangedAuthCredential?: AuthCredential;
  credentialKey?: string;
}

/**
 * AuthScheme contains SecuritySchemes from OpenAPI 3.0 and an extra flattened
 * OpenIdConnectWithConfig.
 */
export interface AuthScheme {
  type: string;
  description: string;
  in: string;
  name: string;
}

/**
 * Data class representing an authentication credential.
 */
export interface AuthCredential {
  authType: string;
  resourceRef?: string;
  apiKey?: string;
  http?: HttpAuth;
  serviceAccount?: ServiceAccountAuth;
  oauth2?: OAuth2Auth;
}

/**
 * The credentials and metadata for HTTP authentication.
 */
export interface HttpAuth {
  scheme: string;
  credentials: {
    username?: string;
    password?: string;
    token?: string;
  };
}

/**
 * Represents Google Service Account configuration.
 */
export interface ServiceAccountAuth {
  serviceAccountCredential: ServiceAccountCredential;
  scopes: string[];
  useDefaultCredential?: boolean;
}

/**
 * Represents Google Service Account configuration.
 */
export interface ServiceAccountCredential {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientX509CertUrl: string;
  universeDomain: string;
}

/**
 * Represents credential value and its metadata for a OAuth2 credential.
 */
export interface OAuth2Auth {
  clientId: string;
  clientSecret: string;
  authUri: string;
  state: string;
  redirectUri: string;
  authResponseUri: string;
  authCode: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  expiresIn: number;
}
