import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ROLES } from '../lib/permissions';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: 'demo-user-1',
    email: 'kavya.sharma@example.com',
    displayName: 'Kavya Sharma',
  });
  const [role, setRole] = useState(ROLES.OWNER); // 'owner' | 'admin' | 'member'
  const [familySide, setFamilySide] = useState('bride'); // 'bride' | 'groom'
  const [activeWedding, setActiveWedding] = useState({
    id: 'demo-wedding-1',
    name: 'Kavya & Rohan Royal Celebration',
    brideName: 'Kavya Sharma',
    groomName: 'Rohan Verma',
    weddingDate: '2026-12-18',
    weddingTime: '18:30',
    venueName: 'The Leela Palace, Udaipur',
    venueAddress: 'Lake Pichola, Udaipur, Rajasthan 313001',
    totalBudget: 4500000, // ₹45,00,000
    currency: 'INR',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // Check existing Supabase session if configured
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.display_name || session.user.email?.split('@')[0],
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.user_metadata?.display_name || session.user.email?.split('@')[0],
        });
      } else {
        // keep demo user for boilerplate view or set to null
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (isSupabaseConfigured) {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) throw error;
      return data;
    } else {
      // Mock login for boilerplate exploration
      setUser({
        id: 'demo-user-1',
        email,
        displayName: email.split('@')[0],
      });
      return { user };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        familySide,
        setFamilySide,
        activeWedding,
        setActiveWedding,
        login,
        logout,
        loading,
        isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
