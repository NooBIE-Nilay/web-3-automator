export type TriggerType = 'cronjob' | 'webhook' | 'onchain';

export interface TriggerConfig {
  type: TriggerType;
  params: CronjobParams | WebhookParams | OnChainParams;
}

export interface CronjobParams {
  schedule: string;
  timezone: string;
}

export interface WebhookParams {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  headers?: Record<string, string>;
}

export interface OnChainParams {
  network: string;
  contract: string;
  event: string;
}