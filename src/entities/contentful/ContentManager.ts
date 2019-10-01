import { ClientAPI, createClient } from 'contentful-management';
import { Collection } from 'contentful-management/typings/collection';
import { ContentType } from 'contentful-management/typings/contentType';
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
      accessToken: ContentfulManagementToken,
    });
  }

  /**
   * @description Function used to get the available space objects from contentful
   * * SDK Docs https://contentful.github.io/contentful-management.js/contentful-management/5.11.2/ContentfulClientAPI.html#.getSpaces
   * * API Docs https://www.contentful.com/developers/docs/references/content-management-api/#/reference/spaces/spaces-collection/get-all-spaces-an-account-has-access-to/console/js
   * @returns Returns a collection of Space to do whatever you need to.
   */
  public async getSpaces(): Promise<Collection<Space>> {
    return this.client.getSpaces();
  }

  /**
   * @description Returns a list of environment names for right now.
   * * API Docs https://www.contentful.com/developers/docs/references/content-management-api/#/reference/environments/environment-collection/get-all-environments-of-a-space/console/js
   * * SDK Docs https://contentful.github.io/contentful-management.js/contentful-management/5.11.2/ContentfulSpaceAPI.html#.getEnvironments
   * @param spaceId The spaceId to get environments from
   * @returns List that could contain ['prod', 'master', 'waffles']
   */
  public async getEnvironments(spaceId: string): Promise<string[]> {
    const space = await this.client.getSpace(spaceId);
    const environments = await space.getEnvironments();
    return environments.items.map((item) => item.name);
  }

  /**
   * @description Read here for more information
   * * Calling the API https://contentful.github.io/contentful-management.js/contentful-management/5.11.2/ContentfulEnvironmentAPI.html#.getEntries
   * * API Docs https://www.contentful.com/developers/docs/references/content-management-api/#/reference/entries/entries-collection/get-all-entries-of-a-space/console/js
   * @param spaceId The spaceId to use
   * @param environmentId The environment you wish to use (e.g. prod, master)
   * @param request An object full of query options for your data.
   */
  public async getEnvironmentEntries(
    spaceId: string,
    environmentId: string,
    request: QueryOptions
  ): Promise<Collection<Entry>> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment(environmentId);
    const entries = await environment.getEntries(request);
    return entries;
  }

  /**
   * @description Read here for more information
   * * API Docs https://www.contentful.com/developers/docs/references/content-management-api/#/reference/content-types/content-type-collection/get-all-content-types-of-a-space/console/js
   * * SDK Docs https://contentful.github.io/contentful-management.js/contentful-management/5.11.2/ContentfulEnvironmentAPI.html#.getContentTypes
   * @param spaceId The spaceId to get the content for
   */
  public async getContentTypes(spaceId: string): Promise<ContentType[]> {
    const space = await this.client.getSpace(spaceId);
    const entries = await space.getContentTypes();
    return entries.items;
  }

  /**
   * @description Read here for more information on the returned entry
   * * API Docs https://www.contentful.com/developers/docs/references/content-management-api/#/reference/entries/entry/get-a-single-entry/console/js
   * * SDK Docs https://contentful.github.io/contentful-management.js/contentful-management/5.11.2/ContentfulEnvironmentAPI.html#.getEntry
   * @param spaceId The spaceId to use to query for the given content
   * @param entryId The id of the content. Find this from app.contentful.com or by `sys.id` on a previous entry request
   * @param request Currently just has the environmentId on it.
   */
  public async getEntry(
    spaceId: string,
    entryId: string,
    request: EnvironmentIdPayload
  ): Promise<any> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment(request.environmentId);
    const entry = await environment.getEntry(entryId);
    return entry;
  }

  /**
   * @description Currently used to take an entry and replace and ID with another to change the reference for a given
   * * API Docs https://www.contentful.com/developers/docs/references/content-management-api/#/reference/entries/entry/create-update-an-entry/console/js
   * * SDK Docs https://contentful.github.io/contentful-management.js/contentful-management/5.11.2/Entry.html#.update
   * @param spaceId The spaceId to use for the update
   * @param entryId The id of the entry to update
   * @param requestBody Object containing different things to loop over to get the environmentId and a map to switch content for.
   */
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

  /**
   * @description Method to create an entry with the given field values
   * * API Docs https://www.contentful.com/developers/docs/references/content-management-api/#/reference/entries/entry/create-update-an-entry/console/js
   * * SDK Docs https://contentful.github.io/contentful-management.js/contentful-management/5.11.2/ContentfulEnvironmentAPI.html#.createEntry
   * @param spaceId The spaceId to use for the creation
   * @param contentTypeId The type of content you wish to create
   * @param payload Object which has the fields payload in it as well as the environmentId
   * @returns Check the API Docs for the return, it's the new entry.
   */
  public async createEntry(
    spaceId: string,
    contentTypeId: string,
    payload: CreateEntryPayload
  ): Promise<Entry> {
    const space = await this.client.getSpace(spaceId);
    const environment = await space.getEnvironment(payload.environmentId);
    const result = await environment.createEntry(contentTypeId, {
      fields: payload.fields,
    });
    return result;
  }
}
