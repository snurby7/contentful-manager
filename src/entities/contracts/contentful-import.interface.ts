export interface ContentfulImportContentStructure {
  contentTypes: any[];
  entries: any[];
  assets: any[];
  locales: any[];
  webhooks: any[];
  roles: any[];
  editorInterfaces: any[];
}

export interface ContentfulImport {
  /**
   * @description ID of the space to import into
   */
  spaceId: string;
  /**
   * @description ID of the environment in the destination space
   *  * Default: 'master'
   */
  environmentId: string;
  /**
   * @description Contentful management API token for the space to be imported to
   */
  managementToken: string;
  /**
   * @description Path to JSON file that contains data to be import to your space
   */
  contentFile: string;
  /**
   * @description Content to import. Needs to match the expected structure.
   */
  content: ContentfulImportContentStructure;
}
