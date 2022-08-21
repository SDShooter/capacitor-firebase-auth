import firebaseAuth, { OAuthProvider } from 'firebase/Auth';
import { AppleSignInResult, SignInOptions } from '../definitions';

export const appleSignInWeb: (options: { providerId: string, data?: SignInOptions }) => Promise<AppleSignInResult>
    = async () => {
        const provider = new firebaseAuth.OAuthProvider('apple.com');
        firebaseAuth.useDeviceLanguage(null); //TODO: added null
        const result = await firebaseAuth.signInWithPopup(null, provider); //TODO: added null
        const credential = OAuthProvider.credentialFromResult(result);
        
        return new AppleSignInResult(credential.idToken as string, '', credential.accessToken as string, credential.secret ?? "");
    }
