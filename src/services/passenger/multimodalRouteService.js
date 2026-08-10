/**
 * SmartTransit OS — Generic Multimodal Routing Engine
 * 
 * Generic Point-A -> Point-B transit graph search engine:
 * 1. Resolves candidate stops near Origin and Destination.
 * 2. Evaluates direct routes and multi-hop transfer chains.
 * 3. Assesses Walking Time vs. Bus ETA feasibility (flags tight connections).
 * 4. Factors in real-time bus operational status (DELAYED, ON TIME, FULL) and AI occupancy.
 * 5. Generates dynamic "Why We Recommend This" trade-off explanations.
 */

import { MOCK_PASSENGER_ROUTES } from '../../data/passenger/mockRoutes.js';
import { MOCK_PASSENGER_BUSES } from '../../data/passenger/mockBuses.js';
import { MOCK_PASSENGER_STOPS } from '../../data/passenger/mockStops.js';
import { TRANSIT_LANDMARKS, TRANSFER_HUBS } from '../../data/passenger/multimodalRoutes.js';

export const multimodalRouteService = {
  /**
   * Resolves a free-text location query to a known landmark or bus stop.
   */
  resolveLocation(query) {
    if (!query || typeof query !== 'string') return null;
    const cleanQuery = query.toLowerCase().trim();

    // 1. Check landmarks
    const matchedLandmark = TRANSIT_LANDMARKS.find((lm) =>
      lm.name.toLowerCase().includes(cleanQuery) || cleanQuery.includes(lm.name.toLowerCase())
    );
    if (matchedLandmark) {
      return {
        type: 'LANDMARK',
        id: matchedLandmark.id,
        name: matchedLandmark.name,
        coordinates: matchedLandmark.coordinates,
        nearestStops: matchedLandmark.nearestStops,
      };
    }

    // 2. Check stops
    const matchedStop = MOCK_PASSENGER_STOPS.find((s) =>
      s.name.toLowerCase().includes(cleanQuery) || s.code.toLowerCase() === cleanQuery
    );
    if (matchedStop) {
      return {
        type: 'STOP',
        id: matchedStop.id,
        name: matchedStop.name,
        coordinates: matchedStop.coordinates || { x: 50, y: 50 },
        nearestStops: [{ stopId: matchedStop.id, stopName: matchedStop.name, walkMeters: 50, walkMinutes: 1 }],
      };
    }

    // 3. Fallback generic landmark
    return {
      type: 'CUSTOM_LOCATION',
      id: `loc-${Date.now()}`,
      name: query,
      coordinates: { x: 30, y: 35 },
      nearestStops: [
        { stopId: 'BST-001', stopName: 'Borivali Central Hub', walkMeters: 750, walkMinutes: 9 },
        { stopId: 'BST-104', stopName: 'Western Highway Exchange', walkMeters: 1200, walkMinutes: 14 },
      ],
    };
  },

  /**
   * Main Multimodal Planning Method
   */
  async planJourney({ from, to, preference = 'best_overall' }) {
    await new Promise((res) => setTimeout(res, 280)); // Realistic routing calculation latency

    const originLoc = this.resolveLocation(from) || {
      name: from || 'Origin',
      nearestStops: [{ stopId: 'BST-001', stopName: 'Borivali Central Hub', walkMeters: 650, walkMinutes: 8 }],
    };

    const destLoc = this.resolveLocation(to) || {
      name: to || 'Destination',
      nearestStops: [{ stopId: 'BST-510', stopName: 'Vashi Sector 17', walkMeters: 300, walkMinutes: 4 }],
    };

    const originStops = originLoc.nearestStops || [];
    const destStops = destLoc.nearestStops || [];

    const candidatePlans = [];

    // =========================================================================
    // 1. SEARCH FOR DIRECT ROUTES
    // =========================================================================
    for (const oStop of originStops) {
      for (const dStop of destStops) {
        for (const route of MOCK_PASSENGER_ROUTES) {
          const oIndex = route.stops.findIndex((s) => s.id === oStop.stopId || s.code === oStop.stopId);
          const dIndex = route.stops.findIndex((s) => s.id === dStop.stopId || s.code === dStop.stopId);

          if (oIndex !== -1 && dIndex !== -1 && oIndex < dIndex) {
            const transitMinutes = (dIndex - oIndex) * 5 + 4;
            const activeBus = MOCK_PASSENGER_BUSES.find((b) => b.routeId === route.id) || {
              busNumber: 'Bus 245',
              routeId: route.id,
              eta: '4 min',
              etaMinutes: 4,
              occupancyPercent: 65,
              occupancyStatus: 'MEDIUM',
              operationalStatus: 'ON TIME',
              driverName: 'Vikram J. (Pilot 042)',
            };

            const feasibility = this.checkFeasibility(oStop.walkMinutes, activeBus);

            candidatePlans.push(
              this.constructDirectPlan({
                originLoc,
                destLoc,
                oStop,
                dStop,
                route,
                activeBus,
                transitMinutes,
                stopsCount: dIndex - oIndex,
                feasibility,
              })
            );
          }
        }
      }
    }

    // =========================================================================
    // 2. SEARCH FOR 1-TRANSFER MULTIMODAL ROUTES
    // =========================================================================
    for (const oStop of originStops) {
      for (const dStop of destStops) {
        for (const hub of TRANSFER_HUBS) {
          // Find Route 1 from Origin Stop -> Transfer Hub
          const route1 = MOCK_PASSENGER_ROUTES.find((r) =>
            r.stops.some((s) => s.id === oStop.stopId || s.code === oStop.stopId) &&
            hub.connectingRoutes.includes(r.id)
          );

          // Find Route 2 from Transfer Hub -> Destination Stop
          const route2 = MOCK_PASSENGER_ROUTES.find((r) =>
            r.stops.some((s) => s.id === dStop.stopId || s.code === dStop.stopId) &&
            hub.connectingRoutes.includes(r.id) &&
            r.id !== route1?.id
          );

          if (route1 && route2) {
            const bus1 = MOCK_PASSENGER_BUSES.find((b) => b.routeId === route1.id) || {
              busNumber: 'Bus 245',
              routeId: route1.id,
              eta: '3 min',
              etaMinutes: 3,
              occupancyPercent: 78,
              occupancyStatus: 'HIGH',
              operationalStatus: 'ON TIME',
              driverName: 'Vikram J. (Pilot 042)',
            };

            const bus2 = MOCK_PASSENGER_BUSES.find((b) => b.routeId === route2.id) || {
              busNumber: 'Bus 504',
              routeId: route2.id,
              eta: '6 min',
              etaMinutes: 6,
              occupancyPercent: 54,
              occupancyStatus: 'MEDIUM',
              operationalStatus: 'ON TIME',
              driverName: 'Anil P. (Pilot 315)',
            };

            const feasibility1 = this.checkFeasibility(oStop.walkMinutes, bus1);

            candidatePlans.push(
              this.constructTransferPlan({
                originLoc,
                destLoc,
                oStop,
                dStop,
                hub,
                route1,
                route2,
                bus1,
                bus2,
                feasibility1,
              })
            );
          }
        }
      }
    }

    // =========================================================================
    // 3. FALLBACK CROWD-AWARE / ALTERNATIVE VARIANTS
    // =========================================================================
    if (candidatePlans.length === 0 || candidatePlans.length < 3) {
      candidatePlans.push(this.generateAlternativePlan(originLoc, destLoc));
    }

    // Deduplicate by plan signature
    const uniquePlans = [];
    const seen = new Set();
    for (const p of candidatePlans) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        uniquePlans.push(p);
      }
    }

    // Rank and explain plans based on commuter preference
    const rankedPlans = this.rankPlans(uniquePlans, preference);
    const hasDirect = rankedPlans.some((p) => p.transfersCount === 0);

    return {
      status: hasDirect ? 'DIRECT_ROUTE_FOUND' : 'MULTIMODAL_ROUTE_FOUND',
      isDirectAvailable: hasDirect,
      origin: originLoc.name,
      destination: destLoc.name,
      preference,
      plans: rankedPlans.slice(0, 3),
      recommendedPlanId: rankedPlans[0]?.id || 'plan-1',
    };
  },

  /**
   * Assesses if commuter can reach the stop before the bus departs.
   */
  checkFeasibility(walkMinutes, bus) {
    const busEtaMinutes = bus.etaMinutes || 4;
    const frequencyMinutes = 8; // Default interval

    if (walkMinutes > busEtaMinutes) {
      return {
        isTight: true,
        warning: `⚠️ You may miss this bus (${busEtaMinutes}m away, walk takes ${walkMinutes}m).`,
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
   * Constructs a 0-Transfer Direct Transit Plan.
   */
  constructDirectPlan({ originLoc, destLoc, oStop, dStop, route, activeBus, transitMinutes, stopsCount, feasibility }) {
    const totalMinutes = oStop.walkMinutes + feasibility.adjustedWaitMinutes + transitMinutes + dStop.walkMinutes;

    return {
      id: `direct-${route.id}-${oStop.stopId}`,
      title: `${route.routeName} (Direct Transit)`,
      badge: 'DIRECT ROUTE',
      type: 'DIRECT',
      totalDuration: `${totalMinutes} mins`,
      totalMinutes,
      departureTime: 'Now',
      arrivalTime: `In ${totalMinutes} mins`,
      walkingDuration: `${oStop.walkMinutes + dStop.walkMinutes} mins`,
      walkingDistanceMeters: oStop.walkMeters + dStop.walkMeters,
      transitDuration: `${transitMinutes} mins`,
      transfersCount: 0,
      fare: '₹25',
      occupancyPercent: activeBus.occupancyPercent,
      occupancyStatus: activeBus.occupancyStatus,
      feasibility,
      whyRecommend: [
        '✓ Direct zero-transfer express service',
        `✓ Total walking only ${oStop.walkMeters + dStop.walkMeters}m`,
        `✓ ${activeBus.busNumber} operating on-schedule`,
      ],
      segments: [
        {
          type: 'WALK',
          subType: 'WALK_TO_STOP',
          title: `Walk to ${oStop.stopName}`,
          distance: `${oStop.walkMeters}m`,
          duration: `${oStop.walkMinutes} mins`,
          guidance: `Estimated walking time from ${originLoc.name} to ${oStop.stopName}.`,
          icon: 'Walk',
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: activeBus.busNumber,
          routeCode: route.routeCode,
          routeName: route.routeName,
          title: `Board ${activeBus.busNumber} (${route.routeCode})`,
          duration: `${transitMinutes} mins`,
          stopsCount,
          occupancyPercent: activeBus.occupancyPercent,
          occupancyStatus: activeBus.occupancyStatus,
          driverName: activeBus.driverName,
          status: activeBus.operationalStatus,
          originStop: oStop.stopName,
          alightStop: dStop.stopName,
          icon: 'Bus',
        },
        {
          type: 'WALK',
          subType: 'WALK_TO_DESTINATION',
          title: `Walk to ${destLoc.name}`,
          distance: `${dStop.walkMeters}m`,
          duration: `${dStop.walkMinutes} mins`,
          guidance: `Alight at ${dStop.stopName} and walk to final destination.`,
          icon: 'Walk',
        },
      ],
    };
  },

  /**
   * Constructs a 1-Transfer Multimodal Plan.
   */
  constructTransferPlan({ originLoc, destLoc, oStop, dStop, hub, route1, route2, bus1, bus2, feasibility1 }) {
    const leg1Minutes = 18;
    const leg2Minutes = 16;
    const totalMinutes =
      oStop.walkMinutes +
      feasibility1.adjustedWaitMinutes +
      leg1Minutes +
      hub.averageTransferMinutes +
      leg2Minutes +
      dStop.walkMinutes;

    const totalWalkMeters = oStop.walkMeters + hub.walkingDistanceMeters + dStop.walkMeters;
    const totalWalkMinutes = oStop.walkMinutes + 2 + dStop.walkMinutes;

    return {
      id: `transfer-${route1.id}-${route2.id}`,
      title: `${route1.routeCode} ➔ ${route2.routeCode} (Via ${hub.name})`,
      badge: 'RECOMMENDED MULTIMODAL',
      type: 'MULTIMODAL',
      totalDuration: `${totalMinutes} mins`,
      totalMinutes,
      departureTime: 'Now',
      arrivalTime: `In ${totalMinutes} mins`,
      walkingDuration: `${totalWalkMinutes} mins`,
      walkingDistanceMeters: totalWalkMeters,
      transitDuration: `${leg1Minutes + leg2Minutes} mins`,
      transfersCount: 1,
      fare: '₹40',
      occupancyPercent: Math.max(bus1.occupancyPercent, bus2.occupancyPercent),
      occupancyStatus: bus1.occupancyPercent > 70 ? 'HIGH' : 'MEDIUM',
      feasibility: feasibility1,
      transferHub: hub,
      whyRecommend: [
        `✓ Best continuous connection via ${hub.name}`,
        `✓ Fast transfer buffer (${hub.averageTransferMinutes} min sync)`,
        `✓ Connects ${bus1.busNumber} to ${bus2.busNumber}`,
      ],
      segments: [
        {
          type: 'WALK',
          subType: 'WALK_TO_STOP',
          title: `Walk to ${oStop.stopName}`,
          distance: `${oStop.walkMeters}m`,
          duration: `${oStop.walkMinutes} mins`,
          guidance: `Walk from ${originLoc.name} to ${oStop.stopName}.`,
          icon: 'Walk',
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: bus1.busNumber,
          routeCode: route1.routeCode,
          routeName: route1.routeName,
          title: `Board ${bus1.busNumber} (${route1.routeCode})`,
          duration: `${leg1Minutes} mins`,
          stopsCount: 4,
          occupancyPercent: bus1.occupancyPercent,
          occupancyStatus: bus1.occupancyStatus,
          driverName: bus1.driverName,
          status: bus1.operationalStatus,
          originStop: oStop.stopName,
          alightStop: hub.name,
          icon: 'Bus',
        },
        {
          type: 'TRANSFER',
          subType: 'TRANSFER_INTERCHANGE',
          title: `Transfer at ${hub.name}`,
          duration: `${hub.averageTransferMinutes} mins`,
          distance: `${hub.walkingDistanceMeters}m`,
          alightBus: bus1.busNumber,
          boardBus: bus2.busNumber,
          guidance: hub.guidance,
          icon: 'Transfer',
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: bus2.busNumber,
          routeCode: route2.routeCode,
          routeName: route2.routeName,
          title: `Board ${bus2.busNumber} (${route2.routeCode})`,
          duration: `${leg2Minutes} mins`,
          stopsCount: 3,
          occupancyPercent: bus2.occupancyPercent,
          occupancyStatus: bus2.occupancyStatus,
          driverName: bus2.driverName,
          status: bus2.operationalStatus,
          originStop: hub.name,
          alightStop: dStop.stopName,
          icon: 'Bus',
        },
        {
          type: 'WALK',
          subType: 'WALK_TO_DESTINATION',
          title: `Walk to ${destLoc.name}`,
          distance: `${dStop.walkMeters}m`,
          duration: `${dStop.walkMinutes} mins`,
          guidance: `Alight at ${dStop.stopName} and complete short walk to destination.`,
          icon: 'Walk',
        },
      ],
    };
  },

  /**
   * Generates low-crowding alternative plan.
   */
  generateAlternativePlan(originLoc, destLoc) {
    const oStop = originLoc.nearestStops?.[0] || { stopName: 'Metro Interchange Terminal', walkMeters: 400, walkMinutes: 5 };
    const dStop = destLoc.nearestStops?.[0] || { stopName: 'Tech Park South', walkMeters: 250, walkMinutes: 3 };

    return {
      id: 'alt-low-crowd',
      title: 'Comfort Feeder (AI Crowd-Aware)',
      badge: 'LESS CROWDED (AI)',
      type: 'MULTIMODAL',
      totalDuration: '48 mins',
      totalMinutes: 48,
      departureTime: 'Now',
      arrivalTime: 'In 48 mins',
      walkingDuration: '8 mins',
      walkingDistanceMeters: 650,
      transitDuration: '40 mins',
      transfersCount: 1,
      fare: '₹30',
      occupancyPercent: 42,
      occupancyStatus: 'LOW',
      feasibility: { isTight: false, warning: null },
      whyRecommend: [
        '✓ AI Recommendation: 42% lower occupancy than peak routes',
        '✓ Guaranteed seating availability',
        '✓ Air-conditioned electric coach (Bus 312)',
      ],
      segments: [
        {
          type: 'WALK',
          subType: 'WALK_TO_STOP',
          title: `Walk to ${oStop.stopName}`,
          distance: '400m',
          duration: '5 mins',
          guidance: 'Estimated walking time to departure platform.',
          icon: 'Walk',
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: 'Bus 312',
          routeCode: 'RT-204',
          routeName: 'Airport Superfast Feeder',
          title: 'Board Bus 312 (RT-204)',
          duration: '22 mins',
          stopsCount: 3,
          occupancyPercent: 42,
          occupancyStatus: 'LOW',
          driverName: 'Ramesh K. (Pilot 108)',
          status: 'APPROACHING',
          icon: 'Bus',
        },
        {
          type: 'TRANSFER',
          subType: 'TRANSFER_INTERCHANGE',
          title: 'Transfer at Metro Interchange',
          duration: '4 mins',
          distance: '80m',
          alightBus: 'Bus 312',
          boardBus: 'Bus 118',
          guidance: 'Cross over to Platform 3.',
          icon: 'Transfer',
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: 'Bus 118',
          routeCode: 'RT-302',
          routeName: 'CBD Tech Feeder',
          title: 'Board Bus 118 (RT-302)',
          duration: '18 mins',
          stopsCount: 3,
          occupancyPercent: 48,
          occupancyStatus: 'LOW',
          driverName: 'Sanjay M. (Pilot 212)',
          status: 'ON TIME',
          icon: 'Bus',
        },
        {
          type: 'WALK',
          subType: 'WALK_TO_DESTINATION',
          title: `Walk to ${destLoc.name}`,
          distance: '250m',
          duration: '3 mins',
          guidance: 'Arrive at destination gate.',
          icon: 'Walk',
        },
      ],
    };
  },

  /**
   * Dynamic Ranking algorithm based on user preference.
   */
  rankPlans(plans, preference) {
    const scored = plans.map((p) => {
      let score = 0;

      if (preference === 'fastest') {
        score = p.totalMinutes * 1.5 + p.transfersCount * 5;
      } else if (preference === 'fewer_transfers') {
        score = p.transfersCount * 40 + p.totalMinutes;
      } else if (preference === 'less_walking') {
        score = p.walkingDistanceMeters * 0.1 + p.totalMinutes;
      } else if (preference === 'less_crowded') {
        score = p.occupancyPercent * 0.8 + p.totalMinutes * 0.4;
      } else {
        // 'best_overall' balanced score
        score =
          p.totalMinutes * 1.0 +
          p.transfersCount * 12 +
          (p.walkingDistanceMeters / 100) * 1.5 +
          p.occupancyPercent * 0.15;
      }

      return { ...p, score };
    });

    scored.sort((a, b) => a.score - b.score);

    // Apply ranking badges
    return scored.map((p, idx) => {
      if (idx === 0) {
        if (preference === 'fastest') p.badge = 'FASTEST ROUTE';
        else if (preference === 'fewer_transfers') p.badge = 'FEWEST TRANSFERS';
        else if (preference === 'less_walking') p.badge = 'MINIMAL WALKING';
        else if (preference === 'less_crowded') p.badge = 'LESS CROWDED (AI)';
        else p.badge = p.transfersCount === 0 ? 'BEST DIRECT ROUTE' : 'BEST MULTIMODAL ROUTE';
      }
      return p;
    });
  },
};

export default multimodalRouteService;
