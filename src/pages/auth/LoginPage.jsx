import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 items-center justify-center shadow-gold-glow mb-2">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <h1 className="font-serif text-3xl font-bold gold-gradient-text">Make My Marriage</h1>
          <p className="text-xs text-gray-400">Sign in to your private wedding workspace</p>
        </div>

        <Card className="p-6 border-surface-border/80 shadow-luxury">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="relative@family.com"
                  className="w-full bg-surface-muted border border-surface-border rounded-lg pl-9 pr-3 py-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-muted border border-surface-border rounded-lg pl-9 pr-3 py-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In to Workspace'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            Don't have a wedding workspace?{' '}
            <Link to="/signup" className="text-primary-400 hover:underline font-medium">
              Create New Wedding
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
