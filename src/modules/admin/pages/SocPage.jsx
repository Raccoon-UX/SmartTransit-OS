import React, { useState } from 'react';
import { Server, ShieldCheck } from 'lucide-react';
import { MOCK_SOC_PREVIEW } from '../../../data/admin/adminSocPreview.js';
import { SocPreviewCard } from '../components/SocPreviewCard.jsx';

export function SocPage() {
  const [toast, setToast] = useState(null);

  const handleOpenSoc = () => {
    setToast('Full System Operations Center (SOC) infrastructure monitoring will be available in ST-60.');
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
          <Server className="w-3.5 h-3.5" />
          <span>INFRASTRUCTURE MONITORING PREVIEW</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          System Operations Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Overview transition entry point connecting Transport Admin to deep SOC server infrastructure.
        </p>
      </div>

      {toast && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700 shadow-lg">
          ℹ️ {toast}
        </div>
      )}

      <SocPreviewCard socData={MOCK_SOC_PREVIEW} onOpenSoc={handleOpenSoc} />
    </div>
  );
}

export default SocPage;
