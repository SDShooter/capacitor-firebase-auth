import firebaseAuth, { FacebookAuthProvider } from 'firebase/auth';

import { FacebookSignInResult, SignInOptions } from '../definitions';

//import OAuthCredential = firebaseAuth.OAuthCredential;

export const facebookSignInWeb: (options: { providerId: string, data?: SignInOptions }) => Promise<FacebookSignInResult>
    = async () => {
        const provider = new firebaseAuth.FacebookAuthProvider();
        firebaseAuth.useDeviceLanguage(null); //TODO: added null
        const result = await firebaseAuth.signInWithPopup(null, provider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        return new FacebookSignInResult(credential?.accessToken as string);
    }
