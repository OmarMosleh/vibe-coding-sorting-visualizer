// ===================================
// Sorting Algorithms - The Stars of the Show!
// ===================================

/**
 * All algorithms are generator functions (function*)
 * They yield control back after each step so we can animate
 * Think of yield as saying "pause here and show what we just did!"
 */

/**
 * Bubble Sort - The simple one!
 * Repeatedly compares adjacent elements and swaps if needed
 * @generator
 * @param {Visualizer} visualizer - Our rendering engine
 * @param {Object} stats - Statistics tracker
 * @yields {Object} - Step information for animation
 */
function* bubbleSort(visualizer, stats) {
    const n = visualizer.size();
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Highlight the bars we're comparing
            visualizer.setBarStates([j, j + 1], 'comparing');
            stats.comparisons++;
            
            yield { comparing: [j, j + 1] };
            
            // If left is bigger than right, swap them!
            if (visualizer.getValue(j) > visualizer.getValue(j + 1)) {
                visualizer.setBarStates([j, j + 1], 'swapping');
                stats.swaps++;
                
                yield { swapping: [j, j + 1] };
                
                visualizer.swap(j, j + 1);
                
                yield { swapped: [j, j + 1] };
            }
            
            // Reset to default color
            visualizer.setBarStates([j, j + 1], 'default');
        }
        
        // After each pass, the largest element is in its final position
        visualizer.markAsSorted([n - i - 1]);
    }
    
    // Don't forget the first element!
    visualizer.markAsSorted([0]);
}

/**
 * Selection Sort - Find the smallest, put it first!
 * @generator
 * @param {Visualizer} visualizer
 * @param {Object} stats
 * @yields {Object}
 */
function* selectionSort(visualizer, stats) {
    const n = visualizer.size();
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find the minimum element in the remaining unsorted part
        for (let j = i + 1; j < n; j++) {
            visualizer.setBarStates([j, minIndex], 'comparing');
            stats.comparisons++;
            
            yield { comparing: [j, minIndex] };
            
            if (visualizer.getValue(j) < visualizer.getValue(minIndex)) {
                // Found a new minimum!
                visualizer.setBarStates([minIndex], 'default');
                minIndex = j;
            }
            
            visualizer.setBarStates([j], 'default');
        }
        
        // Swap the minimum with the first element
        if (minIndex !== i) {
            visualizer.setBarStates([i, minIndex], 'swapping');
            stats.swaps++;
            
            yield { swapping: [i, minIndex] };
            
            visualizer.swap(i, minIndex);
        }
        
        // Mark this position as sorted
        visualizer.markAsSorted([i]);
        yield { sorted: [i] };
    }
    
    // Last element is automatically sorted
    visualizer.markAsSorted([n - 1]);
}

/**
 * Insertion Sort - Build sorted array one item at a time
 * Like sorting a hand of playing cards!
 * @generator
 * @param {Visualizer} visualizer
 * @param {Object} stats
 * @yields {Object}
 */
function* insertionSort(visualizer, stats) {
    const n = visualizer.size();
    
    // First element is "sorted" by default
    visualizer.markAsSorted([0]);
    
    for (let i = 1; i < n; i++) {
        const key = visualizer.getValue(i);
        let j = i - 1;
        
        visualizer.setBarStates([i], 'comparing');
        yield { comparing: [i] };
        
        // Shift elements of sorted portion that are greater than key
        while (j >= 0) {
            stats.comparisons++;
            visualizer.setBarStates([j, i], 'comparing');
            yield { comparing: [j, i] };
            
            if (visualizer.getValue(j) > key) {
                stats.swaps++;
                visualizer.setBarStates([j + 1], 'swapping');
                visualizer.setValue(j + 1, visualizer.getValue(j));
                yield { swapping: [j + 1] };
                j--;
            } else {
                break;
            }
        }
        
        // Place key in its correct position
        visualizer.setValue(j + 1, key);
        
        // Mark the sorted portion
        const sortedIndices = [];
        for (let k = 0; k <= i; k++) {
            sortedIndices.push(k);
        }
        visualizer.markAsSorted(sortedIndices);
        yield { sorted: sortedIndices };
    }
}

/**
 * Merge Sort - Divide and conquer!
 * Split array in half, sort each half, merge them back
 * @generator
 * @param {Visualizer} visualizer
 * @param {Object} stats
 * @yields {Object}
 */
function* mergeSort(visualizer, stats) {
    yield* mergeSortHelper(visualizer, stats, 0, visualizer.size() - 1);
    visualizer.markAsSorted(null); // Mark all as sorted
}

/**
 * Helper function for merge sort (recursive part)
 * @generator
 */
function* mergeSortHelper(visualizer, stats, left, right) {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    
    // Sort left half
    yield* mergeSortHelper(visualizer, stats, left, mid);
    
    // Sort right half
    yield* mergeSortHelper(visualizer, stats, mid + 1, right);
    
    // Merge the sorted halves
    yield* merge(visualizer, stats, left, mid, right);
}

/**
 * Merge function - combines two sorted subarrays
 * @generator
 */
