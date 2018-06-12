export interface Claims {
  jti: string;
  exp: Date;
  nbf: Date;
  iat: Date;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  auth_time: number;
  session_state: string;
  at_hash: string;
  acr: string;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
}
