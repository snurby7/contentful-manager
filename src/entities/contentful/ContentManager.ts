import { createClient, ClientAPI } from "contentful-management";
import { Collection } from "contentful-management/typings/collection";
import { Space } from "contentful-management/typings/space";
import { ContentfulManagementToken } from "../../../keys";

export class ContentManager {
  private client: ClientAPI;

  constructor() {
    this.client = createClient({
      // This is the access token for this space. Normally you get the token   Cin the Contentful web app
      accessToken: ContentfulManagementToken
    });
  }

  public async getSpaces(): Promise<Collection<Space>> {
    return this.client.getSpaces();
  }

  public async getEnvironments(spaceId: string): Promise<string[]> {
    const space = await this.client.getSpace(spaceId);
    const environments = await space.getEnvironments();
    return environments.items.map(item => item.name);
  }

  public async getEnvironmentEntries(
    spaceId: string,
    environmentId: string
  ): Promise<any> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment(environmentId);
    const entries = await environment.getEntries({
      content_type: "guideContainer",
      "fields.contentfulDisplayName[match]": "testContainer"
    });
    return entries;
  }

  public async getContentTypes(spaceId: string): Promise<any> {
    const space = await this.client.getSpace(spaceId);
    const entries = await space.getContentTypes();
    return entries.items;
  }

  public async getEntry(
    spaceId: string,
    entryId: string,
    body: { environmentId: string }
  ): Promise<any> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment(body.environmentId);
    const entry = await environment.getEntry(entryId);
    return entry;
  }
}
