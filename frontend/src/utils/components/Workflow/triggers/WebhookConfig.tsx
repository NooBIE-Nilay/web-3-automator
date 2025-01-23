import React from 'react';
import { WebhookParams } from '../../../types/workflow';

interface Props {
  params: WebhookParams;
  onChange: (params: WebhookParams) => void;
}

export default function WebhookConfig({ params, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          HTTP Method
        </label>
        <select
          value={params.method}
          onChange={(e) => onChange({ ...params, method: e.target.value as WebhookParams['method'] })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Path
        </label>
        <input
          type="text"
          value={params.path}
          onChange={(e) => onChange({ ...params, path: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="/webhook/my-trigger"
        />
      </div>
    </div>
  );
}