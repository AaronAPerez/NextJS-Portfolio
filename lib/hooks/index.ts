/**
 * Hooks Exports - Central export point for all custom hooks
 */

// GBP Query Hooks (TanStack Query)
export {
  // Query keys
  gbpQueryKeys,
  // Client hooks
  useClients,
  useClient,
  useCreateClient,
  useUpdateClient,
  useDeleteClient,
  // Lead hooks
  useLeads,
  useLead,
  useCreateLead,
  useUpdateLead,
  useDeleteLead,
  // Report hooks
  useReports,
  useReport,
  useCreateReport,
  useUpdateReport,
  // Package hooks
  usePackages,
  useUpdatePackage,
} from './use-gbp-queries'
