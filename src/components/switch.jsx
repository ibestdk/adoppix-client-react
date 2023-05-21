import React from 'react';

const Switch = ({ checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`${
          checked ? 'bg-blue-500' : 'bg-gray-200'
        } w-12 h-6 rounded-full transition-colors`}
      >
        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </span>
      <span className="text-sm font-medium text-gray-700">
      </span>
    </label>
  );
};

export default Switch;