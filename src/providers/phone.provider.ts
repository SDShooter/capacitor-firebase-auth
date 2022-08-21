import { RecaptchaVerifier, useDeviceLanguage, signInWithPhoneNumber } from 'firebase/auth';
import { PhoneSignInResult, SignInOptions } from '../definitions';

export const phoneSignInWeb: (options: { providerId: string, data?: SignInOptions }) => Promise<PhoneSignInResult>
    = async (options) => {
        useDeviceLanguage(null);
        const code = options.data?.verificationCode as string;
        const verifier = new RecaptchaVerifier(options.data?.container, null, null); //TODO: This is likely broken?
        const userCredential = await signInWithPhoneNumber(null, options.data?.phone as string, verifier); //TODO: Added null
        const confirmation = await userCredential.confirm(code);
        const idToken = await confirmation.user?.getIdToken()
        return new PhoneSignInResult(idToken as string, code);
    }
