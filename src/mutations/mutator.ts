import { ContentfulExport } from './generated.interface';

export const removeTopLevelId = (
  exportedData: ContentfulExport
): ContentfulExport => {
  if (exportedData.entries) {
    exportedData.entries = exportedData.entries.map((entry) => {
      /*********
       * * By removing this top level Id it will create a new entry
       * ! IMPORTANT NOTE: All content will still be linked.
       ********/
      entry.sys.id = null;
      return entry;
    });
  }
  return exportedData;
};
