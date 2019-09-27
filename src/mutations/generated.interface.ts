// This was generated from the response of the export
export interface ContentfulExport {
  entries?: EntriesEntity[] | null;
  assets?: (null)[] | null;
}
export interface EntriesEntity {
  sys: Sys;
  fields: Fields;
}
export interface Sys {
  space: SpaceOrEnvironmentOrCreatedByOrUpdatedByOrPublishedByOrContentTypeOrEnUSOrEnUSEntity;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: SpaceOrEnvironmentOrCreatedByOrUpdatedByOrPublishedByOrContentTypeOrEnUSOrEnUSEntity;
  publishedVersion: number;
  publishedAt: string;
  firstPublishedAt: string;
  createdBy: SpaceOrEnvironmentOrCreatedByOrUpdatedByOrPublishedByOrContentTypeOrEnUSOrEnUSEntity;
  updatedBy: SpaceOrEnvironmentOrCreatedByOrUpdatedByOrPublishedByOrContentTypeOrEnUSOrEnUSEntity;
  publishedCounter: number;
  version: number;
  publishedBy: SpaceOrEnvironmentOrCreatedByOrUpdatedByOrPublishedByOrContentTypeOrEnUSOrEnUSEntity;
  contentType: SpaceOrEnvironmentOrCreatedByOrUpdatedByOrPublishedByOrContentTypeOrEnUSOrEnUSEntity;
}
export interface SpaceOrEnvironmentOrCreatedByOrUpdatedByOrPublishedByOrContentTypeOrEnUSOrEnUSEntity {
  sys: Sys1;
}
export interface Sys1 {
  type: string;
  linkType: string;
  id: string;
}
export interface Fields {
  name: Name;
  tag: Tag;
  steps: Steps;
}
export interface Name {
  enUS: string;
}
export interface Tag {
  enUS: SpaceOrEnvironmentOrCreatedByOrUpdatedByOrPublishedByOrContentTypeOrEnUSOrEnUSEntity;
}
export interface Steps {
  enUS?:
    | (SpaceOrEnvironmentOrCreatedByOrUpdatedByOrPublishedByOrContentTypeOrEnUSOrEnUSEntity)[]
    | null;
}
