import { ContentfulExport } from "./generated.interface";

export const removeTopLevelId = (
  exportedData: ContentfulExport
): ContentfulExport => {
  if (exportedData.entries) {
    exportedData.entries = exportedData.entries.map(entry => {
      (entry.sys as any).id = null;
      return entry;
    });
  }
  return exportedData;
};
