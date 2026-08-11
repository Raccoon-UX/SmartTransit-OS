import { Route, Bus, Stop } from '../models/index.js';

export const TRANSIT_LANDMARKS = [
  {
    id: 'lm-borivali-stn',
    name: 'Borivali Railway Station',
    category: 'RAIL_TERMINAL',
    coordinates: { x: 22, y: 28 },
    nearestStops: [
      { stopId: 'BST-001', stopName: 'Borivali Central Hub', walkMeters: 650, walkMinutes: 8 },
      { stopId: 'BST-012', stopName: 'Kandivali Flyover Express', walkMeters: 1400, walkMinutes: 17 },
    ],
  },
  {
    id: 'lm-vashi-sec17',
    name: 'Vashi Sector 17',
    category: 'COMMERCIAL_DISTRICT',
    coordinates: { x: 82, y: 74 },
    nearestStops: [
      { stopId: 'BST-510', stopName: 'Vashi Sector 17', walkMeters: 300, walkMinutes: 4 },
      { stopId: 'BST-550', stopName: 'Navi Mumbai Gateway', walkMeters: 1100, walkMinutes: 14 },
    ],
  },
  {
    id: 'lm-borivali-hub',
    name: 'Borivali Central Hub',
    category: 'BUS_TERMINAL',
    coordinates: { x: 26, y: 32 },
    nearestStops: [
      { stopId: 'BST-001', stopName: 'Borivali Central Hub', walkMeters: 50, walkMinutes: 1 },
    ],
  },
  {
    id: 'lm-andheri-west',
    name: 'Andheri West Exchange',
    category: 'METRO_INTERCHANGE',
    coordinates: { x: 42, y: 56 },
    nearestStops: [
      { stopId: 'BST-208', stopName: 'Andheri West Exchange', walkMeters: 120, walkMinutes: 2 },
    ],
  },
  {
    id: 'lm-metro-interchange',
    name: 'Metro Interchange Terminal',
    category: 'METRO_INTERCHANGE',
    coordinates: { x: 50, y: 44 },
    nearestStops: [
      { stopId: 'BST-090', stopName: 'Metro Interchange', walkMeters: 80, walkMinutes: 1 },
      { stopId: 'BST-104', stopName: 'Western Highway Exchange', walkMeters: 450, walkMinutes: 6 },
    ],
  },
  {
    id: 'lm-airport-t2',
    name: 'Terminal 2 International Airport',
    category: 'AIRPORT',
    coordinates: { x: 58, y: 62 },
    nearestStops: [
      { stopId: 'BST-250', stopName: 'Terminal 2 Arrivals', walkMeters: 150, walkMinutes: 2 },
    ],
  },
  {
    id: 'lm-city-center',
    name: 'City Center Hub',
    category: 'COMMERCIAL_HUB',
    coordinates: { x: 46, y: 48 },
    nearestStops: [
      { stopId: 'BST-030', stopName: 'City Center Hub', walkMeters: 60, walkMinutes: 1 },
    ],
  },
  {
    id: 'lm-tech-park',
    name: 'Tech Park Station',
    category: 'IT_PARK',
    coordinates: { x: 68, y: 78 },
    nearestStops: [
      { stopId: 'BST-110', stopName: 'Tech Park Station', walkMeters: 100, walkMinutes: 1 },
      { stopId: 'BST-075', stopName: 'Silicon Boulevard', walkMeters: 550, walkMinutes: 7 },
    ],
  },
  {
    id: 'lm-thane-stn',
    name: 'Thane Central Station',
    category: 'RAIL_TERMINAL',
    coordinates: { x: 74, y: 36 },
    nearestStops: [
      { stopId: 'BST-400', stopName: 'Thane Central Station', walkMeters: 100, walkMinutes: 1 },
    ],
  },
  {
    id: 'lm-navi-gateway',
    name: 'Navi Mumbai Gateway',
    category: 'MUNICIPAL_BOUNDARY',
    coordinates: { x: 88, y: 84 },
    nearestStops: [
      { stopId: 'BST-550', stopName: 'Navi Mumbai Gateway', walkMeters: 80, walkMinutes: 1 },
    ],
  },
];

