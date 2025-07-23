const { Calculator } = require('../src/calculator');
const { formatNumber, isValidNumber } = require('../utils/helpers');

/**
 * Simple test runner
 */
function runTests() {
  let passed = 0;
  let total = 0;
  
  function test(description, testFn) {
    total++;
    try {
      testFn();
      console.log(`✅ ${description}`);
      passed++;
    } catch (error) {
      console.log(`❌ ${description}: ${error.message}`);
    }
  }
  
  function assertEquals(actual, expected, message = '') {
    if (actual !== expected) {
      throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
    }
  }
  
  console.log('Running Calculator Tests...\n');
  
  // Calculator tests
  const calc = new Calculator();
  
  test('Calculator addition works', () => {
    assertEquals(calc.add(2, 3), 5);
  });
  
  test('Calculator subtraction works', () => {
    assertEquals(calc.subtract(10, 4), 6);
  });
  
  test('Calculator multiplication works', () => {
    assertEquals(calc.multiply(3, 4), 12);
  });
  
  test('Calculator division works', () => {
    assertEquals(calc.divide(15, 3), 5);
  });
  
  test('Calculator throws error on division by zero', () => {
    try {
      calc.divide(10, 0);
      throw new Error('Should have thrown division by zero error');
    } catch (error) {
      if (!error.message.includes('Division by zero')) {
        throw error;
      }
    }
  });
  
  test('Calculator history tracking works', () => {
    const newCalc = new Calculator();
    newCalc.add(1, 1);
    newCalc.multiply(2, 3);
    assertEquals(newCalc.getHistory().length, 2);
  });
  
  // Helper function tests
  test('formatNumber handles integers', () => {
    assertEquals(formatNumber(5), '5');
  });
  
  test('formatNumber handles decimals', () => {
    assertEquals(formatNumber(5.123), '5.12');
  });
  
  test('isValidNumber identifies valid numbers', () => {
    assertEquals(isValidNumber(5), true);
    assertEquals(isValidNumber(NaN), false);
    assertEquals(isValidNumber('5'), false);
  });
  
  console.log(`\nTest Results: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('❌ Some tests failed.');
    process.exit(1);
  }
}

// Export for external testing
module.exports = { runTests };

// Run tests if this is the main module
if (require.main === module) {
  runTests();
} 