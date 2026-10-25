import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ExpensesPage } from './pages/expenses/ExpensesPage';
import { ChatPage } from './pages/chat/ChatPage';
import { InvitationPage } from './pages/invitation/InvitationPage';
import { PublicInvitationPage } from './pages/invitation/PublicInvitationPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { AdminPage } from './pages/admin/AdminPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { LandingPage } from './pages/landing/LandingPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Standalone Invitation View for Guests */}
            <Route path="/invite/:slug" element={<PublicInvitationPage />} />
            
            {/* Stitch Couture Landing Showcase (Primary Showcase UI) */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Authenticated Application Workspace */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/app" element={<Navigate to="/dashboard" replace />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/invitation" element={<InvitationPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
