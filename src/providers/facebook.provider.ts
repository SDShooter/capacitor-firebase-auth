import { FacebookAuthProvider, useDeviceLanguage, signInWithPopup } from 'firebase/auth';

import { FacebookSignInResult, SignInOptions } from '../definitions';

export const facebookSignInWeb: (options: { providerId: string, data?: SignInOptions }) => Promise<FacebookSignInResult>
    = async () => {
        const provider = new FacebookAuthProvider();
        useDeviceLanguage(null); 
        const result = await signInWithPopup(null, provider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        return new FacebookSignInResult(credential?.accessToken as string);
    }
