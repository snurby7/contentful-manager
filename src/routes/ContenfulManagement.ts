import { logger } from "@shared";
import { Request, Response, Router, Express } from "express";

import { ContentManager } from "src/entities";

// Init shared
const router = Router();
const contentManager = new ContentManager();

// Management Endpoints
router.get("/:space_id/environment", async (req, res) => {
  const entries = await contentManager.getEnvironments(req.params.space_id);
  res.send(entries);
});

router.get("/:space_id/contentTypes/", async (req, res) => {
  const entries = await contentManager.getContentTypes(req.params.space_id);
  res.send(entries);
});

router.get("/:space_id/environment/:environment/entries", async (req, res) => {
  const { space_id, environment } = req.params;
  const entries = await contentManager.getEnvironmentEntries(
    space_id,
    environment
  );
  res.send(entries);
});

router.get("/spaces", async (req, res) => {
  const spaces = await contentManager.getSpaces();
  const namedSpaceIds = spaces.items.map(item => ({
    space_name: item.name,
    space_id: item.sys.id
  }));
  res.send(namedSpaceIds);
});

router.post("/:space_id/entry/:entry_id/update", async (req, res) => {
  const { entry_id, space_id } = req.params;
  const result = await contentManager.getEntry(space_id, entry_id, req.body);
  res.send(result);
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
