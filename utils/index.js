const { Calculator } = require('./calculator');
const { formatNumber, isValidNumber } = require('../utils/helpers');

/**
 * Main application entry point
 */
function main() {
  console.log('=== Demo Calculator ===');
  
  const calc = new Calculator();
  
  try {
    // Demonstrate basic operations
    console.log('Basic Operations:');
    console.log(`Add: ${formatNumber(calc.add(10, 5))}`);
    console.log(`Subtract: ${formatNumber(calc.subtract(10, 3))}`);
    console.log(`Multiply: ${formatNumber(calc.multiply(4, 7))}`);
    console.log(`Divide: ${formatNumber(calc.divide(15, 3))}`);
    
    // Show history
    console.log('\nCalculation History:');
    calc.getHistory().forEach((operation, index) => {
      console.log(`${index + 1}. ${operation}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Export for testing
module.exports = { main };

// Run if this is the main module
if (require.main === module) {
  main();
} 