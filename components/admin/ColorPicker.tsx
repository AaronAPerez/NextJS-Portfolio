/**
 * ColorPicker Component
 *
 * A gradient color picker for selecting brand colors for projects.
 * Uses react-colorful for the color picker UI.
 */

'use client';

import { useState, useCallback, memo } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

/**
 * Single color picker with preview and hex input
 */
const SingleColorPicker = memo(function SingleColorPicker({
  label,
  color,
  onChange,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {/* Color preview button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm hover:border-gray-400 transition-colors"
          style={{ backgroundColor: color }}
          aria-label={`Select ${label.toLowerCase()} color`}
        />
        {/* Hex input */}
        <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1 border border-gray-200">
          <span className="text-gray-400 text-sm">#</span>
          <HexColorInput
            color={color}
            onChange={onChange}
            className="w-20 bg-transparent text-sm font-mono focus:outline-none"
            prefixed={false}
          />
        </div>
      </div>

      {/* Color picker dropdown */}
      {isOpen && (
        <>
          {/* Backdrop to close picker */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Picker popup */}
          <div className="absolute z-50 top-full left-0 mt-2 p-3 bg-white rounded-lg shadow-xl border border-gray-200">
            <HexColorPicker color={color} onChange={onChange} />
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

interface GradientPickerProps {
  fromColor: string;
  toColor: string;
  onFromChange: (color: string) => void;
  onToChange: (color: string) => void;
}

/**
 * GradientPicker - Dual color picker for gradient selection
 *
 * Provides two color pickers (from/to) with a live gradient preview bar.
 */
export function GradientPicker({
  fromColor,
  toColor,
  onFromChange,
  onToChange,
}: GradientPickerProps) {
  return (
    <div className="space-y-4">
      {/* Gradient Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gradient Preview
        </label>
        <div
          className="h-8 rounded-lg shadow-inner border border-gray-200"
          style={{
            background: `linear-gradient(to right, ${fromColor}, ${toColor})`,
          }}
        />
      </div>

      {/* Color Pickers */}
      <div className="grid grid-cols-2 gap-4">
        <SingleColorPicker
          label="From Color"
          color={fromColor}
          onChange={onFromChange}
        />
        <SingleColorPicker
          label="To Color"
          color={toColor}
          onChange={onToChange}
        />
      </div>

      {/* Preset Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preset Combinations
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { from: '#FD5A1E', to: '#A5ACAF', name: 'Orange/Silver' },
            { from: '#bf9b30', to: '#d4af37', name: 'Gold' },
            { from: '#F59E0B', to: '#15803D', name: 'Amber/Green' },
            { from: '#3B82F6', to: '#8B5CF6', name: 'Blue/Purple' },
            { from: '#EC4899', to: '#F97316', name: 'Pink/Orange' },
            { from: '#10B981', to: '#06B6D4', name: 'Green/Cyan' },
          ].map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                onFromChange(preset.from);
                onToChange(preset.to);
              }}
              className="group relative w-12 h-6 rounded overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors"
              style={{
                background: `linear-gradient(to right, ${preset.from}, ${preset.to})`,
              }}
              title={preset.name}
            >
              <span className="sr-only">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleColorPicker;
