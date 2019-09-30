import { EnvironmentIdPayload } from './environment-id.interface';

export interface UpdateEntryPayload extends EnvironmentIdPayload {
  idMap: Record<string, string>;
}