function* merge(visualizer, stats, left, mid, right) {
    // Highlight the range we're merging
    visualizer.highlightRange(left, right, 'comparing');
    yield { merging: [left, right] };
    
    // Create temp arrays
    const leftArray = [];
    const rightArray = [];
    
    for (let i = left; i <= mid; i++) {
        leftArray.push(visualizer.getValue(i));
    }
    for (let i = mid + 1; i <= right; i++) {
        rightArray.push(visualizer.getValue(i));
    }
    
    let i = 0, j = 0, k = left;
    
    // Merge the temp arrays back
    while (i < leftArray.length && j < rightArray.length) {
        stats.comparisons++;
        
        if (leftArray[i] <= rightArray[j]) {
            visualizer.setValue(k, leftArray[i]);
            visualizer.setBarStates([k], 'swapping');
            yield { updating: k };
            i++;
        } else {
            visualizer.setValue(k, rightArray[j]);
            visualizer.setBarStates([k], 'swapping');
            yield { updating: k };
            j++;
        }
        stats.swaps++;
        k++;
    }
    
    // Copy remaining elements
    while (i < leftArray.length) {
        visualizer.setValue(k, leftArray[i]);
        visualizer.setBarStates([k], 'swapping');
        yield { updating: k };
        i++;
        k++;
        stats.swaps++;
    }
    
    while (j < rightArray.length) {
        visualizer.setValue(k, rightArray[j]);
        visualizer.setBarStates([k], 'swapping');
        yield { updating: k };
        j++;
        k++;
        stats.swaps++;
    }
    
    // Mark merged section
    visualizer.highlightRange(left, right, 'default');
}

/**
 * Quick Sort - Pick a pivot, partition around it
 * Often the fastest in practice!
 * @generator
 * @param {Visualizer} visualizer
 * @param {Object} stats
 * @yields {Object}
 */
function* quickSort(visualizer, stats) {
    yield* quickSortHelper(visualizer, stats, 0, visualizer.size() - 1);
    visualizer.markAsSorted(null); // All sorted!
}

/**
 * Helper function for quick sort (recursive part)
 * @generator
 */
function* quickSortHelper(visualizer, stats, low, high) {
    if (low < high) {
        // Partition and get pivot index
        const pivotIndex = yield* partition(visualizer, stats, low, high);
        
        // Sort left of pivot
        yield* quickSortHelper(visualizer, stats, low, pivotIndex - 1);
        
        // Sort right of pivot
        yield* quickSortHelper(visualizer, stats, pivotIndex + 1, high);
    }
}

/**
 * Partition function - rearranges array around pivot
 * @generator
 */
function* partition(visualizer, stats, low, high) {
    // Choose last element as pivot
    const pivot = visualizer.getValue(high);
    visualizer.setBarStates([high], 'comparing');
    yield { pivot: high };
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        stats.comparisons++;
        visualizer.setBarStates([j, high], 'comparing');
        yield { comparing: [j, high] };
        
        if (visualizer.getValue(j) < pivot) {
            i++;
            if (i !== j) {
                stats.swaps++;
                visualizer.setBarStates([i, j], 'swapping');
                yield { swapping: [i, j] };
                visualizer.swap(i, j);
            }
        }
        
        visualizer.setBarStates([j], 'default');
    }
    
    // Place pivot in correct position
    if (i + 1 !== high) {
        stats.swaps++;
        visualizer.swap(i + 1, high);
    }
    
    visualizer.setBarStates([i + 1], 'sorted');
    yield { sorted: [i + 1] };
    
    return i + 1;
}

/**
 * Heap Sort - Build a heap, extract max repeatedly
 * @generator
 * @param {Visualizer} visualizer
 * @param {Object} stats
 * @yields {Object}
 */
function* heapSort(visualizer, stats) {
    const n = visualizer.size();
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        yield* heapify(visualizer, stats, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        stats.swaps++;
        visualizer.setBarStates([0, i], 'swapping');
        yield { swapping: [0, i] };
        visualizer.swap(0, i);
        
        // Mark as sorted
        visualizer.markAsSorted([i]);
        yield { sorted: [i] };
        
        // Heapify the reduced heap
        yield* heapify(visualizer, stats, i, 0);
    }
    
    visualizer.markAsSorted([0]);
}

/**
 * Heapify function - maintains the heap property
 * @generator
 */
function* heapify(visualizer, stats, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Check if left child is larger
    if (left < n) {
        stats.comparisons++;
        visualizer.setBarStates([left, largest], 'comparing');
        yield { comparing: [left, largest] };
        
        if (visualizer.getValue(left) > visualizer.getValue(largest)) {
            largest = left;
        }
    }
    
    // Check if right child is larger
    if (right < n) {
        stats.comparisons++;
        visualizer.setBarStates([right, largest], 'comparing');
        yield { comparing: [right, largest] };
        
        if (visualizer.getValue(right) > visualizer.getValue(largest)) {
            largest = right;
        }
    }
    
    // If largest is not root, swap and continue heapifying
    if (largest !== i) {
        stats.swaps++;
        visualizer.setBarStates([i, largest], 'swapping');
        yield { swapping: [i, largest] };
        visualizer.swap(i, largest);
        
        // Recursively heapify the affected subtree
        yield* heapify(visualizer, stats, n, largest);
    }
    
    visualizer.resetColors();
}

// Map algorithm names to their functions
const ALGORITHMS = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort,
    heap: heapSort
};

/**
 * Gets the sorting function for an algorithm
 * @param {string} algorithmKey - The algorithm identifier
 * @returns {Function} - The generator function
 */
function getAlgorithm(algorithmKey) {
    return ALGORITHMS[algorithmKey] || ALGORITHMS.bubble;
}