/**
 * SmartTransit OS — Intelligent Multimodal Routing Engine
 * 
 * Sourced from:
 * 1. Canonical Regional Transit Authority (maharashtra_transit_analysis.csv)
 * 2. 20-Route Journey Specification (UX & Structural Reference)
 * 
 * Supports 3 Journey Patterns:
 * - DIRECT_TRUNK_ROUTE: POINT A ➔ WALK ➔ BUS/TRANSIT ➔ WALK ➔ POINT B
 * - MULTI_PROVIDER_BOUNDARY_TRANSFER: POINT A ➔ OPERATOR 1 ➔ TRANSFER BUFFER ➔ OPERATOR 2 ➔ POINT B
 * - MIXED_MODE_INTERMODAL: WALK ➔ BUS ➔ METRO/TRAIN/FERRY/MONORAIL/AUTO ➔ WALK
 */

import { apiClient } from '../api/apiClient.js';
import { 
  CANONICAL_REGIONAL_BUSES, 
  RAW_REGIONAL_RECORDS, 
  getOperatorMeta, 
  DATA_SOURCE_METADATA 
} from '../../data/regionalTransitData.js';
import { 
  ROUTING_PATTERNS, 
  ROUTING_PATTERN_META, 
  TRANSIT_MODES, 
  DATA_PROVENANCE 
} from '../../data/passenger/mockJourneys.js';
import { REFERENCE_JOURNEY_SCENARIOS } from '../../data/passenger/referenceJourneyScenarios.js';

