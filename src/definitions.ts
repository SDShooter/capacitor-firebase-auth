import firebaseAuth from 'firebase/auth';

export interface SignInResult {
}

export interface CapacitorFirebaseAuthPlugin {
  signIn<T extends SignInResult>(options: { providerId: string, data?: SignInOptions }): Promise<T>;
  signOut(options: {}): Promise<void>;
}

export class GoogleSignInResult implements SignInResult {
  providerId = firebaseAuth.GoogleAuthProvider.PROVIDER_ID;
  constructor(public idToken: string) {
  }
}

export class TwitterSignInResult implements SignInResult {
  providerId = firebaseAuth.TwitterAuthProvider.PROVIDER_ID;
  constructor(public idToken: string, public secret: string) {
  }
}

export class FacebookSignInResult implements SignInResult {
  providerId = firebaseAuth.FacebookAuthProvider.PROVIDER_ID;
  constructor(public idToken: string) {
  }
}

export class AppleSignInResult implements SignInResult {
  providerId = firebaseAuth.FacebookAuthProvider.PROVIDER_ID;
  constructor(public idToken: string, public rawNonce: string, public accessToken: string, public secret: string) {
  }
}

export class PhoneSignInResult implements SignInResult {
  providerId = firebaseAuth.PhoneAuthProvider.PROVIDER_ID;
  constructor(public verificationId: string, public verificationCode: string) {
  }
}

export interface PhoneSignInOptions {
  container?: HTMLElement
  phone: string,
  verificationCode?: string
}

export type SignInOptions = PhoneSignInOptions;
