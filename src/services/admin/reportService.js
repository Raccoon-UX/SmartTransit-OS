/**
 * SmartTransit OS — Transport Operational Reports Service
 */

import { MOCK_ADMIN_REPORTS } from '../../data/admin/adminReports.js';

export const reportService = {
  getReports() {
    return [...MOCK_ADMIN_REPORTS];
  },

  simulateExportCsv(reportId) {
    const report = MOCK_ADMIN_REPORTS.find((r) => r.id === reportId) || MOCK_ADMIN_REPORTS[0];
    const csvContent = `Report Title,Category,Date Generated,Summary\n"${report.title}","${report.category}","${report.dateGenerated}","${report.summary}"`;
    return csvContent;
  },
};

export default reportService;
