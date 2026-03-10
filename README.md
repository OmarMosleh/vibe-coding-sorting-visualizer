# 🎯 Sorting Algorithm Visualizer

A beautiful, interactive web application that visualizes sorting algorithms in real-time with smooth animations. Built with vanilla HTML, CSS, and JavaScript - no frameworks, just pure code!

## 🌟 Features

- **6 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort
- **Smooth Animations**: Watch algorithms sort data step-by-step with color-coded visualization
- **Interactive Controls**: Adjust algorithm, array size (10-100), and animation speed
- **Real-time Statistics**: Track comparisons, swaps, and elapsed time
- **Complexity Display**: See time and space complexity (Big-O notation) for each algorithm
- **Pause/Resume**: Stop and continue sorting at any point
- **Keyboard Shortcuts**: 
  - `Space` - Play/Pause
  - `R` - Reset
- **Responsive Design**: Works beautifully on desktop and mobile

## 🎨 Color Legend

- **Blue**: Unsorted elements
- **Yellow**: Currently comparing
- **Red**: Swapping elements
- **Green**: Sorted elements

## 🚀 Getting Started

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/OmarMosleh/vibe-coding-sorting-visualizer.git
   cd vibe-coding-sorting-visualizer
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html  # macOS
   # or
   start index.html # Windows
   # or just double-click the file
   ```

3. Start visualizing! Select an algorithm, adjust settings, and click "Start Sorting"

### No Installation Required!

This is a client-side application - no server, no build process, no dependencies. Just open and run!

## 📚 Algorithms Included

### 1. Bubble Sort
- **Time Complexity**: O(n) best, O(n²) average/worst
- **Space Complexity**: O(1)
- Simple but slow, repeatedly swaps adjacent elements

### 2. Selection Sort
- **Time Complexity**: O(n²) all cases
- **Space Complexity**: O(1)
- Finds minimum element and places it at the beginning

### 3. Insertion Sort
- **Time Complexity**: O(n) best, O(n²) average/worst
- **Space Complexity**: O(1)
- Builds sorted array one item at a time, like sorting cards

### 4. Merge Sort
- **Time Complexity**: O(n log n) all cases
- **Space Complexity**: O(n)
- Divide and conquer - consistently fast!

### 5. Quick Sort
- **Time Complexity**: O(n log n) best/average, O(n²) worst
- **Space Complexity**: O(log n)
- Usually the fastest in practice

### 6. Heap Sort
- **Time Complexity**: O(n log n) all cases
- **Space Complexity**: O(1)
- Builds a heap structure for consistent performance

## 🛠️ How It Works

### Generator Functions Magic

The sorting algorithms use JavaScript **generator functions** (`function*`) with `yield` statements. This allows the algorithm to pause execution after each step, update the visualization, add a delay, then continue - creating the smooth animation effect!

```javascript
function* bubbleSort(visualizer, stats) {
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            visualizer.setBarStates([j, j + 1], 'comparing');
            yield; // Pause here for animation
            
            if (visualizer.getValue(j) > visualizer.getValue(j + 1)) {
                visualizer.swap(j, j + 1);
                yield; // Pause again after swap
            }
        }
    }
}
```

### Architecture

- **index.html**: Structure and UI layout
- **styles.css**: Beautiful styling and responsive design
- **app.js**: Main application orchestrator and event handlers
- **visualizer.js**: Rendering engine for creating and animating bars
- **algorithms.js**: All 6 sorting algorithm implementations
- **complexity-data.js**: Time and space complexity information
- **utils.js**: Helper functions for array generation, delays, formatting

## 🎯 Learning Project

This project was built as a learning exercise to understand:
- How sorting algorithms work internally
- Algorithm time and space complexity
- JavaScript generator functions
- Vanilla JavaScript DOM manipulation
- CSS animations and responsive design
- Building apps without frameworks

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest new features
- Add more sorting algorithms (Radix Sort, Shell Sort, etc.)
- Improve the UI/UX
- Enhance animations

## 📝 License

MIT License - feel free to use this project for learning or teaching!

## 👏 Credits

Built with love during Vibe Coding Day One!

---

**Enjoy watching algorithms come to life!** 🎉