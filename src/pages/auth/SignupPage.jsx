import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function SignupPage() {
  const { setActiveWedding, setFamilySide } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    familySide: 'bride',
    weddingName: '',
    brideName: '',
    groomName: '',
    weddingDate: '',
    venueName: '',
    totalBudget: '5000000',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveWedding({
      id: Date.now().toString(),
      name: formData.weddingName || `${formData.brideName} & ${formData.groomName} Wedding`,
      brideName: formData.brideName,
      groomName: formData.groomName,
      weddingDate: formData.weddingDate,
      venueName: formData.venueName,
      totalBudget: Number(formData.totalBudget) || 5000000,
    });
    setFamilySide(formData.familySide);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 items-center justify-center shadow-gold-glow mb-2">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <h1 className="font-serif text-3xl font-bold gold-gradient-text">Create Wedding Workspace</h1>
          <p className="text-xs text-gray-400">Initialize your private luxury wedding management suite</p>
        </div>

        <Card className="p-6 border-surface-border/80 shadow-luxury">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kavya Sharma"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Your Family Side</label>
                <select
                  value={formData.familySide}
                  onChange={(e) => setFormData({ ...formData, familySide: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                >
                  <option value="bride">Bride's Side</option>
                  <option value="groom">Groom's Side</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Account Email</label>
                <input
                  type="email"
                  required
                  placeholder="kavya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Account Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-surface-border/60">
              <span className="text-[10px] uppercase font-bold text-primary-400 tracking-wider">
                Wedding Celebration Details
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Bride's Name</label>
                <input
                  type="text"
                  required
                  placeholder="Kavya"
                  value={formData.brideName}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Groom's Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rohan"
                  value={formData.groomName}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1">Wedding Date</label>
                <input
                  type="date"
                  required
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Estimated Budget in INR (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="5000000"
                  value={formData.totalBudget}
                  onChange={(e) => setFormData({ ...formData, totalBudget: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Venue Name & City</label>
              <input
                type="text"
                required
                placeholder="The Leela Palace, Udaipur"
                value={formData.venueName}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Create Wedding Workspace
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
