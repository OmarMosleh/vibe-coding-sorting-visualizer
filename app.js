// ===================================
// Main Application - The Conductor!
// ===================================

/**
 * Application state - keeps track of everything
 */
const AppState = {
    visualizer: null,
    currentAlgorithm: 'bubble',
    arraySize: 50,
    speed: 50,
    isRunning: false,
    isPaused: false,
    sortingGenerator: null,
    stats: {
        comparisons: 0,
        swaps: 0,
        startTime: 0
    }
};

/**
 * Initialize the application - set everything up!
 */
function initApp() {
    // Create the visualizer
    AppState.visualizer = new Visualizer('array-container');
    
    // Generate and display initial array
    generateNewArray();
    
    // Set up all event listeners
    setupEventListeners();
    
    // Update UI with initial values
    updateComplexityDisplay();
    updateSpeedLabel();
    
    console.log('🎯 Sorting Visualizer ready to roll!');
}

/**
 * Set up all the button clicks and control changes
 */
function setupEventListeners() {
    // Algorithm selector
    document.getElementById('algorithm-select').addEventListener('change', (e) => {
        AppState.currentAlgorithm = e.target.value;
        updateComplexityDisplay();
        
        // Reset if we're not currently sorting
        if (!AppState.isRunning) {
            resetVisualization();
        }
    });
    
    // Array size slider
    const arraySizeSlider = document.getElementById('array-size');
    arraySizeSlider.addEventListener('input', (e) => {
        AppState.arraySize = parseInt(e.target.value);
        document.getElementById('array-size-value').textContent = AppState.arraySize;
        
        // Generate new array with new size
        if (!AppState.isRunning) {
            generateNewArray();
        }
    });
    
    // Speed slider
    const speedSlider = document.getElementById('speed-control');
    speedSlider.addEventListener('input', (e) => {
        AppState.speed = parseInt(e.target.value);
        updateSpeedLabel();
    });
    
    // Generate new array button
    document.getElementById('generate-btn').addEventListener('click', () => {
        if (!AppState.isRunning) {
            generateNewArray();
        }
    });
    
    // Start sorting button
    document.getElementById('sort-btn').addEventListener('click', () => {
        startSorting();
    });
    
    // Pause button
    document.getElementById('pause-btn').addEventListener('click', () => {
        togglePause();
    });
    
    // Reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
        resetVisualization();
    });
    
    // Keyboard shortcuts - because we're fancy like that!
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            if (AppState.isRunning) {
                togglePause();
            } else {
                startSorting();
            }
        } else if (e.code === 'KeyR') {
            resetVisualization();
        }
    });
}

/**
 * Generate a fresh random array
 */
function generateNewArray() {
    const array = generateRandomArray(AppState.arraySize);
    AppState.visualizer.createBars(array);
    resetStats();
    updateStatusDisplay('Ready');
}

/**
 * Start the sorting animation!
 */
async function startSorting() {
    // Don't start if already running
    if (AppState.isRunning && !AppState.isPaused) return;
    
    // If paused, just resume
    if (AppState.isPaused) {
        AppState.isPaused = false;
        updateUIForRunning();
        await continueSorting();
        return;
    }
    
    // Start fresh
    AppState.isRunning = true;
    AppState.isPaused = false;
    resetStats();
    AppState.stats.startTime = Date.now();
    
    // Get the algorithm function
    const algorithmFunc = getAlgorithm(AppState.currentAlgorithm);
    AppState.sortingGenerator = algorithmFunc(AppState.visualizer, AppState.stats);
    
    // Update UI
    updateUIForRunning();
    updateStatusDisplay('Sorting...');
    
    // Run the sorting animation
    await continueSorting();
}

/**
 * Continue sorting from current state (handles pause/resume)
 */
async function continueSorting() {
    const delay = calculateDelay(AppState.speed);
    
    // Process each step from the generator
    while (AppState.isRunning && !AppState.isPaused) {
        const result = AppState.sortingGenerator.next();
        
        // Update statistics display
        updateStatsDisplay();
        
        if (result.done) {
            // Sorting complete!
            completeSorting();
            break;
        }
        
        // Wait before next step (this creates the animation effect)
        await sleep(delay);
    }
    
    // If paused, update UI
    if (AppState.isPaused) {
        updateUIForPaused();
    }
}

