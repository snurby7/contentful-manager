import { ContentfulManagementToken } from '../../../keys';
import { ContentfulImport } from '../contracts';

const contentfulImport = require('contentful-import');

export class ContentImport {
  /**
   * @description Import content into contentful
   * https://github.com/contentful/contentful-import#gear-configuration-options
   * @param importRequest The request payload to send to contentful to import
   * @returns
   */
  public async importData(importRequest: ContentfulImport) {
    const result = await contentfulImport({
      ...this.getBaseQuery(),
      ...importRequest,
    });
    return result;
  }

  /**
   * @description Base query to always provide the token and override the default for environmentId
   */
  private getBaseQuery(): Partial<ContentfulImport> {
    return {
      environmentId: 'prod',
      managementToken: ContentfulManagementToken,
    };
  }
}
