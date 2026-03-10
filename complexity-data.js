// ===================================
// Complexity Data - The Algorithm Report Cards!
// ===================================

/**
 * Time and space complexity for each algorithm
 * Big-O notation tells us how the algorithm scales
 * Think of it like: O(n) = good, O(n²) = meh, O(n log n) = pretty good!
 */
const COMPLEXITY_DATA = {
    bubble: {
        name: 'Bubble Sort',
        timeBest: 'O(n)',       // Best case: array already sorted
        timeAverage: 'O(n²)',   // Average case: random array
        timeWorst: 'O(n²)',     // Worst case: array sorted backwards
        space: 'O(1)',          // Only uses a tiny bit of extra memory
        description: 'Repeatedly swaps adjacent elements if they are in wrong order. Simple but slow!'
    },
    selection: {
        name: 'Selection Sort',
        timeBest: 'O(n²)',      // Always does the same work
        timeAverage: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        description: 'Finds the minimum element and puts it at the beginning. Consistent but slow.'
    },
    insertion: {
        name: 'Insertion Sort',
        timeBest: 'O(n)',       // Best case: already sorted
        timeAverage: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        description: 'Builds sorted array one item at a time. Good for small or nearly sorted data.'
    },
    merge: {
        name: 'Merge Sort',
        timeBest: 'O(n log n)', // Divide and conquer is consistent!
        timeAverage: 'O(n log n)',
        timeWorst: 'O(n log n)',
        space: 'O(n)',          // Needs extra space for merging
        description: 'Divides array in half recursively, then merges sorted halves. Reliable and fast!'
    },
    quick: {
        name: 'Quick Sort',
        timeBest: 'O(n log n)',
        timeAverage: 'O(n log n)',
        timeWorst: 'O(n²)',     // Worst case: bad pivot choices
        space: 'O(log n)',      // For the recursion stack
        description: 'Picks a pivot and partitions array around it. Usually the fastest in practice!'
    },
    heap: {
        name: 'Heap Sort',
        timeBest: 'O(n log n)',
        timeAverage: 'O(n log n)',
        timeWorst: 'O(n log n)',
        space: 'O(1)',          // Sorts in-place!
        description: 'Builds a heap data structure then extracts elements. Consistent performance!'
    }
};

/**
 * Get complexity info for a specific algorithm
 * @param {string} algorithmKey - The algorithm identifier (e.g., 'bubble')
 * @returns {Object} - Complexity information object
 */
function getComplexityInfo(algorithmKey) {
    return COMPLEXITY_DATA[algorithmKey] || COMPLEXITY_DATA.bubble;
}