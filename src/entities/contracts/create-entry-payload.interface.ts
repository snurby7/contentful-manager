import { EnvironmentIdPayload } from './environment-id.interface';

export interface CreateEntryPayload extends EnvironmentIdPayload {
  fields: Record<string, any>;
}