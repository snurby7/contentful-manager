import { Router } from "express";
import ContentfulManagement from "./ContenfulManagement";
import ContentfulImportExport from "./ContentfulImportExport";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/management", ContentfulManagement);
router.use("/data", ContentfulImportExport);

// Export the base-router
export default router;