/**
 * Toggle pause/resume
 */
function togglePause() {
    if (!AppState.isRunning) return;
    
    AppState.isPaused = !AppState.isPaused;
    
    if (AppState.isPaused) {
        updateUIForPaused();
        updateStatusDisplay('Paused');
    } else {
        updateUIForRunning();
        updateStatusDisplay('Sorting...');
        continueSorting();
    }
}

/**
 * Called when sorting is complete
 */
function completeSorting() {
    AppState.isRunning = false;
    AppState.isPaused = false;
    
    // Make all bars green - victory!
    AppState.visualizer.markAsSorted(null);
    
    // Update UI
    updateUIForComplete();
    updateStatusDisplay('Sorted! ✓');
    updateStatsDisplay();
    
    console.log('✨ Sorting complete!', AppState.stats);
}

/**
 * Reset the visualization
 */
function resetVisualization() {
    // Stop any running sort
    AppState.isRunning = false;
    AppState.isPaused = false;
    AppState.sortingGenerator = null;
    
    // Reset colors
    AppState.visualizer.resetColors();
    
    // Reset stats
    resetStats();
    
    // Update UI
    updateUIForReset();
    updateStatusDisplay('Ready');
}

/**
 * Reset statistics
 */
function resetStats() {
    AppState.stats.comparisons = 0;
    AppState.stats.swaps = 0;
    AppState.stats.startTime = 0;
    updateStatsDisplay();
}

/**
 * Update the complexity display panel
 */
function updateComplexityDisplay() {
    const info = getComplexityInfo(AppState.currentAlgorithm);
    
    document.getElementById('algorithm-name').textContent = info.name;
    document.getElementById('time-best').textContent = info.timeBest;
    document.getElementById('time-avg').textContent = info.timeAverage;
    document.getElementById('time-worst').textContent = info.timeWorst;
    document.getElementById('space-complexity').textContent = info.space;
}

/**
 * Update the statistics display
 */
function updateStatsDisplay() {
    document.getElementById('comparisons').textContent = AppState.stats.comparisons;
    document.getElementById('swaps').textContent = AppState.stats.swaps;
    
    // Calculate elapsed time
    if (AppState.stats.startTime > 0) {
        const elapsed = Date.now() - AppState.stats.startTime;
        document.getElementById('time-elapsed').textContent = formatTime(elapsed);
    }
}

/**
 * Update status display
 */
function updateStatusDisplay(status) {
    document.getElementById('status').textContent = status;
}

/**
 * Update speed label
 */
function updateSpeedLabel() {
    const label = getSpeedLabel(AppState.speed);
    document.getElementById('speed-value').textContent = label;
}

/**
 * UI update functions - manage button states
 */
function updateUIForRunning() {
    document.getElementById('sort-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;
    document.getElementById('pause-btn').textContent = 'Pause';
    document.getElementById('reset-btn').disabled = false;
    document.getElementById('generate-btn').disabled = true;
    document.getElementById('algorithm-select').disabled = true;
    document.getElementById('array-size').disabled = true;
}

function updateUIForPaused() {
    document.getElementById('pause-btn').textContent = 'Resume';
}

function updateUIForComplete() {
    document.getElementById('sort-btn').disabled = true;
    document.getElementById('pause-btn').disabled = true;
    document.getElementById('reset-btn').disabled = false;
    document.getElementById('generate-btn').disabled = false;
    document.getElementById('algorithm-select').disabled = false;
    document.getElementById('array-size').disabled = false;
}

function updateUIForReset() {
    document.getElementById('sort-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
    document.getElementById('pause-btn').textContent = 'Pause';
    document.getElementById('reset-btn').disabled = true;
    document.getElementById('generate-btn').disabled = false;
    document.getElementById('algorithm-select').disabled = false;
    document.getElementById('array-size').disabled = false;
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initApp);