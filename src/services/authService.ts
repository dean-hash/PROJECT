import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { logger } from '../utils/logger';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // Add other Firebase configuration options as needed
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const authService = {
  register: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      logger.log('User registered successfully', { email });
      return userCredential.user;
    } catch (error) {
      logger.error(error as Error, { context: 'register', email });
      throw error;
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      logger.log('User logged in successfully', { email });
      return userCredential.user;
    } catch (error) {
      logger.error(error as Error, { context: 'login', email });
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await signOut(auth);
      logger.log('User logged out successfully');
    } catch (error) {
      logger.error(error as Error, { context: 'logout' });
      throw error;
    }
  },

  getCurrentUser: (): User | null => {
    return auth.currentUser;
  }
};