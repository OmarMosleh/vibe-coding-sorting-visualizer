// ===================================
// Utility Functions - The Swiss Army Knife!
// ===================================

/**
 * Generates a random array of numbers
 * @param {number} size - How many numbers we want
 * @returns {Array<number>} - A fresh array of random numbers
 */
function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        // Generate values between 5 and 100 so bars look nice
        array.push(Math.floor(Math.random() * 95) + 5);
    }
    return array;
}

/**
 * Shuffles an array (Fisher-Yates algorithm - fancy name, simple idea!)
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The same array, but shuffled
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap like a boss
    }
    return array;
}

/**
 * Sleep function - gives us time to see what's happening
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} - A promise that resolves after the delay
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Converts slider value to actual delay in milliseconds
 * Higher speed value = lower delay (faster animation)
 * @param {number} speedValue - Value from speed slider (1-100)
 * @returns {number} - Delay in milliseconds
 */
function calculateDelay(speedValue) {
    // Inverse relationship: speed 1 = 500ms, speed 100 = 1ms
    // Using exponential scale for better feel
    return Math.floor(500 / speedValue);
}

/**
 * Gets a speed label for display
 * @param {number} speedValue - Value from speed slider (1-100)
 * @returns {string} - Human-readable speed label
 */
function getSpeedLabel(speedValue) {
    if (speedValue < 25) return 'Slow';
    if (speedValue < 50) return 'Medium';
    if (speedValue < 75) return 'Fast';
    return 'Lightning ⚡';
}

/**
 * Formats time in a nice readable way
 * @param {number} ms - Milliseconds
 * @returns {string} - Formatted time string
 */
function formatTime(ms) {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Clamps a value between min and max
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {number} - Clamped value
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}