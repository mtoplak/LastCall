import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

// Initialize the default Firebase app
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID
});

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            req['currentUser'] = decodedToken;
            console.log(decodedToken);
            console.log(req['currentUser']);
            console.log(req['currentUser'].uid);
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}
