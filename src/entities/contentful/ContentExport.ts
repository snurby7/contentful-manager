import { ContentfulExport } from 'src/mutations';
import { ContentfulManagementToken } from '../../../keys';

const contentfulExport = require('contentful-export');

export class ContentExport {
  public async exportDataByQuery(query: any): Promise<ContentfulExport> {
    const result = await contentfulExport({
      ...this.getBaseQuery(),
      ...query,
    });
    return result;
  }

  /**
   * @description Just a base query anything in here can be overridden.
   *  https://github.com/contentful/contentful-export#gear-configuration-options
   */
  private getBaseQuery() {
    return {
      environmentId: 'prod',
      managementToken: ContentfulManagementToken,
    };
  }
}
