import { ClientAPI, createClient } from 'contentful-management';
import { Collection } from 'contentful-management/typings/collection';
import { Entry } from 'contentful-management/typings/entry';
import { QueryOptions } from 'contentful-management/typings/queryOptions';
import { Space } from 'contentful-management/typings/space';
import { ContentfulManagementToken } from '../../../keys';
import {
  CreateEntryPayload,
  EnvironmentIdPayload,
  UpdateEntryPayload,
} from '../contracts';

export class ContentManager {
  private client: ClientAPI;

  constructor() {
    this.client = createClient({
      // This is the access token for this space. Normally you get the token   Cin the Contentful web app
      accessToken: ContentfulManagementToken,
    });
  }

  public async getSpaces(): Promise<Collection<Space>> {
    return this.client.getSpaces();
  }

  public async getEnvironments(spaceId: string): Promise<string[]> {
    const space = await this.client.getSpace(spaceId);
    const environments = await space.getEnvironments();
    return environments.items.map((item) => item.name);
  }

  public async getEnvironmentEntries(
    spaceId: string,
    environmentId: string,
    request: QueryOptions
  ): Promise<any> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment(environmentId);
    const entries = await environment.getEntries(request);
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
    body: EnvironmentIdPayload
  ): Promise<any> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment(body.environmentId);
    const entry = await environment.getEntry(entryId);
    return entry;
  }

  public async updateEntry(
    spaceId: string,
    entryId: string,
    requestBody: UpdateEntryPayload
  ): Promise<Entry> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment(requestBody.environmentId);
    const entry = await environment.getEntry(entryId);
    Object.keys(entry.fields).forEach((fieldTypeName) => {
      if (requestBody.idMap[fieldTypeName]) {
        entry.fields[fieldTypeName]['en-US'].sys.id =
          requestBody.idMap[fieldTypeName];
      }
    });
    const updatedEntry = await entry.update();
    return updatedEntry;
  }

  public async createEntry(
    spaceId: string,
    contentTypeId: string,
    payload: CreateEntryPayload
  ): Promise<any> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment(payload.environmentId);
    const result = await environment.createEntry(contentTypeId, {
      fields: payload.fields,
    });
    return result;
  }
}
