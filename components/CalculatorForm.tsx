
import React from 'react';
import { 
  Platform, 
  TrafficSource, 
  AdFormat, 
  CalculationInput 
} from '../types';
import { AD_NETWORKS, NICHES, REGIONS } from '../constants';
import { Layout, Globe, Target, Layers, MousePointer2, Users } from 'lucide-react';

interface Props {
  input: CalculationInput;
  onChange: (updates: Partial<CalculationInput>) => void;
  onCalculate: () => void;
}

const CalculatorForm: React.FC<Props> = ({ input, onChange, onCalculate }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Platform Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Layout size={16} /> Platform
          </label>
          <select 
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            value={input.platform}
            onChange={(e) => onChange({ platform: e.target.value as Platform })}
          >
            {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Ad Network */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Target size={16} /> Preferred Network
          </label>
          <select 
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            value={input.adNetwork}
            onChange={(e) => onChange({ adNetwork: e.target.value })}
          >
            {AD_NETWORKS.map(net => <option key={net.id} value={net.id}>{net.name}</option>)}
          </select>
        </div>

        {/* Monthly Traffic */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Users size={16} /> Monthly Impressions
          </label>
          <input 
            type="number"
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            value={input.monthlyTraffic}
            onChange={(e) => onChange({ monthlyTraffic: Number(e.target.value) })}
            placeholder="e.g., 100000"
          />
        </div>

        {/* Region */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Globe size={16} /> Target Region
          </label>
          <select 
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            value={input.region}
            onChange={(e) => onChange({ region: e.target.value })}
          >
            {REGIONS.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
          </select>
        </div>

        {/* Niche */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Layers size={16} /> Content Niche
          </label>
          <select 
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            value={input.niche}
            onChange={(e) => {
              const selectedNiche = NICHES.find(n => n.name === e.target.value);
              onChange({ niche: e.target.value, ctr: selectedNiche?.suggestedCTR || input.ctr });
            }}
          >
            {NICHES.map(n => <option key={n.name} value={n.name}>{n.name}</option>)}
          </select>
        </div>

        {/* Ad Format */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Target size={16} /> Primary Ad Format
          </label>
          <select 
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            value={input.adFormat}
            onChange={(e) => onChange({ adFormat: e.target.value as AdFormat })}
          >
            {Object.values(AdFormat).map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {/* CTR */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <MousePointer2 size={16} /> Estimated CTR (%)
          </label>
          <input 
            type="number"
            step="0.1"
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            value={input.ctr}
            onChange={(e) => onChange({ ctr: Number(e.target.value) })}
          />
        </div>

        {/* Traffic Source */}
        <div className="space-y-2">
          <label className="text-sm font-semibold flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Users size={16} /> Main Traffic Source
          </label>
          <select 
            className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
            value={input.trafficSource}
            onChange={(e) => onChange({ trafficSource: e.target.value as TrafficSource })}
          >
            {Object.values(TrafficSource).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <button 
        onClick={onCalculate}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/30"
      >
        Calculate Projected Earnings
      </button>
    </div>
  );
};

export default CalculatorForm;
