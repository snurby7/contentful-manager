import { Router } from 'express';
import { ContentExport, ContentImport } from 'src/entities/contentful';
import { removeTopLevelId } from 'src/mutations';

// Init shared
const router = Router();
const contentExport = new ContentExport();
const contentImport = new ContentImport();

router.post('/export', async (req, res) => {
  const result = await contentExport.exportDataByQuery({
    ...req.body,
    contentFile: 'contentful-export-data.json',
  });
  res.send(result);
});

router.post('/export-import', async (req, res) => {
  await contentExport.exportDataByQuery({
    ...req.body,
    contentFile: 'contentful-export-data.json',
  });
  // read the file from the stored JSON, it is view only when it comes back from contentful, hence why dumped to a file.
  const contentToImport = require('../../contentful-export-data.json');
  // * pass the data to the import and by stripping off the top level id it will act as a 'create'
  const importResult = await contentImport.importData({
    ...req.body,
    content: removeTopLevelId(contentToImport),
  });
  res.send(importResult);
});

export default router;
