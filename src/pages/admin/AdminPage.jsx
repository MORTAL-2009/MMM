import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import {
  ShieldAlert,
  UserPlus,
  Users,
  Settings,
  History,
  Trash2,
  Lock,
  Mail,
  CheckCircle,
} from 'lucide-react';

export function AdminPage() {
  const { activeWedding, role, setActiveWedding } = useAuth();
  const [activeTab, setActiveTab] = useState('members'); // 'members' | 'settings' | 'logs'

  // Member Management Boilerplate State
  const [members, setMembers] = useState([
    { id: '1', name: 'Kavya Sharma', email: 'kavya.sharma@example.com', role: 'owner', side: 'bride', status: 'active' },
    { id: '2', name: 'Rohan Verma', email: 'rohan.verma@example.com', role: 'admin', side: 'groom', status: 'active' },
    { id: '3', name: 'Anita Verma', email: 'anita.verma@example.com', role: 'member', side: 'groom', status: 'active' },
    { id: '4', name: 'Suresh Sharma', email: 'suresh.sharma@example.com', role: 'member', side: 'bride', status: 'active' },
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [inviteSide, setInviteSide] = useState('groom');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Activity Log Boilerplate
  const logs = [
    { id: '1', actor: 'Kavya Sharma', action: 'Created wedding workspace', time: '2026-03-01 09:30' },
    { id: '2', actor: 'Kavya Sharma', action: 'Assigned Rohan Verma as Admin', time: '2026-03-01 09:45' },
    { id: '3', actor: 'Rohan Verma', action: 'Added expense: Palace Royal Ballroom Booking (₹8,50,000)', time: '2026-03-01 10:15' },
    { id: '4', actor: 'Kavya Sharma', action: 'Published digital wedding invitation', time: '2026-03-01 11:20' },
  ];

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setMembers([
      ...members,
      {
        id: Date.now().toString(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        side: inviteSide,
        status: 'invited',
      },
    ]);
    setInviteEmail('');
    setInviteSuccess(true);
    setTimeout(() => setInviteSuccess(false), 3000);
  };

  const handleRemoveMember = (id) => {
    const member = members.find((m) => m.id === id);
    if (member?.role === 'owner') {
      alert('Cannot remove the workspace owner.');
      return;
    }
    if (confirm(`Are you sure you want to remove ${member?.name} from this wedding workspace?`)) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-surface-border bg-surface-card">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-100 flex items-center gap-2">
              Workspace Administration
              <Badge variant="gold">Restricted Access</Badge>
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Role: <span className="capitalize font-semibold text-primary-300">{role}</span> • RLS Protected
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-surface-muted p-1 rounded-xl border border-surface-border">
          <button
            onClick={() => setActiveTab('members')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'members'
                ? 'bg-primary-500 text-black font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Members ({members.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-primary-500 text-black font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Budget & Details
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'logs'
                ? 'bg-primary-500 text-black font-semibold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Audit Log
          </button>
        </div>
      </div>

      {/* Tab 1: Member Management */}
      {activeTab === 'members' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Member List (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-0 overflow-hidden">
              <div className="p-4 border-b border-surface-border">
                <h3 className="font-serif text-base font-semibold text-gray-100">Workspace Members</h3>
                <p className="text-xs text-gray-400">Manage wedding collaborators and roles</p>
              </div>

              <div className="divide-y divide-surface-border/50 text-xs">
                {members.map((m) => (
                  <div key={m.id} className="p-4 flex items-center justify-between hover:bg-surface-muted/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-200 text-sm">{m.name}</span>
                        <Badge variant={m.role === 'owner' ? 'gold' : 'default'} className="capitalize">
                          {m.role}
                        </Badge>
                        <Badge variant={m.side === 'bride' ? 'bride' : 'groom'}>
                          {m.side === 'bride' ? "Bride's Side" : "Groom's Side"}
                        </Badge>
                        {m.status === 'invited' && (
                          <Badge variant="pending">Invited</Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-[11px]">{m.email}</p>
                    </div>

                    <div>
                      {m.role !== 'owner' && (
                        <button
                          onClick={() => handleRemoveMember(m.id)}
                          className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-950/40"
                          title="Remove Member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Invite Form */}
          <div>
            <Card className="space-y-4">
              <CardHeader
                title="Invite Member"
                subtitle="Send an invitation link to family or wedding planners"
              />

              <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="relative@gmail.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Assign Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                  >
                    <option value="member">Family Member (Chat, View & Record Expenses)</option>
                    <option value="admin">Admin (Manage Members & Settings)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Family Side</label>
                  <select
                    value={inviteSide}
                    onChange={(e) => setInviteSide(e.target.value)}
                    className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                  >
                    <option value="groom">Groom's Side</option>
                    <option value="bride">Bride's Side</option>
                  </select>
                </div>

                {inviteSuccess && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Invitation dispatched successfully!
                  </div>
                )}

                <Button type="submit" variant="primary" className="w-full">
                  <UserPlus className="w-4 h-4" />
                  Dispatch Invitation
                </Button>
              </form>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: Settings & Budget */}
      {activeTab === 'settings' && (
        <Card className="max-w-2xl space-y-4 text-xs">
          <CardHeader
            title="Wedding Parameters"
            subtitle="Administer core wedding properties and financial ceiling"
          />

          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Wedding Name</label>
              <input
                type="text"
                value={activeWedding?.name || ''}
                onChange={(e) => setActiveWedding({ ...activeWedding, name: e.target.value })}
                className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Total Budget in INR (₹)</label>
              <input
                type="number"
                value={activeWedding?.totalBudget || 0}
                onChange={(e) => setActiveWedding({ ...activeWedding, totalBudget: Number(e.target.value) })}
                className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500 font-serif font-bold text-sm"
              />
            </div>

            <Button variant="primary">Save Changes</Button>
          </div>
        </Card>
      )}

      {/* Tab 3: Audit Trail */}
      {activeTab === 'logs' && (
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-surface-border">
            <h3 className="font-serif text-base font-semibold text-gray-100">Security Audit Trail</h3>
            <p className="text-xs text-gray-400">Chronological history of administrative actions</p>
          </div>

          <div className="divide-y divide-surface-border/50 text-xs">
            {logs.map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-gray-200 font-medium">{log.action}</p>
                  <p className="text-gray-400 text-[11px]">Actor: {log.actor}</p>
                </div>
                <span className="text-gray-400 text-[11px] font-mono">{log.time}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
