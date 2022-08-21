import firebaseAuth from 'firebase/auth';

import { Observable, throwError } from 'rxjs';

import { CapacitorFirebaseAuth } from '../';
import {
  AppleSignInResult, FacebookSignInResult, GoogleSignInResult, PhoneSignInResult, SignInOptions,
  SignInResult, TwitterSignInResult
} from '../definitions';

/**
 * Call the sign in method on native layer and sign in on web layer with retrieved credentials.
 * @param providerId The provider identification.
 * @param data The provider additional information (optional).
 */
export const cfaSignIn = (providerId: string, data?: SignInOptions): Observable<{ userCredential: firebaseAuth.UserCredential, result: SignInResult }> => {
	const googleProvider = new firebaseAuth.GoogleAuthProvider().providerId;
	const facebookProvider = new firebaseAuth.FacebookAuthProvider().providerId;
	const twitterProvider = new firebaseAuth.TwitterAuthProvider().providerId;
	const phoneProvider = new firebaseAuth.PhoneAuthProvider(null).providerId; //TODO: Added null here
	switch (providerId) {
		case googleProvider:
			return cfaSignInGoogle();
		case twitterProvider:
			return cfaSignInTwitter();
		case facebookProvider:
			return cfaSignInFacebook();
		case cfaSignInAppleProvider:
			return cfaSignInApple();
		case phoneProvider:
			return cfaSignInPhone(data?.phone as string, data?.verificationCode as string);
		default:
			return throwError(new Error(`The '${providerId}' provider was not supported`));
	}
};

/**
 * Call the Google sign in method on native layer and sign in on web layer, exposing the entire native result
 * for use Google API with "user auth" authentication and the entire user credential from Firebase.
 * @return Observable<{user: firebase.User, result: GoogleSignInResult}}>
 * @See Issue #23.
 */
export const cfaSignInGoogle = (): Observable<{ userCredential: firebaseAuth.UserCredential, result: GoogleSignInResult }> => {
	return new Observable(observer => {
		// get the provider id
		const providerId = firebaseAuth.GoogleAuthProvider.PROVIDER_ID;

		// native sign in
		CapacitorFirebaseAuth.signIn<GoogleSignInResult>({ providerId }).then((result: GoogleSignInResult) => {
			// create the credentials
			const credential = firebaseAuth.GoogleAuthProvider.credential(result.idToken);

			// web sign in
			firebaseAuth.signInWithCredential(null, credential) //TODO: added null
				.then((userCredential: firebaseAuth.UserCredential) => {
					observer.next({ userCredential, result });
					observer.complete();
				})
				.catch((reject: any) => {
					observer.error(reject);
				});
		}).catch(reject => {
			observer.error(reject);
		});
	});
};

/**
 * Call the Facebook sign in method on native and sign in on web layer, exposing the entire native result
 * for use Facebook API with "user auth" authentication and the entire user credential from Firebase.
 * @return Observable<{user: firebase.User, result: FacebookSignInResult}}>
 * @See Issue #23.
 */
export const cfaSignInFacebook = (): Observable<{ userCredential: firebaseAuth.UserCredential, result: FacebookSignInResult }> => {
	return new Observable(observer => {
		// get the provider id
		const providerId = firebaseAuth.FacebookAuthProvider.PROVIDER_ID;

		// native sign in
		CapacitorFirebaseAuth.signIn<FacebookSignInResult>({ providerId }).then((result: FacebookSignInResult) => {
			// create the credentials
			const credential = firebaseAuth.FacebookAuthProvider.credential(result.idToken);

			// web sign in
			firebaseAuth.signInWithCredential(null, credential) //TODO: added null
				.then((userCredential: firebaseAuth.UserCredential) => {
					observer.next({ userCredential, result });
					observer.complete();
				})
				.catch((reject: any) => observer.error(reject));

		}).catch(reject => observer.error(reject));
	});
};

/**
 * Call the Twitter sign in method on native and sign in on web layer, exposing the entire native result
 * for use Twitter User API with "user auth" authentication and the entire user credential from Firebase.
 * @return Observable<{user: firebase.User, result: TwitterSignInResult}}>
 * @See Issue #23.
 */
export const cfaSignInTwitter = (): Observable<{ userCredential: firebaseAuth.UserCredential, result: TwitterSignInResult }> => {
	return new Observable(observer => {
		// get the provider id
		const providerId = firebaseAuth.TwitterAuthProvider.PROVIDER_ID;

		// native sign in
		CapacitorFirebaseAuth.signIn<TwitterSignInResult>({ providerId }).then((result: TwitterSignInResult) => {
			// create the credentials
			const credential = firebaseAuth.TwitterAuthProvider.credential(result.idToken, result.secret);

			// web sign in
			firebaseAuth.signInWithCredential(null, credential) //TODO: added null
				.then((userCredential: firebaseAuth.UserCredential) => {
					observer.next({ userCredential, result });
					observer.complete();
				})
				.catch((reject: any) => observer.error(reject));

		}).catch(reject => observer.error(reject));
	});
};

export const cfaSignInAppleProvider = 'apple.com';

/**
 * Call the Apple sign in method on native and sign in on web layer with retrieved credentials.
 */
export const cfaSignInApple = (): Observable<{ userCredential: firebaseAuth.UserCredential, result: AppleSignInResult }> => {
	return new Observable(observer => {
		// native sign in
		CapacitorFirebaseAuth.signIn<AppleSignInResult>({ providerId: cfaSignInAppleProvider }).then((result: AppleSignInResult) => {

			const provider = new firebaseAuth.OAuthProvider('apple.com');
			provider.addScope('email');
			provider.addScope('name');

			const credential = provider.credential(result)

			// web sign in
			firebaseAuth.signInWithCredential(null, credential) //TODO: added null
				.then((userCredential: firebaseAuth.UserCredential) => {
					observer.next({ userCredential, result });
					observer.complete();
				})
				.catch((reject: any) => observer.error(reject));
		}).catch(reject => observer.error(reject));
	});
}

/**
 * Call the Phone verification sign in, handling send and retrieve to code on native, but only sign in on web with retrieved credentials.
 * This implementation is just to keep everything in compliance if others providers in this alternative calls.
 * @param phone The user phone number.
 * @param verificationCode The verification code sent by SMS (optional).
 */
export const cfaSignInPhone = (phone: string, verificationCode?: string): Observable<{ userCredential: firebaseAuth.UserCredential, result: PhoneSignInResult }> => {
	return new Observable(observer => {
		// get the provider id
		const providerId = firebaseAuth.PhoneAuthProvider.PROVIDER_ID;

		CapacitorFirebaseAuth.signIn<PhoneSignInResult>({ providerId, data: { phone, verificationCode } }).then((result: PhoneSignInResult) => {
			// if there is no verification code
			if (!result.verificationCode) {
				return observer.complete();
			}

			// create the credentials
			const credential = firebaseAuth.PhoneAuthProvider.credential(result.verificationId, result.verificationCode);

			// web sign in
			firebaseAuth.signInWithCredential(null, credential) //TODO: added null
				.then((userCredential: firebaseAuth.UserCredential) => {
					observer.next({ userCredential, result });
					observer.complete();
				})
				.catch((reject: any) => observer.error(reject));

		}).catch(reject => observer.error(reject));

	});
};

// re-exporting the unchanged functions from facades for simple imports.
export { cfaSignInPhoneOnCodeReceived, cfaSignInPhoneOnCodeSent, cfaSignOut } from '../facades'
