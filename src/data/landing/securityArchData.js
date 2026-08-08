import { ShieldCheck, Lock, Server, Database, HardDrive, RefreshCw } from 'lucide-react';

export const SECURITY_ARCH_DATA = {
  topology: [
    { label: 'Connected Users & Kiosks', sub: 'TLS 1.3 / WSS' },
    { label: 'Edge CDN & DDoS Shield', sub: 'Cloudflare Edge' },
    { label: 'High-Availability Load Balancer', sub: 'Traffic Mesh' },
    { label: 'Scalable Microservice API Nodes', sub: 'Stateless Node Cluster' },
    { label: 'In-Memory Redis Telemetry Buffer', sub: 'Sub-5ms Cache' },
    { label: 'Real-Time Event Stream Broker', sub: 'WebSocket / MQTT Mesh' },
    { label: 'Encrypted Database Cluster', sub: 'MongoDB High Availability' },
    { label: 'Automated Snapshot Cold Backups', sub: 'Disaster Recovery' },
  ],

  features: [
    {
      id: 'high-availability',
      title: 'High Availability',
      description: 'Distributed service instances prevent single-point-of-failure risks and ensure continuous uptime.',
      icon: Server,
    },
    {
      id: 'secure-access',
      title: 'Role-Based Access Control',
      description: 'Strict RBAC security models guarantee passengers, drivers, and administrators access only authorized endpoints.',
      icon: Lock,
    },
    {
      id: 'rate-protection',
      title: 'Rate Protection & DDoS Shield',
      description: 'Intelligent throttling safeguards public APIs and telemetry ingestion gateways against brute spikes.',
      icon: ShieldCheck,
    },
    {
      id: 'data-backups',
      title: 'Automated Backups',
      description: 'Scheduled multi-region database snapshots provide reliable disaster recovery protection.',
      icon: HardDrive,
    },
    {
      id: 'monitoring',
      title: 'Health Telemetry Monitoring',
      description: 'Continuous monitoring of memory, CPU loads, WebSocket client connections, and cluster latency.',
      icon: RefreshCw,
    },
    {
      id: 'disaster-recovery',
      title: 'Failover Architecture',
      description: 'Automated failover routing ensures rapid recovery with near-zero data packet loss.',
      icon: Database,
    },
  ],
};
