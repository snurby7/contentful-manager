import { createClient, ClientAPI } from "contentful-management";
import { ContentfulAccessToken, ContentfulSpaceId } from "../../keys";
import { Collection } from "contentful-management/typings/collection";
import { Space } from "contentful-management/typings/space";

export class ContentManager {
  private client: ClientAPI;

  constructor() {
    this.client = createClient({
      // This is the access token for this space. Normally you get the token in the Contentful web app
      accessToken: ContentfulAccessToken
    });
  }

  public async getSpaces(): Promise<Collection<Space>> {
    return this.client.getSpaces();
  }

  public async getEntriesForSpace(spaceId: string): Promise<any> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment("master");
    const entries = await environment.getEntries();
    console.log(entries);
    return entries;
  }
}
