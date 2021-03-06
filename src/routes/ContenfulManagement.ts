import { Router } from 'express';
import { ContentManager } from 'src/entities';

// Init shared
const router = Router();
const contentManager = new ContentManager();

router.get('/spaces', async (req, res) => {
  const spaces = await contentManager.getSpaces();
  const namedSpaceIds = spaces.items.map((item) => ({
    space_name: item.name,
    space_id: item.sys.id,
  }));
  res.send(namedSpaceIds);
});

router.get('/:space_id/environment', async (req, res) => {
  const entries = await contentManager.getEnvironments(req.params.space_id);
  res.send(entries);
});

router.get('/:space_id/contentTypes/', async (req, res) => {
  const entries = await contentManager.getContentTypes(req.params.space_id);
  res.send(entries);
});

router.post(
  '/:space_id/environment/:environment/entries/publish',
  async (req, res) => {
    const { space_id, environment } = req.params;
    await contentManager.publishEntries(space_id, environment, req.body);
    res.send({ messsage: 'published records' });
  }
);
router.post(
  '/:space_id/environment/:environment/entries/unpublish',
  async (req, res) => {
    const { space_id, environment } = req.params;
    await contentManager.unpublishEntries(space_id, environment, req.body);
    res.send({ messsage: 'unpublished records' });
  }
);

router.get('/:space_id/environment/:environment/entries', async (req, res) => {
  const { space_id, environment } = req.params;
  const entries = await contentManager.getEnvironmentEntries(
    space_id,
    environment,
    req.body
  );
  res.send(entries);
});

router.post('/:space_id/entry/:entry_id', async (req, res) => {
  const { entry_id, space_id } = req.params;
  const result = await contentManager.getEntry(space_id, entry_id, req.body);
  res.send(result);
});

router.post('/:space_id/entry/:entry_id/update', async (req, res) => {
  const { entry_id, space_id } = req.params;
  const result = await contentManager.updateEntry(space_id, entry_id, req.body);
  res.send(result);
});

/**********************************
 * Create a piece of content
 *********************************/
router.post('/:space_id/entry/create/:content_type_id', async (req, res) => {
  const { content_type_id, space_id } = req.params;
  const result = await contentManager.createEntry(
    space_id,
    content_type_id,
    req.body
  );
  res.send(result);
});

export default router;
