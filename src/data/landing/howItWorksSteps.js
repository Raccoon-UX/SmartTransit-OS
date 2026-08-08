import { Radio, Server, Cpu, Smartphone, BarChart3 } from 'lucide-react';

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: '01',
    title: 'GPS & Transit Telemetry',
    subtitle: 'Edge Telematics Ingestion',
    description: 'Vehicle telematics units transmit high-frequency GPS coordinates, speed, heading, and onboard sensor counts every 2 seconds.',
    icon: Radio,
    color: 'border-transit-500 text-transit-500 bg-transit-500/10',
  },
  {
    stepNumber: '02',
    title: 'Real-Time Processing Mesh',
    subtitle: 'High-Throughput Event Gateway',
    description: 'Cloud event brokers ingest 10,000+ telemetry packets per second with in-memory Redis deduplication and sub-50ms latency.',
    icon: Server,
    color: 'border-cyan-500 text-cyan-500 bg-cyan-500/10',
  },
  {
    stepNumber: '03',
    title: 'ETA & Occupancy Intelligence',
    subtitle: 'Predictive Transit Engine',
    description: 'Algorithmic models evaluate route topology, dwell times, and live traffic patterns to generate updated arrival estimates.',
    icon: Cpu,
    color: 'border-emerald-500 text-emerald-500 bg-emerald-500/10',
  },
  {
    stepNumber: '04',
    title: 'Passenger & Authority Interfaces',
    subtitle: 'Unified Multi-Screen Mesh',
    description: 'Calculated updates broadcast instantaneously to Passenger Mobiles, Driver Cockpits, Admin Walls, and Digital Bus Stops.',
    icon: Smartphone,
    color: 'border-amber-500 text-amber-500 bg-amber-500/10',
  },
  {
    stepNumber: '05',
    title: 'Smarter Transit Decisions',
    subtitle: 'Optimized Urban Mobility',
    description: 'Commuters travel with zero guesswork while transport authorities optimize schedules, fleet allocation, and service reliability.',
    icon: BarChart3,
    color: 'border-purple-500 text-purple-500 bg-purple-500/10',
  },
];
