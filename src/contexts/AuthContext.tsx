import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/data';
import { createUser as createUserService, getUserByEmail } from '../lib/dataService';
import { comparePasswords, hashPassword } from '../lib/authUtils';

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, fullName: string) => Promise<Omit<User, 'password'>>;
  signIn: (email: string, password: string) => Promise<Omit<User, 'password'>>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const signUp = async (email: string, password: string, fullName: string): Promise<Omit<User, 'password'>> => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if user already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new Error('A user with this email already exists');
      }

      // Create new user
      const hashedPassword = await hashPassword(password);
      const newUser = await createUserService({
        id: Date.now(),
        username: email.split('@')[0],
        email,
        password: hashedPassword,
        fullName,
        address: '',
        phone: '',
        isAdmin: false,
        createdAt: new Date().toISOString()
      });

      // Remove password before setting user
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to sign up';
      setError(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<Omit<User, 'password'>> => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        throw new Error('No user found with this email');
      }

      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Remove password before setting user
      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to sign in';
      setError(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would update the user in your JSON file here
      const updatedUser = { ...user, ...data } as Omit<User, 'password'>;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to update profile';
      setError(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
