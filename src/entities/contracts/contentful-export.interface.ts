import { EnvironmentIdPayload } from './environment-id.interface';

export interface ContentfulExportRequest extends EnvironmentIdPayload {
  spaceId: string;
  queryAssets: string[];
  queryEntries: string[];
}
