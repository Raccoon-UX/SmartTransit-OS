/**
 * SmartTransit OS — Application Server Cluster Service
 */

import { MOCK_SERVER_NODES } from '../../data/soc/servers.js';

export const serverService = {
  getServerNodes() {
    return [...MOCK_SERVER_NODES];
  },
};

export default serverService;
