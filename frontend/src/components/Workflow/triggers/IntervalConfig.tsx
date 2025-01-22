import React from 'react';
import { IntervalParams } from '../../../types/workflow';

interface Props {
  params: IntervalParams;
  onChange: (params: IntervalParams) => void;
}

export default function IntervalConfig({ params, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Interval
        </label>
        <select
          value={params.interval}
          onChange={(e) => onChange({ interval: e.target.value as IntervalParams['interval'] })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="10s">10 seconds</option>
          <option value="30s">30 seconds</option>
          <option value="60s">60 seconds</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">
          The workflow will run repeatedly at this fixed time interval
        </p>
      </div>
    </div>
  );
}