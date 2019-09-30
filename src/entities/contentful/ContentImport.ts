import { ContentfulManagementToken } from "../../../keys";

const contentfulImport = require("contentful-import");

export class ContentImport {
  constructor() {}

  /**
   * @description Import content into contentful
   * https://github.com/contentful/contentful-import#gear-configuration-options
   * @param {*} query
   * @returns
   * @memberof ContentImport
   */
  public async importData(query: any) {
    const result = await contentfulImport({
      ...this.getBaseQuery(),
      ...query
    });
    return result;
  }

  private getBaseQuery() {
    return {
      environmentId: "prod",
      managementToken: ContentfulManagementToken
    };
  }
}
