
import React from 'react';
import { CalculationResult } from '../types';
import { DollarSign, TrendingUp, Calendar, Info, Share2, Sparkles } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface Props {
  results: CalculationResult;
  onOptimize: () => void;
  isLoadingAI: boolean;
}

const ResultsView: React.FC<Props> = ({ results, onOptimize, isLoadingAI }) => {
  const chartData = [
    { name: 'Daily', value: results.daily },
    { name: 'Monthly', value: results.monthly },
    { name: 'Yearly', value: results.yearly / 12, label: 'Monthly Avg' },
  ];

  const shareResults = () => {
    const text = `I just calculated my potential ad earnings! $${results.monthly.toLocaleString()} per month. Check your earnings too!`;
    navigator.clipboard.writeText(text);
    alert('Summary copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric Cards */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <p className="text-blue-100 text-sm font-medium">Monthly Estimate</p>
            <DollarSign className="text-blue-200" size={20} />
          </div>
          <h3 className="text-3xl font-bold">${results.monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="text-blue-100 text-xs mt-2 font-medium">Confidence: {results.confidence}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Estimated RPM</p>
            <TrendingUp className="text-emerald-500" size={20} />
          </div>
          <h3 className="text-3xl font-bold dark:text-white">${results.rpm.toFixed(2)}</h3>
          <p className="text-slate-400 text-xs mt-2">Revenue per 1,000 views</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Yearly Total</p>
            <Calendar className="text-amber-500" size={20} />
          </div>
          <h3 className="text-3xl font-bold dark:text-white">${results.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
          <p className="text-slate-400 text-xs mt-2">Projected annual growth</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-bold text-lg dark:text-white">Earnings Breakdown</h4>
          <button 
            onClick={shareResults}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <Share2 size={16} /> Share
          </button>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip 
                cursor={{fill: '#f1f5f9'}}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 1 ? '#2563eb' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button 
          onClick={onOptimize}
          disabled={isLoadingAI}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/30"
        >
          {isLoadingAI ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <Sparkles size={20} />
          )}
          Optimize My Earnings (AI Mode)
        </button>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl flex gap-3">
        <Info className="text-blue-500 shrink-0" size={20} />
        <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
          <strong>Disclaimer:</strong> All values are calculated estimates based on market averages. Actual earnings depend on audience engagement, advertiser bidding, season (Q4 typically pays more), and ad placement quality. This tool provides an approximation and is not a guarantee of income.
        </p>
      </div>
    </div>
  );
};

export default ResultsView;
