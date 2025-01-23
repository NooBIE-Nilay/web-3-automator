import React from 'react';
import { OnChainParams } from '../../../types/workflow';

interface Props {
  params: OnChainParams;
  onChange: (params: OnChainParams) => void;
}

export default function OnChainConfig({ params, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Network
        </label>
        <select
          value={params.network}
          onChange={(e) => onChange({ ...params, network: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum</option>
          <option value="optimism">Optimism</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contract Address
        </label>
        <input
          type="text"
          value={params.contract}
          onChange={(e) => onChange({ ...params, contract: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="0x..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Name
        </label>
        <input
          type="text"
          value={params.event}
          onChange={(e) => onChange({ ...params, event: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Transfer"
        />
      </div>
    </div>
  );
}