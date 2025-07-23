/**
 * Utility functions for the calculator application
 */

/**
 * Format a number for display
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num) {
  if (!isValidNumber(num)) {
    return 'Invalid';
  }
  
  // Round to 2 decimal places if needed
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}

/**
 * Check if a value is a valid number
 * @param {any} value - Value to check
 * @returns {boolean} True if valid number
 */
function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Calculate percentage
 * @param {number} value - The value
 * @param {number} total - The total
 * @returns {number} Percentage
 */
function calculatePercentage(value, total) {
  if (!isValidNumber(value) || !isValidNumber(total) || total === 0) {
    throw new Error('Invalid inputs for percentage calculation');
  }
  return (value / total) * 100;
}

/**
 * Round number to specified decimal places
 * @param {number} num - Number to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded number
 */
function roundToDecimals(num, decimals = 2) {
  if (!isValidNumber(num) || !isValidNumber(decimals)) {
    throw new Error('Invalid inputs for rounding');
  }
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

module.exports = {
  formatNumber,
  isValidNumber,
  calculatePercentage,
  roundToDecimals
}; 