export const TRANSFER_HUBS = [
  {
    id: 'hub-magathane',
    name: 'Magathane Junction / Western Highway Exchange',
    coordinates: { x: 38, y: 44 },
    connectingRoutes: ['RT-108', 'RT-415'],
    connectingStops: ['BST-104', 'BST-420'],
    averageTransferMinutes: 5,
    walkingDistanceMeters: 120,
    guidance: 'Alight at Western Highway Exchange. Walk 120m via the skywalk to Platform B.',
  },
  {
    id: 'hub-metro-interchange',
    name: 'Metro Interchange Central Terminal',
    coordinates: { x: 50, y: 44 },
    connectingRoutes: ['RT-108', 'RT-204', 'RT-302'],
    connectingStops: ['BST-090', 'BST-104', 'BST-030'],
    averageTransferMinutes: 6,
    walkingDistanceMeters: 180,
    guidance: 'Transfer at Central Concourse. Follow signs for Route RT-204 / RT-302 feeder bay.',
  },
  {
    id: 'hub-airoli',
    name: 'Airoli Toll Plaza Interchange',
    coordinates: { x: 78, y: 52 },
    connectingRoutes: ['RT-415', 'RT-302'],
    connectingStops: ['BST-480', 'BST-075'],
    averageTransferMinutes: 4,
    walkingDistanceMeters: 90,
    guidance: 'Cross over to Eastern Express transit bay.',
  },
];

