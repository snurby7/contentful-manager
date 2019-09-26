import * as express from "express";
import { ContentManager } from "./contentful/ContentManager";

const app = express();
const contentManager = new ContentManager();
const port = 3000;
app.get("/", (req, res) => {
  res.send("server active");
});
app.get("/contentful/space", async (req, res) => {
  const entries = await contentManager.getEntriesForSpace(req.params.space_id);
  res.send(entries);
});
app.get("/contentful/", async (req, res) => {
  const spaces = await contentManager.getSpaces();
  const namedSpaceIds = spaces.items.map(item => ({
    space_name: item.name,
    space_id: item.sys.id
  }));
  res.send(namedSpaceIds);
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
