/**
 * The auth config sent by tool asking client to collect auth credentials and
 * adk and client will help to fill in the response.
 */
export interface AdkAuthConfig {
  authScheme: AdkAuthScheme;
  rawAuthCredential?: AdkAuthCredential;
  exchangedAuthCredential?: AdkAuthCredential;
  credentialKey?: string;
}

/**
 * AuthScheme contains SecuritySchemes from OpenAPI 3.0 and an extra flattened
 * OpenIdConnectWithConfig.
 */
export interface AdkAuthScheme {
  type: string;
  description: string;
  in: string;
  name: string;
}

/**
 * Data class representing an authentication credential.
 */
export interface AdkAuthCredential {
  authType: string;
  resourceRef?: string;
  apiKey?: string;
  http?: AdkHttpAuth;
  serviceAccount?: AdkServiceAccountAuth;
  oauth2?: AdkOAuth2Auth;
}

/**
 * The credentials and metadata for HTTP authentication.
 */
export interface AdkHttpAuth {
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
export interface AdkServiceAccountAuth {
  serviceAccountCredential: AdkServiceAccountCredential;
  scopes: string[];
  useDefaultCredential?: boolean;
}

/**
 * Represents Google Service Account configuration.
 */
export interface AdkServiceAccountCredential {
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
export interface AdkOAuth2Auth {
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
