/**
 * SmartTransit OS — Infrastructure Topology Service
 */

import { MOCK_INFRASTRUCTURE_NODES } from '../../data/soc/infrastructure.js';

export const infrastructureService = {
  getTopologyNodes() {
    return [...MOCK_INFRASTRUCTURE_NODES];
  },
};

export default infrastructureService;
