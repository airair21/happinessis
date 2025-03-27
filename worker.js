// List of common words to exclude from connections
const COMMON_WORDS = new Set(['and', 'i', 'to', 'the', 'a', 'of', 'in', 'it', 'is', 'that', 'with', 'for', 'on', 'are', 'as', 'be', 'at', 'or', 'was', 'but', 'not', 'you', 'this', 'have', 'he', 'she', 'we', 'they', 'my', 'your', 'their', 'our', 'me', 'him', 'her', 'us', 'them', 'when', ' ']);

// Helper function to split text into words (excluding common words and punctuation)
function splitIntoWords(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(' ')
        .filter(word => word.trim() !== '' && !COMMON_WORDS.has(word)); // Exclude empty strings and common words
}

// Listen for messages from the main thread
self.onmessage = function (event) {
    console.log("Worker received data:", event.data); // Debugging

    let { bubbles, connections, clickedBubble } = event.data;

    // Perform filtering logic
    let clickedWords = splitIntoWords(clickedBubble.instance);

    let filteredBubbles = bubbles.filter(bubble => {
        if (bubble === clickedBubble) return true; // Always include the clicked bubble

        let bubbleWords = splitIntoWords(bubble.instance);

        // Check if any words match between the clicked bubble and the current bubble
        return bubbleWords.some(word => clickedWords.includes(word));
    });

    let filteredConnections = connections.filter(conn => {
        let bubbleA = conn[0];
        let bubbleB = conn[1];
        return filteredBubbles.includes(bubbleA) && filteredBubbles.includes(bubbleB);
    });

    console.log("Worker sending filtered data:", { filteredBubbles, filteredConnections }); // Debugging

    // Send results back to the main thread
    self.postMessage({ filteredBubbles, filteredConnections });
};