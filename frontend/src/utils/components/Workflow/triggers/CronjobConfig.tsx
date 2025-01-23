import React from 'react';
import { CronjobParams } from '../../../types/workflow';

interface Props {
  params: CronjobParams;
  onChange: (params: CronjobParams) => void;
}

export default function CronjobConfig({ params, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Schedule (Cron Expression)
        </label>
        <input
          type="text"
          value={params.schedule}
          onChange={(e) => onChange({ ...params, schedule: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="*/5 * * * *"
        />
        <p className="mt-1 text-sm text-gray-500">Example: */5 * * * * (every 5 minutes)</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Timezone
        </label>
        <input
          type="text"
          value={params.timezone}
          onChange={(e) => onChange({ ...params, timezone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="UTC"
        />
      </div>
    </div>
  );
}