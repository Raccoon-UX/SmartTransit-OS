import React, { memo } from 'react';
import { useTheme } from '../../design-system/context/ThemeContext.jsx';
import { cn } from '../../utils/index.js';

/**
 * RealisticCityCanvas
 * High-fidelity, custom SVG-based metropolitan transit map canvas.
 * Renders realistic coastal geography, forest reserves, commercial/residential blocks,
 * multi-tier road hierarchy (Highways, Arterials, Local streets, Railway tracks),
 * realistic traffic congestion lines, sector labels, and landmark icons.
 * Fully optimized for both Light Mode and High-Contrast Enterprise Dark Mode.
 */
export const RealisticCityCanvas = memo(function RealisticCityCanvas({
  showTraffic = true,
  showRoutes = true,
  showLabels = true,
  showLandmarks = true,
  activeRouteId = null,
  isSatellite = false,
  className = '',
}) {
  const { isDark } = useTheme();

  if (isSatellite) {
    return (
      <div className={cn('absolute inset-0 bg-[#070C16] overflow-hidden pointer-events-none select-none', className)}>
        {/* Satellite Background Grid & Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#2A3A54_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40" />
        <svg className="w-full h-full" viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid slice">
          {/* Subtle coastline on satellite mode */}
          <path
            d="M 0 0 L 160 0 C 190 80, 220 140, 205 210 C 190 280, 230 330, 215 410 C 200 480, 245 550, 230 650 L 0 650 Z"
            fill="#082F49"
            opacity="0.85"
          />
          {/* Dark satellite expressway */}
          <path
            d="M 195 40 Q 280 160, 360 250 T 560 380 T 840 520"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="5"
            opacity="0.8"
          />
          <path
            d="M 230 580 Q 420 440, 580 300 T 920 120"
            fill="none"
            stroke="#818CF8"
            strokeWidth="4"
            opacity="0.7"
          />
        </svg>
      </div>
    );
  }

  // Theme-specific color tokens
  const palette = isDark
    ? {
        landmass: '#0A101D',
        blockResidential: '#121C30',
        blockCommercial: '#16233B',
        commercialHatch: '#24375A',
        airportPolygon: '#152136',
        airportStroke: '#253754',
        waterBody: '#061325',
        waterStroke: '#0D2748',
        waterWave: '#10325C',
        mahimBay: '#071830',
        nationalPark: '#03261A',
        nationalParkStroke: '#074832',
        parkGreen: '#053323',
        parkGreenStroke: '#0A553B',
        railwayTrack: '#4B5E7D',
        localStreet: '#1B2942',
        localStreetOutline: '#253754',
        arterialRoad: '#263B5E',
        arterialBorder: '#3A5480',
        highwayBase: '#D97706',
        highwayCenter: '#FBBF24',
        seaLink: '#0284C7',
        seaLinkPiers: '#38BDF8',
        bridgeShadowColor: '#000000',
        labelSector: '#F8FAFC',
        labelDistrict: '#E2E8F0',
        labelWater: '#60A5FA',
        labelPark: '#34D399',
        route108: '#38BDF8',
        route204: '#06B6D4',
        route302: '#C084FC',
        route415: '#818CF8',
      }
    : {
        landmass: '#F4F7FB',
        blockResidential: '#EBF0F6',
        blockCommercial: '#DEE6EE',
        commercialHatch: '#CBD5E1',
        airportPolygon: '#E2E8F0',
        airportStroke: '#CBD5E1',
        waterBody: '#B8D7ED',
        waterStroke: '#9BBEE0',
        waterWave: '#90BAE2',
        mahimBay: '#C4DFF2',
        nationalPark: '#CDE8D2',
        nationalParkStroke: '#A8D5B1',
        parkGreen: '#D8EEDC',
        parkGreenStroke: '#B2DCBA',
        railwayTrack: '#94A3B8',
        localStreet: '#FFFFFF',
        localStreetOutline: '#D1D9E2',
        arterialRoad: '#FFFFFF',
        arterialBorder: '#94A3B8',
        highwayBase: '#F59E0B',
        highwayCenter: '#FDE68A',
        seaLink: '#0284C7',
        seaLinkPiers: '#475569',
        bridgeShadowColor: '#0F172A',
        labelSector: '#1E293B',
        labelDistrict: '#0F172A',
        labelWater: '#3B82F6',
        labelPark: '#15803D',
        route108: '#0B3D91',
        route204: '#0284C7',
        route302: '#7C3AED',
        route415: '#4F46E5',
      };

  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none select-none', className)}
      viewBox="0 0 1000 650"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Water Shading Pattern */}
        <pattern id="waterWavePattern" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M 0 10 Q 10 5, 20 10 T 40 10" fill="none" stroke={palette.waterWave} strokeWidth="1" opacity="0.6" />
        </pattern>

        {/* Industrial / Commercial Hatch Pattern */}
        <pattern id="commercialHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke={palette.commercialHatch} strokeWidth="1.2" opacity="0.4" />
        </pattern>

        {/* Soft Drop Shadow for Bridges / Flyovers */}
        <filter id="bridgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={palette.bridgeShadowColor} floodOpacity={isDark ? '0.6' : '0.25'} />
        </filter>

        {/* Transit Line Glow */}
        <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={isDark ? '#38BDF8' : '#0B3D91'} floodOpacity={isDark ? '0.8' : '0.5'} />
        </filter>
      </defs>

      {/* ================================================================= */}
      {/* 1. BASE LANDMASS & URBAN SUBDIVISIONS                            */}
      {/* ================================================================= */}
      <rect width="1000" height="650" fill={palette.landmass} />

      {/* Residential & Built-Up Urban Blocks */}
      <g fill={palette.blockResidential} opacity="0.95">
        {/* Borivali & Dahisar Sector Blocks */}
        <rect x="210" y="50" width="80" height="60" rx="6" />
        <rect x="300" y="45" width="70" height="50" rx="6" />
        <rect x="220" y="125" width="90" height="75" rx="6" />
        <rect x="325" y="110" width="65" height="85" rx="6" />

        {/* Kandivali & Malad Sector Blocks */}
        <rect x="235" y="220" width="105" height="75" rx="6" />
        <rect x="355" y="210" width="85" height="80" rx="6" />
        <rect x="245" y="315" width="95" height="70" rx="6" />
        <rect x="355" y="305" width="100" height="75" rx="6" />

        {/* Andheri & Vile Parle Urban Blocks */}
        <rect x="270" y="405" width="110" height="80" rx="6" />
        <rect x="395" y="400" width="95" height="90" rx="6" />
        <rect x="280" y="505" width="125" height="85" rx="6" />
        <rect x="420" y="510" width="110" height="95" rx="6" />

        {/* Powai & Eastern Suburb Residential Blocks */}
        <rect x="580" y="240" width="90" height="75" rx="6" />
        <rect x="685" y="235" width="100" height="80" rx="6" />
        <rect x="600" y="335" width="95" height="85" rx="6" />
        <rect x="710" y="330" width="110" height="90" rx="6" />

        {/* Navi Mumbai / Vashi Planned City Blocks */}
        <rect x="760" y="445" width="100" height="75" rx="6" />
        <rect x="875" y="440" width="90" height="80" rx="6" />
        <rect x="770" y="535" width="95" height="85" rx="6" />
        <rect x="880" y="530" width="100" height="90" rx="6" />
      </g>

      {/* Commercial & Financial District Blocks */}
      <g fill={palette.blockCommercial}>
        <rect x="480" y="450" width="140" height="85" rx="8" />
        <rect x="470" y="320" width="100" height="75" rx="6" />
        <rect x="410" y="190" width="90" height="70" rx="6" />
        <rect x="760" y="100" width="120" height="80" rx="8" />
      </g>

      {/* Commercial Hatch Texture */}
      <rect x="480" y="450" width="140" height="85" rx="8" fill="url(#commercialHatch)" />
      <rect x="470" y="320" width="100" height="75" rx="6" fill="url(#commercialHatch)" />

      {/* Airport Runway & Aerodrome Complex */}
      <g opacity="0.9">
        <polygon points="560,370 700,340 730,420 590,450" fill={palette.airportPolygon} stroke={palette.airportStroke} strokeWidth="1" />
        {/* Dual Runways 09/27 & 14/32 */}
        <line x1="575" y1="385" x2="695" y2="355" stroke={isDark ? '#4B5E7D' : '#64748B'} strokeWidth="5" strokeLinecap="round" />
        <line x1="575" y1="385" x2="695" y2="355" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" />
        <line x1="610" y1="440" x2="680" y2="345" stroke={isDark ? '#4B5E7D' : '#64748B'} strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* ================================================================= */}
      {/* 2. NATURAL GEOGRAPHY: WATER BODIES & PARKS                        */}
      {/* ================================================================= */}
      {/* Western Arabian Sea Coastline & Coastal Bay */}
      <path
        d="M 0 0 L 165 0 C 190 75, 215 130, 200 195 C 185 260, 220 310, 210 380 C 200 440, 235 520, 220 650 L 0 650 Z"
        fill={palette.waterBody}
        stroke={palette.waterStroke}
        strokeWidth="2"
      />
      <path
        d="M 0 0 L 165 0 C 190 75, 215 130, 200 195 C 185 260, 220 310, 210 380 C 200 440, 235 520, 220 650 L 0 650 Z"
        fill="url(#waterWavePattern)"
      />

      {/* Mahim Bay / Creek Inlet */}
      <path
        d="M 205 380 C 250 375, 290 395, 340 405 C 380 412, 420 400, 460 415 C 485 425, 510 445, 515 470 C 518 485, 500 500, 480 495 C 440 485, 410 470, 360 465 C 310 460, 260 475, 215 480 Z"
        fill={palette.mahimBay}
        stroke={palette.waterStroke}
        strokeWidth="1.5"
      />

      {/* Thane Creek / Harbour Waterway on East */}
      <path
        d="M 940 0 C 900 80, 870 170, 850 260 C 835 340, 770 410, 755 490 C 740 560, 725 610, 715 650 L 1000 650 L 1000 0 Z"
        fill={palette.waterBody}
        stroke={palette.waterStroke}
        strokeWidth="2"
      />
      <path
        d="M 940 0 C 900 80, 870 170, 850 260 C 835 340, 770 410, 755 490 C 740 560, 725 610, 715 650 L 1000 650 L 1000 0 Z"
        fill="url(#waterWavePattern)"
      />

      {/* Sanjay Gandhi National Park / Forest Reserve */}
      <path
        d="M 520 0 L 860 0 C 840 50, 820 110, 780 150 C 740 190, 680 180, 640 210 C 600 240, 560 210, 530 180 C 490 140, 510 60, 520 0 Z"
        fill={palette.nationalPark}
        stroke={palette.nationalParkStroke}
        strokeWidth="2"
      />

      {/* Urban Green Parks & Botanical Gardens */}
      <path
        d="M 330 135 C 360 130, 380 145, 375 170 C 370 190, 340 195, 325 180 C 315 170, 315 140, 330 135 Z"
        fill={palette.parkGreen}
        stroke={palette.parkGreenStroke}
        strokeWidth="1.5"
      />
      <path
        d="M 620 460 C 660 455, 680 475, 675 505 C 670 530, 630 535, 615 515 C 605 500, 605 465, 620 460 Z"
        fill={palette.parkGreen}
        stroke={palette.parkGreenStroke}
        strokeWidth="1.5"
      />

      {/* ================================================================= */}
      {/* 3. RAILWAY CORRIDORS (Western & Central Railway)                 */}
      {/* ================================================================= */}
      <g stroke={palette.railwayTrack} strokeWidth="2.5" fill="none">
        {/* Western Railway Line */}
        <path d="M 275 0 C 275 120, 305 240, 325 350 C 340 430, 355 520, 360 650" />
        {/* Central Railway Line */}
        <path d="M 750 0 C 740 100, 715 200, 680 300 C 650 390, 610 500, 580 650" />
        {/* Harbour Line Cross Connector */}
        <path d="M 340 430 Q 480 470, 650 390" strokeDasharray="4 4" />
      </g>

      {/* ================================================================= */}
      {/* 4. MULTI-TIER ROAD NETWORK HIERARCHY                              */}
      {/* ================================================================= */}
      {/* Local Streets Network */}
      <g stroke={palette.localStreet} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="210" y1="80" x2="480" y2="80" />
        <line x1="210" y1="160" x2="500" y2="160" />
        <line x1="230" y1="260" x2="530" y2="260" />
        <line x1="240" y1="350" x2="550" y2="350" />
        <line x1="260" y1="440" x2="560" y2="440" />
        <line x1="270" y1="540" x2="580" y2="540" />

        <line x1="580" y1="275" x2="840" y2="275" />
        <line x1="590" y1="375" x2="830" y2="375" />
        <line x1="600" y1="480" x2="960" y2="480" />
        <line x1="610" y1="580" x2="970" y2="580" />

        <line x1="250" y1="40" x2="250" y2="600" />
        <line x1="390" y1="40" x2="390" y2="610" />
        <line x1="640" y1="220" x2="640" y2="620" />
        <line x1="820" y1="420" x2="820" y2="630" />
        <line x1="920" y1="420" x2="920" y2="630" />
      </g>

      {/* Local Streets Grey Edge Outlines */}
      <g stroke={palette.localStreetOutline} strokeWidth="0.8" fill="none" opacity="0.6">
        <line x1="210" y1="78.5" x2="480" y2="78.5" />
        <line x1="210" y1="81.5" x2="480" y2="81.5" />
        <line x1="210" y1="158.5" x2="500" y2="158.5" />
        <line x1="210" y1="161.5" x2="500" y2="161.5" />
        <line x1="230" y1="258.5" x2="530" y2="258.5" />
        <line x1="230" y1="261.5" x2="530" y2="261.5" />
        <line x1="240" y1="348.5" x2="550" y2="348.5" />
        <line x1="240" y1="351.5" x2="550" y2="351.5" />
      </g>

      {/* Secondary Arterial Connectors */}
      <g stroke={palette.arterialRoad} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 230 0 C 235 110, 260 220, 280 340 C 295 420, 310 520, 315 650" />
        <path d="M 330 0 C 335 120, 360 230, 385 350 C 405 440, 420 530, 435 650" />

        <path d="M 210 120 C 320 115, 410 130, 520 120" />
        <path d="M 215 210 C 330 205, 440 225, 560 210" />
        <path d="M 225 300 C 340 300, 480 290, 620 310" />
        <path d="M 210 390 C 330 385, 470 380, 600 410 T 780 430" />
        <path d="M 220 490 C 350 480, 490 500, 640 480 T 880 500" />
      </g>

      {/* Secondary Roads Borders */}
      <g stroke={palette.arterialBorder} strokeWidth="1" fill="none" opacity="0.6">
        <path d="M 227 0 C 232 110, 257 220, 277 340 C 292 420, 307 520, 312 650" />
        <path d="M 233 0 C 238 110, 263 220, 283 340 C 298 420, 313 520, 318 650" />
      </g>

      {/* Expressways (Highways) */}
      {/* 1. Western Express Highway (WEH) */}
      <g stroke={palette.highwayBase} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#bridgeShadow)">
        <path d="M 285 0 C 295 130, 345 250, 425 350 C 480 420, 535 510, 560 650" />
      </g>
      <g stroke={palette.highwayCenter} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 285 0 C 295 130, 345 250, 425 350 C 480 420, 535 510, 560 650" />
      </g>

      {/* 2. Eastern Freeway */}
      <g stroke={palette.highwayBase} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#bridgeShadow)">
        <path d="M 760 0 C 740 120, 695 240, 610 340 C 560 400, 620 480, 750 540 T 940 580" />
      </g>
      <g stroke={palette.highwayCenter} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 760 0 C 740 120, 695 240, 610 340 C 560 400, 620 480, 750 540 T 940 580" />
      </g>

      {/* 3. SCLR Flyover */}
      <g stroke={palette.highwayBase} strokeWidth="8" strokeLinecap="round" fill="none" filter="url(#bridgeShadow)">
        <path d="M 425 350 Q 520 370, 610 340" />
      </g>
      <g stroke={palette.highwayCenter} strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M 425 350 Q 520 370, 610 340" />
      </g>

      {/* 4. Coastal Road Sea Link Bridge */}
      <g stroke={palette.seaLink} strokeWidth="6" strokeLinecap="round" strokeDasharray="8 3" fill="none" filter="url(#bridgeShadow)">
        <path d="M 200 195 Q 240 290, 210 380 T 225 540" />
      </g>
      <circle cx="218" cy="245" r="3.5" fill={palette.seaLinkPiers} />
      <circle cx="218" cy="315" r="3.5" fill={palette.seaLinkPiers} />
      <circle cx="210" cy="380" r="3.5" fill={palette.seaLinkPiers} />
      <circle cx="215" cy="460" r="3.5" fill={palette.seaLinkPiers} />

      {/* ================================================================= */}
      {/* 5. TRAFFIC CONGESTION OVERLAYS                                    */}
      {/* ================================================================= */}
      {showTraffic && (
        <g strokeLinecap="round" fill="none">
          <path d="M 260 220 L 280 340" stroke="#F59E0B" strokeWidth="4" opacity="0.85" />
          <path d="M 520 370 Q 560 380, 610 340" stroke="#F59E0B" strokeWidth="4" opacity="0.85" />
          <path d="M 750 540 L 840 560" stroke="#F59E0B" strokeWidth="4" opacity="0.85" />
          <path d="M 425 340 L 460 390" stroke="#EF4444" strokeWidth="4.5" opacity="0.9" strokeDasharray="8 4" className="animate-pulse" />
          <path d="M 695 240 L 660 280" stroke="#EF4444" strokeWidth="4.5" opacity="0.9" strokeDasharray="8 4" className="animate-pulse" />
        </g>
      )}

      {/* ================================================================= */}
      {/* 6. SMARTTRANSIT DESIGNATED TRANSIT CORRIDORS                      */}
      {/* ================================================================= */}
      {showRoutes && (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* RT-108: Metro Coastal Express Line */}
          <path
            d="M 240 70 Q 295 180, 360 290 T 425 430 T 435 560"
            stroke={palette.route108}
            strokeWidth={activeRouteId === 'RT-108' ? '6' : '4.5'}
            opacity={activeRouteId && activeRouteId !== 'RT-108' ? '0.35' : '0.95'}
            filter={activeRouteId === 'RT-108' ? 'url(#routeGlow)' : undefined}
          />

          {/* RT-204: Airport Superfast Link */}
          <path
            d="M 360 290 Q 480 330, 600 370 T 690 380"
            stroke={palette.route204}
            strokeWidth={activeRouteId === 'RT-204' ? '6' : '4.5'}
            opacity={activeRouteId && activeRouteId !== 'RT-204' ? '0.35' : '0.9'}
            filter={activeRouteId === 'RT-204' ? 'url(#routeGlow)' : undefined}
          />

          {/* RT-302: CBD Feeder Route */}
          <path
            d="M 410 200 Q 470 250, 480 350 T 520 490"
            stroke={palette.route302}
            strokeWidth={activeRouteId === 'RT-302' ? '6' : '4.5'}
            opacity={activeRouteId && activeRouteId !== 'RT-302' ? '0.35' : '0.9'}
            filter={activeRouteId === 'RT-302' ? 'url(#routeGlow)' : undefined}
          />

          {/* RT-415: Interstate Ring Expressway */}
          <path
            d="M 760 120 Q 710 260, 650 380 T 820 540"
            stroke={palette.route415}
            strokeWidth={activeRouteId === 'RT-415' ? '6' : '4.5'}
            opacity={activeRouteId && activeRouteId !== 'RT-415' ? '0.35' : '0.9'}
            filter={activeRouteId === 'RT-415' ? 'url(#routeGlow)' : undefined}
          />
        </g>
      )}

      {/* ================================================================= */}
      {/* 7. GEOGRAPHIC LABELS & SECTOR NAMES                               */}
      {/* ================================================================= */}
      {showLabels && (
        <g className="font-sans select-none pointer-events-none">
          {/* Waterway Labels */}
          <text x="50" y="320" fill={palette.labelWater} className="text-[11px] font-sans font-bold tracking-widest uppercase opacity-75">
            Arabian Sea • Coastal Bay
          </text>
          <text x="310" y="445" fill={palette.labelWater} className="text-[9px] font-mono font-bold uppercase opacity-75">
            Mahim Creek Basin
          </text>
          <text x="880" y="320" fill={palette.labelWater} className="text-[10px] font-sans font-bold tracking-wider uppercase opacity-75">
            Thane Creek / Harbour
          </text>

          {/* Forest & Parks Label */}
          <text x="610" y="80" fill={palette.labelPark} className="text-[11px] font-sans font-bold uppercase tracking-wider opacity-90">
            Sanjay Gandhi National Park
          </text>
          <text x="610" y="94" fill={palette.labelPark} className="text-[9px] font-sans font-medium opacity-75">
            Protected Forest & Biosphere
          </text>

          {/* Major Urban Sectors */}
          <text x="235" y="70" fill={palette.labelSector} className="text-[12px] font-extrabold font-sans tracking-wide">
            BORIVALI
          </text>
          <text x="245" y="150" fill={palette.labelSector} className="text-[11px] font-bold font-sans tracking-wide">
            KANDIVALI
          </text>
          <text x="260" y="245" fill={palette.labelSector} className="text-[11px] font-bold font-sans tracking-wide">
            MALAD WEST
          </text>
          <text x="270" y="335" fill={palette.labelSector} className="text-[11px] font-bold font-sans tracking-wide">
            GOREGAON
          </text>
          <text x="290" y="425" fill={palette.labelSector} className="text-[13px] font-extrabold font-sans tracking-wider">
            ANDHERI WEST
          </text>
          <text x="310" y="525" fill={palette.labelSector} className="text-[12px] font-bold font-sans tracking-wide">
            BANDRA COMPLEX
          </text>

          {/* Business & Airport Districts */}
          <text x="500" y="475" fill={palette.labelDistrict} className="text-[11px] font-mono font-bold tracking-wide uppercase">
            BKC FINANCIAL DISTRICT
          </text>
          <text x="610" y="405" fill={palette.labelDistrict} className="text-[10px] font-mono font-bold tracking-wide uppercase">
            Intl Airport (BOM)
          </text>
          <text x="780" y="125" fill={palette.labelSector} className="text-[12px] font-extrabold font-sans tracking-wide">
            THANE CENTRAL
          </text>
          <text x="790" y="470" fill={palette.labelSector} className="text-[11px] font-bold font-sans tracking-wide">
            VASHI SECTOR 17
          </text>

          {/* Highway Badges */}
          <g transform="translate(380, 275)">
            <rect x="0" y="0" width="38" height="14" rx="3" fill="#D97706" />
            <text x="19" y="10.5" fill="#FFFFFF" textAnchor="middle" className="text-[8px] font-mono font-bold">
              WEH-1
            </text>
          </g>
        </g>
      )}

      {/* ================================================================= */}
      {/* 8. LANDMARK FACILITY ICONS                                        */}
      {/* ================================================================= */}
      {showLandmarks && (
        <g className="pointer-events-none">
          {/* 🚆 Borivali Railway Station */}
          <g transform="translate(280, 85)">
            <circle cx="8" cy="8" r="9" fill={isDark ? '#0284C7' : '#0B3D91'} stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M 5 5 L 11 5 L 11 11 L 5 11 Z M 6 12 L 5 13 M 10 12 L 11 13" stroke="#FFFFFF" strokeWidth="1" fill="none" />
          </g>

          {/* 🚆 Andheri Central Station */}
          <g transform="translate(330, 415)">
            <circle cx="8" cy="8" r="9" fill={isDark ? '#0284C7' : '#0B3D91'} stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M 5 5 L 11 5 L 11 11 L 5 11 Z M 6 12 L 5 13 M 10 12 L 11 13" stroke="#FFFFFF" strokeWidth="1" fill="none" />
          </g>

          {/* 🏬 Central Bus Terminal Depot */}
          <g transform="translate(435, 175)">
            <circle cx="8" cy="8" r="9" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="4.5" y="4.5" width="7" height="7" rx="1.5" fill="#FFFFFF" />
          </g>

          {/* ✈️ International Airport Terminal */}
          <g transform="translate(635, 360)">
            <circle cx="8" cy="8" r="9" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M 8 3 L 8 13 M 4 7 L 12 7 M 6 11 L 10 11" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        </g>
      )}
    </svg>
  );
});

export default RealisticCityCanvas;