// Clean text normalization helper
function cleanText(str) {
  if (!str || typeof str !== 'string') return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function normalizeScenarioToPlan(scenario) {
  const segments = (scenario.itineraryLegs || []).map((leg) => {
    let type = leg.mode;
    if (leg.mode === 'TRANSFER_BUFFER') type = 'TRANSFER';
    return {
      type,
      mode: leg.mode,
      title: leg.instruction || `${leg.mode} • ${leg.fromName} ➔ ${leg.toName}`,
      distance: leg.distance || `${leg.distanceMeters}m`,
      distanceMeters: leg.distanceMeters || 200,
      duration: leg.duration || `${leg.durationMins} mins`,
      durationMinutes: leg.durationMins || 4,
      durationMins: leg.durationMins || 4,
      guidance: leg.instruction || `Travel from ${leg.fromName} to ${leg.toName}.`,
      operator: leg.operator || (leg.alightOperator ? `${leg.alightOperator} ➔ ${leg.boardOperator}` : null),
      busNumber: leg.lineNumber || leg.routeCode,
      lineNumber: leg.lineNumber,
      routeCode: leg.routeCode || leg.lineNumber,
      routeName: leg.lineNumber ? `${leg.operator || ''} ${leg.lineNumber}` : leg.mode,
      originStop: leg.fromName,
      alightStop: leg.toName,
      fromName: leg.fromName,
      toName: leg.toName,
      driverName: leg.driverName || 'Duty Pilot',
      status: leg.status || 'ON TIME',
      occupancyPercent: leg.crowding?.percentage || scenario.crowdingPercentage || 55,
      occupancyStatus: leg.crowding?.status || scenario.crowdingStatus || 'MEDIUM',
      alightBus: leg.alightOperator ? `${leg.alightOperator} (${leg.fromName})` : undefined,
      boardBus: leg.boardOperator ? `${leg.boardOperator} (${leg.toName})` : undefined,
      alightOperator: leg.alightOperator,
      boardOperator: leg.boardOperator,
      icon: leg.mode === 'WALK' ? 'Walk' : leg.mode === 'TRANSFER_BUFFER' ? 'Transfer' : leg.mode,
    };
  });

  return {
    ...scenario,
    totalMinutes: scenario.totalDurationMins,
    departureTime: 'Now',
    arrivalTime: `In ${scenario.totalDuration}`,
    occupancyPercent: scenario.crowdingPercentage,
    occupancyStatus: scenario.crowdingStatus,
    segments,
    whyRecommend: scenario.smartInsight 
      ? [scenario.smartInsight, `Pattern: ${ROUTING_PATTERN_META[scenario.routingPatternType]?.label || 'Multimodal'}`] 
      : ['Optimal travel route computed by SmartTransit Engine'],
  };
}

export const multimodalRouteService = {
  /**
   * Retrieves 20 reference scenarios filtered by pattern type
   */
  getReferenceScenarios(patternFilter = 'ALL') {
    if (!patternFilter || patternFilter === 'ALL') {
      return REFERENCE_JOURNEY_SCENARIOS.map(normalizeScenarioToPlan);
    }
    return REFERENCE_JOURNEY_SCENARIOS
      .filter((s) => s.routingPatternType === patternFilter)
      .map(normalizeScenarioToPlan);
  },

  /**
   * Resolves free text to canonical stops or known transit hubs
   */
  resolveLocation(query) {
    if (!query || typeof query !== 'string') return null;
    const cleanQuery = cleanText(query);

    // 1. Check Canonical Regional Buses endpoints
    for (const record of RAW_REGIONAL_RECORDS) {
      if (cleanText(record.origin).includes(cleanQuery) || cleanQuery.includes(cleanText(record.origin))) {
        return {
          type: 'CANONICAL_ENDPOINT',
          name: record.origin,
          area: record.area,
          operator: record.busType,
          nearestStops: [{ stopId: `can-${cleanText(record.origin)}`, stopName: record.origin, walkMeters: 220, walkMinutes: 3 }],
        };
      }
      if (cleanText(record.destination).includes(cleanQuery) || cleanQuery.includes(cleanText(record.destination))) {
        return {
          type: 'CANONICAL_ENDPOINT',
          name: record.destination,
          area: record.area,
          operator: record.busType,
          nearestStops: [{ stopId: `can-${cleanText(record.destination)}`, stopName: record.destination, walkMeters: 180, walkMinutes: 2 }],
        };
      }
      if (cleanText(record.area).includes(cleanQuery) || cleanQuery.includes(cleanText(record.area))) {
        return {
          type: 'CANONICAL_AREA',
          name: `${record.area} Hub`,
          area: record.area,
          operator: record.busType,
          nearestStops: [{ stopId: `can-${cleanText(record.area)}`, stopName: `${record.area} Terminal`, walkMeters: 300, walkMinutes: 4 }],
        };
      }
    }

    // 2. Generic fallback
    return {
      type: 'CUSTOM_LOCATION',
      name: query,
      nearestStops: [
        { stopId: 'hub-01', stopName: `${query} Transit Hub`, walkMeters: 350, walkMinutes: 4 },
      ],
    };
  },

  /**
   * Assesses if commuter can reach the stop before the bus departs.
   */
  checkFeasibility(walkMinutes, busEtaMinutes = 4) {
    const frequencyMinutes = 8;
    if (walkMinutes > busEtaMinutes) {
      return {
        isTight: true,
        warning: `⚠️ Tight connection: walk takes ${walkMinutes}m while initial bus departs in ${busEtaMinutes}m.`,
        recommendedBusTime: `${busEtaMinutes + frequencyMinutes} min (Next Scheduled Bus)`,
        adjustedWaitMinutes: Math.max(0, busEtaMinutes + frequencyMinutes - walkMinutes),
      };
    }

    return {
      isTight: false,
      warning: null,
      recommendedBusTime: `${busEtaMinutes} min`,
      adjustedWaitMinutes: Math.max(0, busEtaMinutes - walkMinutes),
    };
  },

  /**
   * Main Multimodal Planning Engine
   */
  async planJourney({ from, to, preference = 'best_overall' }) {
    // 1. Try Backend API if live
    try {
      const data = await apiClient.post('/planner/multimodal', { from, to, preference });
      if (data && (data.plans || data.options)) {
        const rawPlans = data.plans || data.options || [];
        const plans = rawPlans.map((p) => ({
          ...p,
          totalDuration: p.totalDuration || `${p.totalMinutes} mins`,
          walkingDuration: p.walkingDuration || `${p.walkingDistanceMeters ? Math.round(p.walkingDistanceMeters / 80) : 8} mins`,
          transitDuration: p.transitDuration || `${p.totalMinutes ? p.totalMinutes - 10 : 30} mins`,
          fare: p.fare || '₹25',
          departureTime: p.departureTime || 'Now',
          arrivalTime: p.arrivalTime || `In ${p.totalMinutes || 45} mins`,
          dataProvenance: p.dataProvenance || DATA_PROVENANCE.CANONICAL_REGIONAL,
          segments: (p.segments || []).map((seg) => ({
            ...seg,
            icon: seg.icon || (seg.type === 'WALK' ? 'Walk' : seg.type === 'TRANSFER' ? 'Transfer' : seg.type),
            distance: seg.distance || (seg.distanceMeters ? `${seg.distanceMeters}m` : '300m'),
            duration: seg.duration || (seg.durationMinutes ? `${seg.durationMinutes} mins` : '4 mins'),
          })),
        }));

        const hasDirect = plans.some((p) => p.transfersCount === 0);
        return {
          status: data.status || (hasDirect ? 'DIRECT_ROUTE_FOUND' : 'MULTIMODAL_ROUTE_FOUND'),
          isDirectAvailable: hasDirect,
          origin: data.origin || from,
          destination: data.destination || to,
          preference,
          plans,
          recommendedPlanId: data.recommendedPlanId || plans[0]?.id || 'plan-1',
        };
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[MultimodalPlanner] API Error:', error);
      }
    }

    // 2. Intelligent Local Graph & Scenario Synthesis
    await new Promise((res) => setTimeout(res, 200));

    const cleanFrom = cleanText(from || '');
    const cleanTo = cleanText(to || '');

    const candidatePlans = [];

    // =========================================================================
    // MATCH 1: CHECK 20 REFERENCE SCENARIOS FOR DIRECT MATCHES
    // =========================================================================
    for (const scenario of REFERENCE_JOURNEY_SCENARIOS) {
      const sOrigin = cleanText(scenario.origin);
      const sDest = cleanText(scenario.destination);
      const sTitle = cleanText(scenario.title);

      const matchesOrigin = sOrigin.includes(cleanFrom) || cleanFrom.includes(sOrigin);
      const matchesDest = sDest.includes(cleanTo) || cleanTo.includes(sDest);
      const matchesTitle = sTitle.includes(cleanFrom) || sTitle.includes(cleanTo);

      if ((matchesOrigin && matchesDest) || (matchesOrigin && cleanTo.length === 0) || (cleanFrom.length === 0 && matchesDest)) {
        candidatePlans.push(normalizeScenarioToPlan(scenario));
      }
    }

    // =========================================================================
    // MATCH 2: SEARCH CANONICAL REGIONAL BUSES FOR DIRECT TRUNK ROUTES
    // =========================================================================
    for (const bus of RAW_REGIONAL_RECORDS) {
      const busOrigin = cleanText(bus.origin);
      const busDest = cleanText(bus.destination);
      const busArea = cleanText(bus.area);

      const originHit = busOrigin.includes(cleanFrom) || cleanFrom.includes(busOrigin) || busArea.includes(cleanFrom);
      const destHit = busDest.includes(cleanTo) || cleanTo.includes(busDest) || busArea.includes(cleanTo);

      if (originHit || destHit || (cleanFrom.length < 3 && cleanTo.length < 3)) {
        const transitMins = bus.busType === 'MSRTC' ? 180 : 25;
        const totalMins = transitMins + 7;
        const fare = bus.busType === 'MSRTC' ? '₹240' : bus.busType === 'BEST' ? '₹10' : '₹15';

        candidatePlans.push({
          id: `canonical-direct-${bus.busNumber}-${cleanText(bus.origin)}`,
          title: `${bus.busNumber} (${bus.busType}) • ${bus.origin} ➔ ${bus.destination}`,
          origin: bus.origin,
          destination: bus.destination,
          badge: 'CANONICAL DIRECT TRUNK',
          routingPatternType: ROUTING_PATTERNS.DIRECT_TRUNK_ROUTE,
          primaryMode: 'BUS',
          primaryOperator: bus.busType,
          totalDuration: `${totalMins} mins`,
          totalDurationMins: totalMins,
          totalMinutes: totalMins,
          departureTime: 'Now',
          arrivalTime: `In ${totalMins} mins`,
          walkingDuration: '7 mins',
          walkingDistanceMeters: 380,
          transitDuration: `${transitMins} mins`,
          transfersCount: 0,
          fare,
          fareInr: parseInt(fare.replace('₹', ''), 10) || 15,
          occupancyPercent: 58,
          occupancyStatus: 'MODERATE',
          feasibility: this.checkFeasibility(4, 5),
          dataProvenance: DATA_PROVENANCE.CANONICAL_REGIONAL,
          smartInsight: `Canonical direct service on ${bus.busType} ${bus.busNumber} connecting ${bus.region}.`,
          whyRecommend: [
            `Canonical ${bus.busType} regional trunk line from dataset`,
            `Zero transfer point-to-point transit corridor`,
            `Operating in ${bus.region} region`,
          ],
          segments: [
            {
              type: 'WALK',
              mode: 'WALK',
              subType: 'WALK_TO_STOP',
              title: `Walk to ${bus.origin}`,
              distance: '220m',
              distanceMeters: 220,
              duration: '3 mins',
              durationMins: 3,
              guidance: `Proceed from starting point to ${bus.origin} boarding bay.`,
              icon: 'Walk',
            },
            {
              type: 'BUS',
              mode: 'BUS',
              subType: 'BUS_TRANSIT',
              operator: bus.busType,
              busNumber: bus.busNumber,
              routeCode: `${bus.busType}-${bus.busNumber}`,
              routeName: `${bus.busType} ${bus.busNumber}`,
              title: `Board ${bus.busType} Bus ${bus.busNumber}`,
              duration: `${transitMins} mins`,
              durationMins: transitMins,
              distance: '8.4 km',
              distanceMeters: 8400,
              originStop: bus.origin,
              alightStop: bus.destination,
              fromName: bus.origin,
              toName: bus.destination,
              driverName: `Verified Pilot (${bus.busType})`,
              status: 'ON TIME',
              occupancyPercent: 58,
              occupancyStatus: 'MODERATE',
              icon: 'Bus',
            },
            {
              type: 'WALK',
              mode: 'WALK',
              subType: 'WALK_TO_DESTINATION',
              title: `Walk to ${to || bus.destination}`,
              distance: '160m',
              distanceMeters: 160,
              duration: '4 mins',
              durationMins: 4,
              guidance: `Alight at ${bus.destination} and complete final walk.`,
              icon: 'Walk',
            },
          ],
        });
      }
    }

    // =========================================================================
    // MATCH 3: CONSTRUCT CANONICAL BOUNDARY TRANSFERS
    // E.g., MBMT ➔ TMT at Thane, or NMMT ➔ BEST at Borivali, or KDMT ➔ NMMT at Vashi
    // =========================================================================
    if (candidatePlans.length < 3) {
      // Find a transfer via Thane or Borivali or Vashi
      const bus1 = RAW_REGIONAL_RECORDS.find((b) => b.busType === 'MBMT') || RAW_REGIONAL_RECORDS[7];
      const bus2 = RAW_REGIONAL_RECORDS.find((b) => b.busType === 'TMT' && b.origin.includes('Thane')) || RAW_REGIONAL_RECORDS[11];

      if (bus1 && bus2) {
        candidatePlans.push({
          id: `canonical-transfer-${bus1.busNumber}-${bus2.busNumber}`,
          title: `${bus1.busType} ${bus1.busNumber} ➔ ${bus2.busType} ${bus2.busNumber} (Via Thane Hub)`,
          origin: from || bus1.origin,
          destination: to || bus2.destination,
          badge: 'CANONICAL BOUNDARY TRANSFER',
          routingPatternType: ROUTING_PATTERNS.MULTI_PROVIDER_BOUNDARY_TRANSFER,
          primaryMode: 'BUS',
          primaryOperator: `${bus1.busType} + ${bus2.busType}`,
          totalDuration: '52 mins',
          totalDurationMins: 52,
          totalMinutes: 52,
          departureTime: 'Now',
          arrivalTime: 'In 52 mins',
          walkingDuration: '8 mins',
          walkingDistanceMeters: 420,
          transitDuration: '44 mins',
          transfersCount: 1,
          fare: '₹28',
          fareInr: 28,
          occupancyPercent: 64,
          occupancyStatus: 'MODERATE',
          feasibility: this.checkFeasibility(3, 4),
          dataProvenance: DATA_PROVENANCE.CANONICAL_REGIONAL,
          smartInsight: `Cross-municipal boundary transfer between ${bus1.busType} and ${bus2.busType} at Thane Station interchange.`,
          whyRecommend: [
            `Cross-municipal transfer connecting ${bus1.busType} and ${bus2.busType}`,
            'Short 120m transfer buffer across Thane Station Skywalk',
            'Synchronized schedule connection with low wait time',
          ],
          segments: [
            {
              type: 'WALK',
              mode: 'WALK',
              subType: 'WALK_TO_STOP',
              title: `Walk to ${bus1.origin}`,
              distance: '180m',
              distanceMeters: 180,
              duration: '3 mins',
              durationMins: 3,
              guidance: `Walk from ${from || bus1.origin} to ${bus1.origin} Bay 2.`,
              icon: 'Walk',
            },
            {
              type: 'BUS',
              mode: 'BUS',
              subType: 'BUS_TRANSIT',
              operator: bus1.busType,
              busNumber: bus1.busNumber,
              routeCode: `${bus1.busType}-${bus1.busNumber}`,
              routeName: `${bus1.busType} ${bus1.busNumber}`,
              title: `Board ${bus1.busType} Bus ${bus1.busNumber}`,
              duration: '22 mins',
              durationMins: 22,
              distance: '7.5 km',
              distanceMeters: 7500,
              originStop: bus1.origin,
              alightStop: bus1.destination,
              fromName: bus1.origin,
              toName: bus1.destination,
              driverName: `Verified Pilot (${bus1.busType})`,
              status: 'ON TIME',
              occupancyPercent: 62,
              occupancyStatus: 'MODERATE',
              icon: 'Bus',
            },
            {
              type: 'TRANSFER',
              mode: 'TRANSFER_BUFFER',
              subType: 'TRANSFER_INTERCHANGE',
              title: `Transfer at ${bus1.destination} Interchange`,
              duration: '5 mins',
              durationMins: 5,
              distance: '120m',
              distanceMeters: 120,
              alightBus: `${bus1.busType} Bus ${bus1.busNumber}`,
              boardBus: `${bus2.busType} Bus ${bus2.busNumber}`,
              alightOperator: bus1.busType,
              boardOperator: bus2.busType,
              guidance: `Alight from ${bus1.busType} at East concourse. Cross over via skywalk to Bay 6 for ${bus2.busType} ${bus2.busNumber}.`,
              icon: 'Transfer',
            },
            {
              type: 'BUS',
              mode: 'BUS',
              subType: 'BUS_TRANSIT',
              operator: bus2.busType,
              busNumber: bus2.busNumber,
              routeCode: `${bus2.busType}-${bus2.busNumber}`,
              routeName: `${bus2.busType} ${bus2.busNumber}`,
              title: `Board ${bus2.busType} Bus ${bus2.busNumber}`,
              duration: '18 mins',
              durationMins: 18,
              distance: '6.8 km',
              distanceMeters: 6800,
              originStop: bus2.origin,
              alightStop: bus2.destination,
              fromName: bus2.origin,
              toName: bus2.destination,
              driverName: `Verified Pilot (${bus2.busType})`,
              status: 'ON TIME',
              occupancyPercent: 66,
              occupancyStatus: 'MODERATE',
              icon: 'Bus',
            },
            {
              type: 'WALK',
              mode: 'WALK',
              subType: 'WALK_TO_DESTINATION',
              title: `Walk to ${to || bus2.destination}`,
              distance: '120m',
              distanceMeters: 120,
              duration: '4 mins',
              durationMins: 4,
              guidance: `Alight at ${bus2.destination} and complete final walk to destination.`,
              icon: 'Walk',
            },
          ],
        });
      }
    }

    // Fallback: If still under 3 options, append matching reference scenarios
    if (candidatePlans.length < 3) {
      for (const scenario of REFERENCE_JOURNEY_SCENARIOS) {
        if (!candidatePlans.some((p) => p.id === scenario.id)) {
          candidatePlans.push(normalizeScenarioToPlan(scenario));
          if (candidatePlans.length >= 4) break;
        }
      }
    }

    // Deduplicate candidate plans
    const seenIds = new Set();
    const uniquePlans = [];
    for (const p of candidatePlans) {
      if (!seenIds.has(p.id)) {
        seenIds.add(p.id);
        uniquePlans.push(p);
      }
    }

    // Rank plans based on user preference
    const rankedPlans = this.rankPlans(uniquePlans, preference);
    const hasDirect = rankedPlans.some((p) => p.transfersCount === 0);

    return {
      status: hasDirect ? 'DIRECT_ROUTE_FOUND' : 'MULTIMODAL_ROUTE_FOUND',
      isDirectAvailable: hasDirect,
      origin: from || rankedPlans[0]?.origin || 'Borivali',
      destination: to || rankedPlans[0]?.destination || 'Thane',
      preference,
      plans: rankedPlans.slice(0, 4),
      recommendedPlanId: rankedPlans[0]?.id || 'plan-1',
    };
  },

  /**
   * Dynamic Ranking algorithm based on user preference
   */
  rankPlans(plans, preference) {
    const scored = plans.map((p) => {
      let score = 0;
      const mins = p.totalMinutes || p.totalDurationMins || 30;
      const transfers = p.transfersCount || 0;
      const walk = p.walkingDistanceMeters || 300;
      const occ = p.occupancyPercent || 50;

      if (preference === 'fastest') {
        score = mins * 1.5 + transfers * 8;
      } else if (preference === 'fewer_transfers') {
        score = transfers * 50 + mins;
      } else if (preference === 'less_walking') {
        score = walk * 0.15 + mins;
      } else if (preference === 'less_crowded') {
        score = occ * 0.9 + mins * 0.3;
      } else {
        // best_overall balanced
        score = mins * 1.0 + transfers * 15 + (walk / 100) * 1.5 + occ * 0.2;
      }

      return { ...p, score };
    });

    scored.sort((a, b) => a.score - b.score);

    return scored.map((p, idx) => {
      if (idx === 0) {
        if (preference === 'fastest') p.badge = 'FASTEST ROUTE';
        else if (preference === 'fewer_transfers') p.badge = 'FEWEST TRANSFERS';
        else if (preference === 'less_walking') p.badge = 'MINIMAL WALKING';
        else if (preference === 'less_crowded') p.badge = 'LESS CROWDED (AI)';
        else p.badge = p.transfersCount === 0 ? 'RECOMMENDED DIRECT' : 'RECOMMENDED MULTIMODAL';
      }
      return p;
    });
  },
};

export default multimodalRouteService;
