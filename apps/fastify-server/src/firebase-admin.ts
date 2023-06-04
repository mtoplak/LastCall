import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: "lastcall-1d57c",
});

export const firebaseAdmin = admin;
