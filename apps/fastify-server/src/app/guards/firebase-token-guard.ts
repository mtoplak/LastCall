import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: process.env.FIREBASE_PROJECT_ID
});

@Injectable()
export class FirebaseTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const token = request.headers.authorization;
      // Verify the Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);
      // Optionally, you can add additional checks here, such as validating the user's role, etc.
      // Set the authenticated user on the request for future use
      request.user = decodedToken;

      return true;

    } catch (error) {
      return false;
    }
  }
}