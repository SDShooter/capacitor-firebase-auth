import {useDeviceLanguage, OAuthProvider, signInWithPopup } from 'firebase/Auth';
import { AppleSignInResult, SignInOptions } from '../definitions';

export const appleSignInWeb: (options: { providerId: string, data?: SignInOptions }) => Promise<AppleSignInResult>
    = async () => {
        const provider = new OAuthProvider('apple.com');
        useDeviceLanguage(null); 
        const result = await signInWithPopup(null, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        
        return new AppleSignInResult(credential.idToken as string, '', credential.accessToken as string, credential.secret ?? "");
    }
