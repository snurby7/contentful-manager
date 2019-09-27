import * as express from "express";
import * as fs from "fs";
import { ContentManager } from "./contentful/ContentManager";
import { ContentExport } from "./contentful/ContentExport";
import { ContentImport } from "./contentful/ContentImport";
import { removeTopLevelId } from "./mutations";

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const contentManager = new ContentManager();
const contentExport = new ContentExport();
const contentImport = new ContentImport();

const port = 3000;

app.get("/", (req, res) => {
  res.send("server active");
});

// Management Endpoints
app.get("/contentful/:space_id/environment", async (req, res) => {
  const entries = await contentManager.getEnvironments(req.params.space_id);
  res.send(entries);
});

app.get("/contentful/:space_id/contentTypes/", async (req, res) => {
  const entries = await contentManager.getContentTypes(req.params.space_id);
  res.send(entries);
});

app.get(
  "/contentful/:space_id/environment/:environment/entries",
  async (req, res) => {
    const { space_id, environment } = req.params;
    const entries = await contentManager.getEnvironmentEntries(
      space_id,
      environment
    );
    res.send(entries);
  }
);

app.get("/contentful/spaces", async (req, res) => {
  const spaces = await contentManager.getSpaces();
  const namedSpaceIds = spaces.items.map(item => ({
    space_name: item.name,
    space_id: item.sys.id
  }));
  res.send(namedSpaceIds);
});

app.post("/contentful/export", async (req, res) => {
  const result = await contentExport.exportDataByQuery({
    ...req.body,
    contentFile: "contentful-export.json"
  });
  res.send(result);
});

app.post("/contentful/export-import", async (req, res) => {
  await contentExport.exportDataByQuery({
    ...req.body,
    contentFile: "contentful-export.json"
  });
  const result = require("../contentful-export.json");
  const importResult = await contentImport.importData({
    ...req.body,
    content: removeTopLevelId(result as any)
  });
  res.send(importResult);
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
