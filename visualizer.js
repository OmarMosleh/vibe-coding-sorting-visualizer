// ===================================
// Visualizer - The Animation Director!
// ===================================

/**
 * The Visualizer class handles all the visual magic
 * Creating bars, updating colors, making things pretty!
 */
class Visualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.bars = [];  // References to all bar elements
        this.array = []; // The actual data
    }

    /**
     * Creates bars from an array of values
     * @param {Array<number>} array - The array to visualize
     */
    createBars(array) {
        // Clear out old bars (goodbye old friends!)
        this.container.innerHTML = '';
        this.array = [...array]; // Make a copy
        this.bars = [];

        // Create a bar for each value
        array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.classList.add('array-bar', 'default');
            bar.style.height = `${value * 3.5}px`; // Scale height so it looks good
            bar.setAttribute('data-value', value); // Store value for hover tooltip
            bar.setAttribute('data-index', index);
            
            this.container.appendChild(bar);
            this.bars.push(bar);
        });
    }

    /**
     * Updates a specific bar's height and value
     * @param {number} index - Which bar to update
     * @param {number} value - The new value
     */
    updateBar(index, value) {
        if (index >= 0 && index < this.bars.length) {
            this.bars[index].style.height = `${value * 3.5}px`;
            this.bars[index].setAttribute('data-value', value);
            this.array[index] = value;
        }
    }

    /**
     * Sets the color state of bars
     * @param {Array<number>} indices - Which bars to color
     * @param {string} state - The color state ('default', 'comparing', 'swapping', 'sorted')
     */
    setBarStates(indices, state) {
        // Remove old state from all bars if not specified
        if (!indices) {
            this.bars.forEach(bar => {
                bar.className = 'array-bar default';
            });
            return;
        }

        // Set new state for specified bars
        indices.forEach(index => {
            if (index >= 0 && index < this.bars.length) {
                this.bars[index].className = `array-bar ${state}`;
            }
        });
    }

    /**
     * Resets all bars to default state
     */
    resetColors() {
        this.bars.forEach(bar => {
            bar.className = 'array-bar default';
        });
    }

    /**
     * Marks bars as sorted (green!)
     * @param {Array<number>} indices - Which bars are sorted (if null, marks all)
     */
    markAsSorted(indices = null) {
        if (indices === null) {
            // Mark everything as sorted - we did it!
            this.bars.forEach(bar => {
                bar.className = 'array-bar sorted';
            });
        } else {
            // Mark specific bars as sorted
            indices.forEach(index => {
                if (index >= 0 && index < this.bars.length) {
                    this.bars[index].className = 'array-bar sorted';
                }
            });
        }
    }

    /**
     * Swaps two bars visually and in the array
     * @param {number} i - First index
     * @param {number} j - Second index
     */
    swap(i, j) {
        // Swap in the array
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        
        // Update both bars
        this.updateBar(i, this.array[i]);
        this.updateBar(j, this.array[j]);
    }

    /**
     * Gets the current array state
     * @returns {Array<number>} - Current array
     */
    getArray() {
        return [...this.array];
    }

    /**
     * Gets a specific value
     * @param {number} index - The index
     * @returns {number} - The value at that index
     */
    getValue(index) {
        return this.array[index];
    }

    /**
     * Sets a specific value (used by merge sort)
     * @param {number} index - The index
     * @param {number} value - The value to set
     */
    setValue(index, value) {
        this.updateBar(index, value);
    }

    /**
     * Gets the size of the array
     * @returns {number} - Array length
     */
    size() {
        return this.array.length;
    }

    /**
     * Highlights a range of bars (useful for merge sort)
     * @param {number} start - Start index
     * @param {number} end - End index
     * @param {string} state - Color state
     */
    highlightRange(start, end, state) {
        const indices = [];
        for (let i = start; i <= end; i++) {
            indices.push(i);
        }
        this.setBarStates(indices, state);
    }
}