export const plannerService = {
  /**
   * Resolves text or object query into known transit landmark or smart stop.
   */
  async resolveLocation(input) {
    if (!input) return null;
    const queryStr = typeof input === 'string' ? input : input.name || '';
    if (!queryStr.trim()) return null;
    const cleanQuery = queryStr.toLowerCase().trim();

    // 1. Check Landmark directory
    const landmark = TRANSIT_LANDMARKS.find((lm) =>
      lm.name.toLowerCase().includes(cleanQuery) || cleanQuery.includes(lm.name.toLowerCase())
    );
    if (landmark) {
      return {
        type: 'LANDMARK',
        id: landmark.id,
        name: landmark.name,
        coordinates: landmark.coordinates,
        nearestStops: landmark.nearestStops,
      };
    }

    // 2. Check Database Stops
    const dbStop = await Stop.findOne({
      $or: [
        { name: { $regex: cleanQuery, $options: 'i' } },
        { code: cleanQuery.toUpperCase() },
      ],
    }).lean();

    if (dbStop) {
      return {
        type: 'STOP',
        id: dbStop.code,
        name: dbStop.name,
        coordinates: dbStop.coordinates || { x: 50, y: 50 },
        nearestStops: [{ stopId: dbStop.code, stopName: dbStop.name, walkMeters: 50, walkMinutes: 1 }],
      };
    }

    // 3. Fallback custom location
    return {
      type: 'CUSTOM_LOCATION',
      id: `loc-${Date.now()}`,
      name: queryStr,
      coordinates: input.latitude && input.longitude ? { lat: input.latitude, lng: input.longitude } : { x: 30, y: 35 },
      nearestStops: [
        { stopId: 'BST-001', stopName: 'Borivali Central Hub', walkMeters: 750, walkMinutes: 9 },
        { stopId: 'BST-104', stopName: 'Western Highway Exchange', walkMeters: 1200, walkMinutes: 14 },
      ],
    };
  },

  /**
   * Core Multimodal Routing Engine
   */
  async planJourney({ origin, destination, preference = 'BEST_OVERALL' }) {
    const normPref = preference.toLowerCase().replace(/_/g, '_');

    const originLoc = (await this.resolveLocation(origin)) || {
      name: typeof origin === 'string' ? origin : origin?.name || 'Origin',
      nearestStops: [{ stopId: 'BST-001', stopName: 'Borivali Central Hub', walkMeters: 650, walkMinutes: 8 }],
    };

    const destLoc = (await this.resolveLocation(destination)) || {
      name: typeof destination === 'string' ? destination : destination?.name || 'Destination',
      nearestStops: [{ stopId: 'BST-510', stopName: 'Vashi Sector 17', walkMeters: 300, walkMinutes: 4 }],
    };

    const originStops = originLoc.nearestStops || [];
    const destStops = destLoc.nearestStops || [];

    // Query Database Routes & Buses
    const dbRoutes = await Route.find().lean();
    const dbBuses = await Bus.find().populate('driverId', 'name driverProfile.badgeId').lean();

    const candidatePlans = [];

    // 1. Direct Routes
    for (const oStop of originStops) {
      for (const dStop of destStops) {
        for (const route of dbRoutes) {
          const oIndex = route.stops.findIndex(
            (s) => s.stopCode === oStop.stopId || s.code === oStop.stopId || s.stopName === oStop.stopName || s.name === oStop.stopName
          );
          const dIndex = route.stops.findIndex(
            (s) => s.stopCode === dStop.stopId || s.code === dStop.stopId || s.stopName === dStop.stopName || s.name === dStop.stopName
          );

          if (oIndex !== -1 && dIndex !== -1 && oIndex < dIndex) {
            const transitMinutes = (dIndex - oIndex) * 5 + 4;
            const assignedBus = dbBuses.find(
              (b) => b.routeId?.toString() === route._id.toString() || b.busNumber === 'Bus 245'
            ) || {
              busNumber: 'Bus 245',
              occupancyPercent: 65,
              occupancyStatus: 'MEDIUM',
              status: 'ON_TIME',
              driverId: { name: 'Vikram Jadhav', driverProfile: { badgeId: 'PLT-042' } },
            };

            const busData = {
              busNumber: assignedBus.busNumber,
              etaMinutes: 4,
              occupancyPercent: assignedBus.occupancyPercent || 65,
              occupancyStatus: assignedBus.occupancyStatus || 'MEDIUM',
              operationalStatus: assignedBus.status === 'ACTIVE' ? 'ON TIME' : assignedBus.status,
              driverName: assignedBus.driverId?.name
                ? `${assignedBus.driverId.name} (${assignedBus.driverId.driverProfile?.badgeId || 'Pilot'})`
                : 'Vikram J. (Pilot 042)',
            };

            const feasibility = this.checkFeasibility(oStop.walkMinutes, busData);

            candidatePlans.push(
              this.constructDirectPlan({
                originLoc,
                destLoc,
                oStop,
                dStop,
                route,
                activeBus: busData,
                transitMinutes,
                stopsCount: dIndex - oIndex,
                feasibility,
              })
            );
          }
        }
      }
    }

    // 2. 1-Transfer Multimodal Routes
    for (const oStop of originStops) {
      for (const dStop of destStops) {
        for (const hub of TRANSFER_HUBS) {
          const route1 = dbRoutes.find(
            (r) =>
              r.stops.some(
                (s) => s.stopCode === oStop.stopId || s.code === oStop.stopId || s.stopName === oStop.stopName || s.name === oStop.stopName
              ) && hub.connectingRoutes.includes(r.routeCode)
          );

          const route2 = dbRoutes.find(
            (r) =>
              r.stops.some(
                (s) => s.stopCode === dStop.stopId || s.code === dStop.stopId || s.stopName === dStop.stopName || s.name === dStop.stopName
              ) &&
              hub.connectingRoutes.includes(r.routeCode) &&
              r.routeCode !== route1?.routeCode
          );

          if (route1 && route2) {
            const bus1 = {
              busNumber: 'Bus 245',
              etaMinutes: 3,
              occupancyPercent: 78,
              occupancyStatus: 'HIGH',
              operationalStatus: 'ON TIME',
              driverName: 'Vikram J. (Pilot 042)',
            };

            const bus2 = {
              busNumber: 'Bus 504',
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

    // 3. Fallback AI / Low Crowding Alternative
    if (candidatePlans.length < 3) {
      candidatePlans.push(this.generateAlternativePlan(originLoc, destLoc));
    }

    // Deduplicate
    const uniquePlans = [];
    const seen = new Set();
    for (const p of candidatePlans) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        uniquePlans.push(p);
      }
    }

    const rankedPlans = this.rankPlans(uniquePlans, normPref);
    const hasDirect = rankedPlans.some((p) => p.transfersCount === 0);

    return {
      status: hasDirect ? 'DIRECT_ROUTE_FOUND' : 'MULTIMODAL_ROUTE_FOUND',
      isDirectAvailable: hasDirect,
      origin: originLoc.name,
      destination: destLoc.name,
      preference: preference.toUpperCase(),
      plans: rankedPlans.slice(0, 3),
      recommendedPlanId: rankedPlans[0]?.id || 'plan-1',
      recommendedOption: rankedPlans[0] || null,
      options: rankedPlans.slice(0, 3),
    };
  },

  checkFeasibility(walkMinutes, bus) {
    const busEtaMinutes = bus.etaMinutes || 4;
    const frequencyMinutes = 8;

    if (walkMinutes > busEtaMinutes) {
      return {
        isTight: true,
        feasible: false,
        warning: `⚠️ You may miss this bus (${busEtaMinutes}m away, walk takes ${walkMinutes}m).`,
        reason: 'PASSENGER_MAY_MISS_BUS',
        recommendedBusTime: `${busEtaMinutes + frequencyMinutes} min (Next Scheduled Bus)`,
        adjustedWaitMinutes: Math.max(0, busEtaMinutes + frequencyMinutes - walkMinutes),
      };
    }

    return {
      isTight: false,
      feasible: true,
      warning: null,
      reason: 'ON_TIME_FEASIBLE',
      recommendedBusTime: `${busEtaMinutes} min`,
      adjustedWaitMinutes: Math.max(0, busEtaMinutes - walkMinutes),
    };
  },

  constructDirectPlan({ originLoc, destLoc, oStop, dStop, route, activeBus, transitMinutes, stopsCount, feasibility }) {
    const totalMinutes = oStop.walkMinutes + feasibility.adjustedWaitMinutes + transitMinutes + dStop.walkMinutes;

    return {
      id: `direct-${route.routeCode}-${oStop.stopId}`,
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
        'Direct zero-transfer express service',
        `Total walking only ${oStop.walkMeters + dStop.walkMeters}m`,
        `${activeBus.busNumber} operating on-schedule`,
      ],
      segments: [
        {
          type: 'WALK',
          subType: 'WALK_TO_STOP',
          from: originLoc.name,
          to: oStop.stopName,
          title: `Walk to ${oStop.stopName}`,
          distance: `${oStop.walkMeters}m`,
          distanceMeters: oStop.walkMeters,
          duration: `${oStop.walkMinutes} mins`,
          durationMinutes: oStop.walkMinutes,
          guidance: `Estimated walking time from ${originLoc.name} to ${oStop.stopName}.`,
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: activeBus.busNumber,
          routeCode: route.routeCode,
          routeName: route.routeName,
          from: oStop.stopName,
          to: dStop.stopName,
          title: `Board ${activeBus.busNumber} (${route.routeCode})`,
          duration: `${transitMinutes} mins`,
          durationMinutes: transitMinutes,
          etaMinutes: activeBus.etaMinutes,
          stopsCount,
          occupancyPercent: activeBus.occupancyPercent,
          occupancyStatus: activeBus.occupancyStatus,
          driverName: activeBus.driverName,
          status: activeBus.operationalStatus,
        },
        {
          type: 'WALK',
          subType: 'WALK_TO_DESTINATION',
          from: dStop.stopName,
          to: destLoc.name,
          title: `Walk to ${destLoc.name}`,
          distance: `${dStop.walkMeters}m`,
          distanceMeters: dStop.walkMeters,
          duration: `${dStop.walkMinutes} mins`,
          durationMinutes: dStop.walkMinutes,
          guidance: `Alight at ${dStop.stopName} and walk to final destination.`,
        },
      ],
    };
  },

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
      id: `transfer-${route1.routeCode}-${route2.routeCode}`,
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
        `Best continuous connection via ${hub.name}`,
        `Fast transfer buffer (${hub.averageTransferMinutes} min sync)`,
        `Connects ${bus1.busNumber} to ${bus2.busNumber}`,
      ],
      segments: [
        {
          type: 'WALK',
          subType: 'WALK_TO_STOP',
          from: originLoc.name,
          to: oStop.stopName,
          title: `Walk to ${oStop.stopName}`,
          distance: `${oStop.walkMeters}m`,
          distanceMeters: oStop.walkMeters,
          duration: `${oStop.walkMinutes} mins`,
          durationMinutes: oStop.walkMinutes,
          guidance: `Walk from ${originLoc.name} to ${oStop.stopName}.`,
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: bus1.busNumber,
          routeCode: route1.routeCode,
          routeName: route1.routeName,
          from: oStop.stopName,
          to: hub.name,
          title: `Board ${bus1.busNumber} (${route1.routeCode})`,
          duration: `${leg1Minutes} mins`,
          durationMinutes: leg1Minutes,
          stopsCount: 4,
          occupancyPercent: bus1.occupancyPercent,
          occupancyStatus: bus1.occupancyStatus,
          driverName: bus1.driverName,
          status: bus1.operationalStatus,
        },
        {
          type: 'TRANSFER',
          subType: 'TRANSFER_INTERCHANGE',
          location: hub.name,
          title: `Transfer at ${hub.name}`,
          duration: `${hub.averageTransferMinutes} mins`,
          durationMinutes: hub.averageTransferMinutes,
          distance: `${hub.walkingDistanceMeters}m`,
          distanceMeters: hub.walkingDistanceMeters,
          alightBus: bus1.busNumber,
          boardBus: bus2.busNumber,
          guidance: hub.guidance,
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: bus2.busNumber,
          routeCode: route2.routeCode,
          routeName: route2.routeName,
          from: hub.name,
          to: dStop.stopName,
          title: `Board ${bus2.busNumber} (${route2.routeCode})`,
          duration: `${leg2Minutes} mins`,
          durationMinutes: leg2Minutes,
          stopsCount: 3,
          occupancyPercent: bus2.occupancyPercent,
          occupancyStatus: bus2.occupancyStatus,
          driverName: bus2.driverName,
          status: bus2.operationalStatus,
        },
        {
          type: 'WALK',
          subType: 'WALK_TO_DESTINATION',
          from: dStop.stopName,
          to: destLoc.name,
          title: `Walk to ${destLoc.name}`,
          distance: `${dStop.walkMeters}m`,
          distanceMeters: dStop.walkMeters,
          duration: `${dStop.walkMinutes} mins`,
          durationMinutes: dStop.walkMinutes,
          guidance: `Alight at ${dStop.stopName} and complete short walk to destination.`,
        },
      ],
    };
  },

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
      feasibility: { isTight: false, feasible: true, reason: 'ON_TIME_FEASIBLE' },
      whyRecommend: [
        'AI Recommendation: 42% lower occupancy than peak routes',
        'Guaranteed seating availability',
        'Air-conditioned electric coach (Bus 312)',
      ],
      segments: [
        {
          type: 'WALK',
          subType: 'WALK_TO_STOP',
          from: originLoc.name,
          to: oStop.stopName,
          title: `Walk to ${oStop.stopName}`,
          distance: '400m',
          distanceMeters: 400,
          duration: '5 mins',
          durationMinutes: 5,
          guidance: 'Estimated walking time to departure platform.',
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: 'Bus 312',
          routeCode: 'RT-204',
          routeName: 'Airport Superfast Feeder',
          from: oStop.stopName,
          to: 'Metro Interchange',
          title: 'Board Bus 312 (RT-204)',
          duration: '22 mins',
          durationMinutes: 22,
          stopsCount: 3,
          occupancyPercent: 42,
          occupancyStatus: 'LOW',
          driverName: 'Ramesh K. (Pilot 108)',
          status: 'APPROACHING',
        },
        {
          type: 'TRANSFER',
          subType: 'TRANSFER_INTERCHANGE',
          location: 'Metro Interchange',
          title: 'Transfer at Metro Interchange',
          duration: '4 mins',
          durationMinutes: 4,
          distance: '80m',
          distanceMeters: 80,
          alightBus: 'Bus 312',
          boardBus: 'Bus 118',
          guidance: 'Cross over to Platform 3.',
        },
        {
          type: 'BUS',
          subType: 'BUS_TRANSIT',
          busNumber: 'Bus 118',
          routeCode: 'RT-302',
          routeName: 'CBD Tech Feeder',
          from: 'Metro Interchange',
          to: dStop.stopName,
          title: 'Board Bus 118 (RT-302)',
          duration: '18 mins',
          durationMinutes: 18,
          stopsCount: 3,
          occupancyPercent: 48,
          occupancyStatus: 'LOW',
          driverName: 'Sanjay M. (Pilot 212)',
          status: 'ON TIME',
        },
        {
          type: 'WALK',
          subType: 'WALK_TO_DESTINATION',
          from: dStop.stopName,
          to: destLoc.name,
          title: `Walk to ${destLoc.name}`,
          distance: '250m',
          distanceMeters: 250,
          duration: '3 mins',
          durationMinutes: 3,
          guidance: 'Arrive at destination gate.',
        },
      ],
    };
  },

  rankPlans(plans, preference) {
    const pref = preference.toLowerCase();
    const scored = plans.map((p) => {
      let score = 0;

      if (pref.includes('fast')) {
        score = p.totalMinutes * 1.5 + p.transfersCount * 5;
      } else if (pref.includes('few') || pref.includes('transfer')) {
        score = p.transfersCount * 40 + p.totalMinutes;
      } else if (pref.includes('walk')) {
        score = p.walkingDistanceMeters * 0.1 + p.totalMinutes;
      } else if (pref.includes('crowd')) {
        score = p.occupancyPercent * 0.8 + p.totalMinutes * 0.4;
      } else {
        // best_overall
        score =
          p.totalMinutes * 1.0 +
          p.transfersCount * 12 +
          (p.walkingDistanceMeters / 100) * 1.5 +
          p.occupancyPercent * 0.15;
      }

      return { ...p, score };
    });

    scored.sort((a, b) => a.score - b.score);

    return scored.map((p, idx) => {
      if (idx === 0) {
        if (pref.includes('fast')) p.badge = 'FASTEST ROUTE';
        else if (pref.includes('few') || pref.includes('transfer')) p.badge = 'FEWEST TRANSFERS';
        else if (pref.includes('walk')) p.badge = 'MINIMAL WALKING';
        else if (pref.includes('crowd')) p.badge = 'LESS CROWDED (AI)';
        else p.badge = p.transfersCount === 0 ? 'BEST DIRECT ROUTE' : 'BEST MULTIMODAL ROUTE';
      }
      return p;
    });
  },
};

export default plannerService;
