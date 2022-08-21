import firebaseAuth from 'firebase/auth';
import { Observable, pipe, UnaryFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Operator to map firebase.User to firebase.UserInfo.
 *
 * Sample of use:
 *
 * ```ts
 * import {cfaSignIn, mapUserToUserInfo} from 'capacitor-firebase-auth';
 * import {UserInfo} from 'firebase/app';
 *
 * cfaSignIn('google.com').pipe(
 *     mapUserToUserInfo(),
 * ).subscribe(
 *     (user: UserInfo) => console.log(user.displayName);
 * )
 * ```
 */
export const mapUserToUserInfo = (): UnaryFunction<Observable<firebaseAuth.User>, Observable<firebaseAuth.UserInfo>> =>
	pipe(map((user: firebaseAuth.User) => {
		if (user) {
			const { uid, providerId, displayName, photoURL, phoneNumber, email } = user;
			return { uid, providerId, displayName, photoURL, phoneNumber, email };
		}
		return user;
	}));

/**
 * Operator to map firebase.auth.UserCredential to firebase.UserInfo.
 *
 * For use with alternative facade only.
 *
 * Sample of use:
 *
 * ```ts
 * import {cfaSignIn, mapUserToUserInfo} from 'capacitor-firebase-auth/alternative';
 * import {UserInfo} from 'firebase/app';
 *
 * cfaSignIn('google.com').pipe(
 *     mapUserToUserInfo(),
 * ).subscribe(
 *     (user: UserInfo) => console.log(user.displayName);
 * )
 * ```
 */
export const mapUserCredentialToUserInfo = (): UnaryFunction<Observable<{ userCredential: firebaseAuth.UserCredential }>, Observable<firebaseAuth.UserInfo | null>> =>
	pipe(map(({ userCredential }: { userCredential: firebaseAuth.UserCredential }) => {
		if (userCredential?.user) {
			const { uid, providerId, displayName, photoURL, phoneNumber, email } = userCredential.user;
			return { uid, providerId, displayName, photoURL, phoneNumber, email };
		}
		return null;
	}));
