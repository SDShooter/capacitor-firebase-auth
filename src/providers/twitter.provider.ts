import firebaseAuth, { TwitterAuthProvider } from 'firebase/auth';
import { SignInOptions, TwitterSignInResult } from '../definitions';

export const twitterSignInWeb: (options: { providerId: string, data?: SignInOptions }) => Promise<TwitterSignInResult>
    = async () => {
        const provider = new firebaseAuth.TwitterAuthProvider();
        firebaseAuth.useDeviceLanguage(null);
        const result = await firebaseAuth.signInWithPopup(null,provider); //TODO: Added null
        const credential = TwitterAuthProvider.credentialFromResult(result);
       
        return new TwitterSignInResult(credential.accessToken as string, credential.secret as string);
        
    }
