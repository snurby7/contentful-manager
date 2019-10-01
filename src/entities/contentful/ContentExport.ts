import { ContentfulExport } from 'src/mutations';
import { ContentfulManagementToken } from '../../../keys';

/**
 * @description Wrapper around https://github.com/contentful/contentful-export
 */
export class ContentExport {
  /**
   * @description See the link above about what is expected
   * @param query
   * @returns
   */
  public async exportDataByQuery(query: any): Promise<ContentfulExport> {
    const contentfulExport = require('contentful-export');
    console.log(contentfulExport);

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
