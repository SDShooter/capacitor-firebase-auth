import { TwitterAuthProvider, signInWithPopup, useDeviceLanguage  } from 'firebase/auth';
import { SignInOptions, TwitterSignInResult } from '../definitions';

export const twitterSignInWeb: (options: { providerId: string, data?: SignInOptions }) => Promise<TwitterSignInResult>
    = async () => {
        const provider = new TwitterAuthProvider();
        useDeviceLanguage(null);
        const result = await signInWithPopup(null,provider); 
        const credential = TwitterAuthProvider.credentialFromResult(result);
       
        return new TwitterSignInResult(credential.accessToken as string, credential.secret as string);
        
    }
