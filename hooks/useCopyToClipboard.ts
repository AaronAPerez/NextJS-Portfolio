/**
 * useCopyToClipboard Hook
 *
 * A reusable hook for copying text to clipboard with visual feedback.
 * Handles the clipboard API and provides a "copied" state that automatically resets.
 *
 * @example
 * const { copied, copyToClipboard } = useCopyToClipboard();
 *
 * return (
 *   <button onClick={() => copyToClipboard('text to copy')}>
 *     {copied ? 'Copied!' : 'Copy'}
 *   </button>
 * );
 */

import { useState, useCallback } from 'react';

// =============================================================================
// Types
// =============================================================================

interface UseCopyToClipboardOptions {
  /** Duration in milliseconds before "copied" state resets (default: 2000) */
  resetDelay?: number;
  /** Callback function when copy succeeds */
  onSuccess?: (value: string) => void;
  /** Callback function when copy fails */
  onError?: (error: Error) => void;
}

interface UseCopyToClipboardReturn {
  /** Whether the copy was recently successful */
  copied: boolean;
  /** Function to copy text to clipboard */
  copyToClipboard: (value: string) => Promise<boolean>;
  /** Function to reset the copied state manually */
  reset: () => void;
}

// =============================================================================
// Hook Implementation
// =============================================================================

export const useCopyToClipboard = (
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn => {
  const {
    resetDelay = 2000,
    onSuccess,
    onError
  } = options;

  const [copied, setCopied] = useState(false);

  /**
   * Copies the provided value to clipboard
   * Returns true if successful, false otherwise
   */
  const copyToClipboard = useCallback(async (value: string): Promise<boolean> => {
    // Check if clipboard API is available
    if (!navigator?.clipboard) {
      console.error('Clipboard API not available');
      onError?.(new Error('Clipboard API not available'));
      return false;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onSuccess?.(value);

      // Reset copied state after delay
      setTimeout(() => {
        setCopied(false);
      }, resetDelay);

      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      onError?.(error instanceof Error ? error : new Error('Failed to copy'));
      setCopied(false);
      return false;
    }
  }, [resetDelay, onSuccess, onError]);

  /**
   * Manually reset the copied state
   */
  const reset = useCallback(() => {
    setCopied(false);
  }, []);

  return {
    copied,
    copyToClipboard,
    reset
  };
};

export default useCopyToClipboard;
