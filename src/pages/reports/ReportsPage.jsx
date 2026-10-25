import React from 'react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';
import { Download, BarChart2, PieChart, TrendingUp } from 'lucide-react';

export function ReportsPage() {
  const categoryData = [
    { name: 'Venue', amount: 850000, percentage: 45 },
    { name: 'Catering', amount: 450000, percentage: 24 },
    { name: 'Decoration', amount: 325000, percentage: 17 },
    { name: 'Photography', amount: 250000, percentage: 14 },
  ];

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Category,Amount (INR),Percentage\n' +
      categoryData.map((e) => `"${e.name}",${e.amount},${e.percentage}%`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'wedding_expense_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-100">
            Reports & Financial Insights
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Comprehensive financial analytics, category breakdowns, and spreadsheet exports.
          </p>
        </div>

        <Button variant="primary" onClick={exportCSV}>
          <Download className="w-4 h-4" />
          Export CSV for Excel
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Spending Breakdown */}
        <Card className="space-y-4">
          <CardHeader
            title="Category-wise Spending"
            subtitle="Distribution of wedding expenditures across top vendors"
          />

          <div className="space-y-4">
            {categoryData.map((cat) => (
              <div key={cat.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="font-medium text-gray-200">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-gray-100">{formatCurrency(cat.amount)}</span>
                    <span className="text-gray-400">({cat.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-300 h-2 rounded-full"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Side-by-Side Financial Comparison */}
        <Card className="space-y-4">
          <CardHeader
            title="Bride vs Groom Side Comparison"
            subtitle="Balanced ledger between families"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-800/30 text-center space-y-1">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Groom's Total</span>
              <div className="text-xl md:text-2xl font-bold font-serif text-gray-100">{formatCurrency(1100000)}</div>
              <p className="text-[11px] text-gray-400">58.7% of total spend</p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/30 text-center space-y-1">
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Bride's Total</span>
              <div className="text-xl md:text-2xl font-bold font-serif text-gray-100">{formatCurrency(775000)}</div>
              <p className="text-[11px] text-gray-400">41.3% of total spend</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-muted/30 border border-surface-border text-xs space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Paid Out</span>
              <span className="font-semibold text-emerald-400">{formatCurrency(1250000)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Pending Commitments</span>
              <span className="font-semibold text-amber-400">{formatCurrency(625000)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
