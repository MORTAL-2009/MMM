import React, { useState } from 'react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Trash2,
  Edit2,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSide, setFilterSide] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Initial boilerplate expense state
  const [expenses, setExpenses] = useState([
    {
      id: '1',
      title: 'Palace Royal Ballroom Booking',
      amount: 850000,
      category: 'Venue',
      date: '2026-03-01',
      payment_status: 'Paid',
      family_side: 'groom',
      notes: 'Initial deposit paid directly to venue coordinator.',
    },
    {
      id: '2',
      title: 'Royal Rajasthani Catering Advance',
      amount: 450000,
      category: 'Catering',
      date: '2026-03-02',
      payment_status: 'Paid',
      family_side: 'bride',
      notes: 'Covers 500 plates for reception and cocktail night.',
    },
    {
      id: '3',
      title: 'Floral Mandap & Crystal Stage Decor',
      amount: 325000,
      category: 'Decoration',
      date: '2026-03-05',
      payment_status: 'Pending',
      family_side: 'bride',
      notes: 'Includes imported Dutch roses and jasmine setup.',
    },
    {
      id: '4',
      title: 'Cinematic Pre-Wedding & Drone Crew',
      amount: 250000,
      category: 'Photography',
      date: '2026-03-08',
      payment_status: 'Pending',
      family_side: 'groom',
      notes: '3-day coverage including teaser and 4K album.',
    },
  ]);

  // Form State for Adding an Expense
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'Venue',
    date: new Date().toISOString().split('T')[0],
    payment_status: 'Paid',
    family_side: 'groom',
    notes: '',
  });

  const categories = [
    'Venue',
    'Catering',
    'Decoration',
    'Clothing',
    'Photography',
    'Transport',
    'Gifts',
    'Invitations',
    'Other',
  ];

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;

    const item = {
      id: Date.now().toString(),
      ...newExpense,
      amount: Number(newExpense.amount),
    };
    setExpenses([item, ...expenses]);
    setShowAddModal(false);
    setNewExpense({
      title: '',
      amount: '',
      category: 'Venue',
      date: new Date().toISOString().split('T')[0],
      payment_status: 'Paid',
      family_side: 'groom',
      notes: '',
    });
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this expense record?')) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  const filtered = expenses.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    const matchesStat = filterStatus === 'all' || item.payment_status === filterStatus;
    const matchesSide = filterSide === 'all' || item.family_side === filterSide;
    return matchesSearch && matchesCat && matchesStat && matchesSide;
  });

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-100">
            Wedding Expense Tracker
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Track, filter, and allocate all wedding expenditures in real-time.
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)} variant="primary">
          <Plus className="w-4 h-4" />
          Record Expense
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-muted border border-surface-border rounded-lg pl-9 pr-3 py-2 text-xs text-gray-100 focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-surface-muted border border-surface-border rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-surface-muted border border-surface-border rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div>
            <select
              value={filterSide}
              onChange={(e) => setFilterSide(e.target.value)}
              className="w-full bg-surface-muted border border-surface-border rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Family Sides</option>
              <option value="groom">Groom's Side</option>
              <option value="bride">Bride's Side</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Expense Table Card */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-muted/60 border-b border-surface-border text-gray-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Title & Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Side</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/40">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-400">
                    No expense records found matching the criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-muted/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-200">{item.title}</div>
                      {item.notes && <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-xs">{item.notes}</p>}
                    </td>
                    <td className="py-3 px-4 text-gray-300">{item.category}</td>
                    <td className="py-3 px-4 text-gray-300">{formatDate(item.date)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={item.family_side === 'bride' ? 'bride' : 'groom'}>
                        {item.family_side === 'bride' ? "Bride" : "Groom"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={item.payment_status === 'Paid' ? 'paid' : 'pending'}>
                        {item.payment_status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-serif font-bold text-gray-100">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-950/40"
                          title="Delete Expense"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Expense Modal Boilerplate */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="bg-surface-card border border-surface-border rounded-2xl w-full max-w-lg p-6 shadow-luxury space-y-4">
            <h3 className="font-serif text-lg font-bold text-gray-100">Record New Wedding Expense</h3>
            <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Expense Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wedding Photographer Advance"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Amount in INR (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="50000"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Expense Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Payment Status</label>
                  <select
                    value={newExpense.payment_status}
                    onChange={(e) => setNewExpense({ ...newExpense, payment_status: e.target.value })}
                    className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Family Side</label>
                  <select
                    value={newExpense.family_side}
                    onChange={(e) => setNewExpense({ ...newExpense, family_side: e.target.value })}
                    className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                  >
                    <option value="groom">Groom's Side</option>
                    <option value="bride">Bride's Side</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Notes (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Additional details, vendor invoice numbers, or contact details..."
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                  className="w-full bg-surface-muted border border-surface-border rounded-lg p-2.5 text-gray-100 focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
                <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Expense
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
