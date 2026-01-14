
import React, { useState, useCallback, useEffect } from 'react';
import { 
  Platform, 
  TrafficSource, 
  AdFormat, 
  CalculationInput, 
  CalculationResult 
} from './types';
import { AD_NETWORKS, NICHES, REGIONS } from './constants';
import CalculatorForm from './components/CalculatorForm';
import ResultsView from './components/ResultsView';
import { getOptimizationTips } from './services/geminiService';
// Fix: Added Sparkles to the lucide-react import list
import { Moon, Sun, ShieldCheck, Globe2, Zap, LayoutDashboard, Search, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [input, setInput] = useState<CalculationInput>({
    platform: Platform.Website,
    adNetwork: 'adsense',
    monthlyTraffic: 50000,
    niche: NICHES[0].name,
    region: REGIONS[0].name,
    trafficSource: TrafficSource.Search,
    adFormat: AdFormat.Banner,
    ctr: NICHES[0].suggestedCTR
  });

  const [results, setResults] = useState<CalculationResult | null>(null);
  const [aiTips, setAiTips] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark', 'bg-slate-900');
      document.body.classList.remove('bg-slate-50');
    } else {
      document.body.classList.remove('dark', 'bg-slate-900');
      document.body.classList.add('bg-slate-50');
    }
  }, [darkMode]);

  const handleCalculate = useCallback(() => {
    const network = AD_NETWORKS.find(n => n.id === input.adNetwork) || AD_NETWORKS[0];
    const nicheFactor = NICHES.find(n => n.name === input.niche) || NICHES[0];
    const regionFactor = REGIONS.find(r => r.name === input.region) || REGIONS[0];

    // Base Multipliers
    let multiplier = 1.0;
    
    // Traffic source adjustment
    if (input.trafficSource === TrafficSource.Search) multiplier *= 1.25;
    if (input.trafficSource === TrafficSource.Social) multiplier *= 0.8;
    
    // Format adjustment
    if (input.adFormat === AdFormat.Interstitial) multiplier *= 1.5;
    if (input.adFormat === AdFormat.Pop) multiplier *= 0.6;
    if (input.adFormat === AdFormat.Rewarded) multiplier *= 2.0;

    // Platform adjustment
    if (input.platform === Platform.MobileApp || input.platform === Platform.Games) multiplier *= 1.4;

    // Calculations
    const estimatedCPM = network.baseCPM * nicheFactor.multiplier * regionFactor.multiplier * multiplier;
    const estimatedCPC = network.baseCPC * nicheFactor.multiplier * regionFactor.multiplier * multiplier;

    // Revenue = (Impressions / 1000 * CPM) OR (Impressions * CTR/100 * CPC)
    // We blend both or pick the most logical for the network
    const monthlyRevByCPM = (input.monthlyTraffic / 1000) * estimatedCPM;
    const monthlyRevByCPC = input.monthlyTraffic * (input.ctr / 100) * estimatedCPC;
    
    // Average them for a realistic blended result
    const monthly = (monthlyRevByCPM + monthlyRevByCPC) / 2;
    const daily = monthly / 30;
    const yearly = monthly * 12;
    const rpm = (monthly / input.monthlyTraffic) * 1000;

    setResults({
      estimatedCPC,
      estimatedCPM,
      rpm,
      daily,
      monthly,
      yearly,
      confidence: input.monthlyTraffic > 50000 ? 'High' : 'Medium'
    });
    setAiTips(null); // Reset tips on recalculation
  }, [input]);

  const handleOptimize = async () => {
    if (!results) return;
    setIsLoadingAI(true);
    const tips = await getOptimizationTips(input, results);
    setAiTips(tips);
    setIsLoadingAI(false);
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Zap size={20} />
            </div>
            <h1 className="text-xl font-bold dark:text-white tracking-tight">Global Ads <span className="text-blue-600">Calculator</span></h1>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/30 rounded-full">
            Version 2.0 • Real-time Data
          </span>
          <h2 className="text-4xl font-extrabold mb-4 dark:text-white leading-tight">Maximize Your Digital Revenue</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Professional estimation tool for bloggers, app developers, and video creators. 
            Analyze yields across all major global networks with one click.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form */}
          <div className="lg:col-span-5 space-y-6">
            <CalculatorForm 
              input={input} 
              onChange={(updates) => setInput(prev => ({...prev, ...updates}))} 
              onCalculate={handleCalculate}
            />

            {/* AI Tips Panel */}
            {aiTips && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-6 rounded-2xl animate-fade-in shadow-xl shadow-emerald-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-emerald-500" size={20} />
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-100">AI Optimization Insights</h3>
                </div>
                <div className="prose prose-sm dark:prose-invert prose-emerald max-w-none text-emerald-800 dark:text-emerald-200">
                  <div dangerouslySetInnerHTML={{ __html: aiTips.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
            )}
          </div>

          {/* Right: Results Dashboard */}
          <div className="lg:col-span-7">
            {results ? (
              <div className="animate-in slide-in-from-right duration-500">
                <ResultsView 
                  results={results} 
                  onOptimize={handleOptimize} 
                  isLoadingAI={isLoadingAI} 
                />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400">
                <LayoutDashboard size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Ready to see your potential?</p>
                <p className="text-sm opacity-60">Adjust the inputs and click calculate.</p>
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity">
               <div className="flex flex-col items-center text-center p-4">
                 <ShieldCheck className="mb-2 text-blue-600" />
                 <span className="text-xs font-semibold dark:text-white uppercase tracking-tighter">AdSense Compliance</span>
               </div>
               <div className="flex flex-col items-center text-center p-4">
                 <Globe2 className="mb-2 text-blue-600" />
                 <span className="text-xs font-semibold dark:text-white uppercase tracking-tighter">Global Tiers Data</span>
               </div>
               <div className="flex flex-col items-center text-center p-4">
                 <Search className="mb-2 text-blue-600" />
                 <span className="text-xs font-semibold dark:text-white uppercase tracking-tighter">SEO Optimized Logic</span>
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-100 dark:bg-slate-900/50 py-12 border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Global Ads Earning Calculator. All rights reserved.<br/>
            Engineered for publishers and digital entrepreneurs.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
