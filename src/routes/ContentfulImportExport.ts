import { Router } from 'express';

import { removeTopLevelId } from 'src/mutations';
import { ContentExport, ContentImport } from 'src/entities/contentful';

// Init shared
const router = Router();
const contentExport = new ContentExport();
const contentImport = new ContentImport();

router.post('/export', async (req, res) => {
  const result = await contentExport.exportDataByQuery({
    ...req.body,
    contentFile: 'contentful-export.json',
  });
  res.send(result);
});

router.post('/export-import', async (req, res) => {
  await contentExport.exportDataByQuery({
    ...req.body,
    contentFile: 'contentful-export.json',
  });
  // read the file from the stored JSON, it is view only when it comes back from contentful, hence why dumped to a file.
  const result = require('../contentful-export.json');
  const importResult = await contentImport.importData({
    ...req.body,
    content: removeTopLevelId(result as any),
  });
  res.send(importResult);
});

export default router;
