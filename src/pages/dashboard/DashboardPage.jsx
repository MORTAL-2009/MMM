import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import {
  Wallet,
  TrendingDown,
  Clock,
  CheckCircle,
  PlusCircle,
  MessageCircle,
  Share2,
  Calendar,
  MapPin,
  Sparkles,
  PieChart as PieIcon,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const { activeWedding, user } = useAuth();

  // Mock financial dataset reflecting PRD formula requirements
  const budget = activeWedding?.totalBudget || 4500000;
  const totalExpenses = 1875000;
  const paidExpenses = 1250000;
  const pendingExpenses = 625000;
  const remainingBudget = budget - totalExpenses;
  const budgetUtilisation = ((totalExpenses / budget) * 100).toFixed(1);

  const recentExpenses = [
    { id: '1', title: 'Palace Royal Ballroom Booking', category: 'Venue', amount: 850000, status: 'Paid', side: 'groom', date: '2026-03-01' },
    { id: '2', title: 'Royal Rajasthani Catering Advance', category: 'Catering', amount: 450000, status: 'Paid', side: 'bride', date: '2026-03-02' },
    { id: '3', title: 'Floral Mandap & Crystal Stage Decor', category: 'Decoration', amount: 325000, status: 'Pending', side: 'bride', date: '2026-03-05' },
    { id: '4', title: 'Cinematic Pre-Wedding & Drone Crew', category: 'Photography', amount: 250000, status: 'Pending', side: 'groom', date: '2026-03-08' },
  ];

  const recentMessages = [
    { id: '1', sender: 'Suresh Sharma', text: 'Venue booking token has been handed over to the hotel banquet manager!', time: '10:30 AM', side: 'bride' },
    { id: '2', sender: 'Anita Verma', text: 'Sangeet choreographer finalized for the grand family dance sequences!', time: '11:15 AM', side: 'groom' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-gradient-to-r from-surface-card via-[#1c180e] to-surface-card p-6 md:p-8 shadow-luxury">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-xs font-semibold tracking-widest text-primary-300 uppercase">
                Wedding Workspace
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-100">
              {activeWedding?.brideName} & {activeWedding?.groomName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-400 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary-400" />
                {activeWedding?.weddingDate ? formatDate(activeWedding.weddingDate) : 'Date TBD'}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary-400" />
                {activeWedding?.venueName || 'Venue TBD'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/expenses">
              <Button variant="primary" size="sm">
                <PlusCircle className="w-4 h-4" />
                Add Expense
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="secondary" size="sm">
                <MessageCircle className="w-4 h-4" />
                Family Chat
              </Button>
            </Link>
            <Link to="/invitation">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
                Digital Invite
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 6 Financial Summary Cards (PRD Section 8.1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Budget */}
        <Card glow className="relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Total Budget</span>
            <Wallet className="w-4 h-4 text-primary-400" />
          </div>
          <div className="mt-2 text-xl font-bold font-serif text-gray-100">{formatCurrency(budget)}</div>
          <span className="text-[10px] text-gray-400 mt-1 block">Allocated limit</span>
        </Card>

        {/* Total Expenses */}
        <Card glow className="relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Total Expenses</span>
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 text-xl font-bold font-serif text-rose-300">{formatCurrency(totalExpenses)}</div>
          <span className="text-[10px] text-gray-400 mt-1 block">Sum of all records</span>
        </Card>

        {/* Remaining Budget */}
        <Card glow className="relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Remaining</span>
            <Sparkles className="w-4 h-4 text-primary-400" />
          </div>
          <div className="mt-2 text-xl font-bold font-serif text-emerald-300">{formatCurrency(remainingBudget)}</div>
          <span className="text-[10px] text-emerald-400/80 mt-1 block">Available balance</span>
        </Card>

        {/* Paid Total */}
        <Card glow className="relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Paid Total</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-xl font-bold font-serif text-gray-100">{formatCurrency(paidExpenses)}</div>
          <span className="text-[10px] text-gray-400 mt-1 block">Cleared payments</span>
        </Card>

        {/* Pending Total */}
        <Card glow className="relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Pending</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-xl font-bold font-serif text-amber-300">{formatCurrency(pendingExpenses)}</div>
          <span className="text-[10px] text-amber-400/80 mt-1 block">Awaiting payment</span>
        </Card>

        {/* Budget Utilisation */}
        <Card glow className="relative">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Utilisation</span>
            <PieIcon className="w-4 h-4 text-primary-400" />
          </div>
          <div className="mt-2 text-xl font-bold font-serif text-primary-400">{budgetUtilisation}%</div>
          <div className="w-full bg-surface-muted rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-amber-500 h-1.5 rounded-full"
              style={{ width: `${Math.min(Number(budgetUtilisation), 100)}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Main Grid: Breakdown & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Expenses List (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader
              title="Recent Expenses"
              subtitle="Latest financial records added across family sides"
              action={
                <Link to="/expenses" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 font-medium">
                  View All <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              }
            />

            <div className="divide-y divide-surface-border/50">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="py-3.5 flex items-center justify-between hover:bg-surface-muted/30 px-2 rounded-lg transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-200">{expense.title}</span>
                      <Badge variant={expense.side === 'bride' ? 'bride' : 'groom'}>
                        {expense.side === 'bride' ? "Bride" : "Groom"}
                      </Badge>
                      <Badge variant={expense.status === 'Paid' ? 'paid' : 'pending'}>
                        {expense.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400">
                      {expense.category} • {formatDate(expense.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-sm md:text-base font-bold text-gray-100">
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Side by Side Comparison preview */}
          <Card>
            <CardHeader
              title="Family Side Breakdown"
              subtitle="Groom's side vs Bride's side expense distribution"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface-muted/40 border border-surface-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Groom's Side</span>
                  <Badge variant="groom">43%</Badge>
                </div>
                <div className="text-2xl font-bold font-serif text-gray-100">{formatCurrency(1100000)}</div>
                <p className="text-xs text-gray-400 mt-1">2 expenses recorded</p>
              </div>

              <div className="p-4 rounded-xl bg-surface-muted/40 border border-surface-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Bride's Side</span>
                  <Badge variant="bride">57%</Badge>
                </div>
                <div className="text-2xl font-bold font-serif text-gray-100">{formatCurrency(775000)}</div>
                <p className="text-xs text-gray-400 mt-1">2 expenses recorded</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Family Chat Highlights & Quick Invite */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Family Chat Snippets"
              subtitle="Real-time collaboration updates"
              action={
                <Link to="/chat" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 font-medium">
                  Open Chat <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              }
            />
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="p-3 rounded-lg bg-surface-muted/40 border border-surface-border/60 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-200">{msg.sender}</span>
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Digital Invitation Card Preview */}
          <Card className="bg-gradient-to-b from-surface-card to-[#19160e] border-primary-500/30">
            <CardHeader
              title="Digital Wedding Invitation"
              subtitle="Customizable luxury invite card"
            />
            <div className="p-4 rounded-xl border border-primary-500/20 bg-black/40 text-center space-y-3">
              <div className="text-primary-400 text-xs tracking-widest uppercase font-semibold">
                Together with their families
              </div>
              <h4 className="font-serif text-lg font-bold text-gray-100">
                {activeWedding?.brideName} & {activeWedding?.groomName}
              </h4>
              <p className="text-xs text-gray-300">
                Request the pleasure of your company on their auspicious wedding day.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <Link to="/invitation">
                  <Button variant="primary" size="sm">
                    Customize Invitation
                  </Button>
                </Link>
                <Link to="/invite/royal-celebration" target="_blank">
                  <Button variant="secondary" size="sm">
                    Preview Public Link
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
