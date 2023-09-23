const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the directory to store uploaded files
const fs = require('fs');
const app = express();
const port = 5000;

app.use(cors());

// Process uploaded text file
function processTextFile(file) {
    const text = fs.readFileSync(file.path, 'utf-8');
    // Implement text processing logic here (word frequency, co-occurring words, etc.)
    const words = text.split(/\s+/);
    return words;
}

// Define a function to find co-occurring words
function findCoOccurringWords(text, targetWord) {
    const words = text.split(/\s+/);
    const coOccurringWords = {};
    
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];
        
        if (word1 === targetWord) {
            if (!coOccurringWords[word2]) {
                coOccurringWords[word2] = 1;
            } else {
                coOccurringWords[word2]++;
            }
        }
    }
    
    return coOccurringWords;
}

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const words = processTextFile(req.file);
    const text = words.join(' '); // Join the words back into text

    // Perform word frequency analysis
    const wordCount = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});

    const top5Words = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
        // Process uploaded text file
function process_text(file) {
    const text = file.toString('utf-8'); // Convert Buffer to string
    const words = text.split(/\s+/); // Split text into words by whitespace
  
    return words;
  }
  
  // Function to find co-occurred word pairs
  function findCoOccurredPairs(words) {
    const coOccurredPairs = {};
  
    for (let i = 0; i < words.length - 1; i++) {
      const pair = `${words[i]} ${words[i + 1]}`;
      
      if (coOccurredPairs[pair]) {
        coOccurredPairs[pair]++;
      } else {
        coOccurredPairs[pair] = 1;
      }
    }
  
    return coOccurredPairs;
  }
  
  app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
  
    // Process and analyze the uploaded file here
    const words = process_text(req.file.buffer);
    const word_count = Counter(words);
  
    const top_5_words = word_count.most_common(5);
    const co_occurred_words = findCoOccurredPairs(words);
  
    // Sort co-occurred word pairs by frequency and get the top 5
    const top_5_co_occurred_words = Object.entries(co_occurred_words)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  
    res.status(200).json({
      top_5_words: top_5_words,
      top_5_co_occurred_words: top_5_co_occurred_words,
      word_frequency: word_count
    });
  });
  

    // Implement co-occurring words analysis
    const targetWord = 'C'; // Replace with the word you want to find co-occurring words for
    const coOccurringWords = findCoOccurringWords(text, targetWord);

    res.json({ top5Words, coOccurringWords });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
