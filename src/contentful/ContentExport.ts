import { ContentfulManagementToken } from "../../keys";
import { ContentfulExport } from "../mutations";

const contentfulExport = require("contentful-export");

export class ContentExport {
  constructor() {}

  public async exportDataByQuery(query: any): Promise<ContentfulExport> {
    const result = await contentfulExport({
      ...this.getBaseQuery(),
      ...query
    });
    return result;
  }

  /**
   * @description Just a base query anything in here can be overridden.
   *  https://github.com/contentful/contentful-export#gear-configuration-options
   */
  private getBaseQuery() {
    return {
      environmentId: "prod",
      managementToken: ContentfulManagementToken
    };
  }
}
