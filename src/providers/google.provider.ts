import { GoogleAuthProvider, useDeviceLanguage, signInWithPopup  } from 'firebase/auth';

import { GoogleSignInResult, SignInOptions } from '../definitions';

export const googleSignInWeb: (options: { providerId: string, data?: SignInOptions }) => Promise<GoogleSignInResult>
    = async () => {
        const provider = new GoogleAuthProvider();
        useDeviceLanguage(null); //TODO: added null
        const result = await signInWithPopup(null, provider); //TODO: added null
        const credential = GoogleAuthProvider.credentialFromResult(result);

        return new GoogleSignInResult(credential.idToken as string);
    }
