import { Router } from 'express';
import ContentfulManagement from './ContenfulManagement';
import ContentfulGenerator from './ContentfulGenerator';
import ContentfulImportExport from './ContentfulImportExport';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/management', ContentfulManagement);
router.use('/data', ContentfulImportExport);
router.use('/programmatic-create', ContentfulGenerator);

// Export the base-router
export default router;
