const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const WALRUS_PUBLISHER =
  "https://publisher.walrus-testnet.walrus.space";

const WALRUS_AGGREGATOR =
  "https://aggregator.walrus-testnet.walrus.space";

// Persistent memory index
const MEMORY_FILE = path.join(__dirname, "memory-index.json");

let memories = {};

if (fs.existsSync(MEMORY_FILE)) {
  try {
    memories = JSON.parse(
      fs.readFileSync(MEMORY_FILE, "utf8")
    );
    console.log("Memory index loaded.");
  } catch (error) {
    console.error("Could not read memory index:", error);
  }
}

function saveMemoryIndex() {
  fs.writeFileSync(
    MEMORY_FILE,
    JSON.stringify(memories, null, 2)
  );
}

// Home
app.get("/", (req, res) => {
  res.json({
    message: "Walrus Memory Chatbot is running!"
  });
});

// Save a memory to Walrus
app.post("/memory", async (req, res) => {
  const { userId, memory } = req.body;

  if (!userId || !memory) {
    return res.status(400).json({
      error: "userId and memory are required"
    });
  }

  try {
    const response = await fetch(
      `${WALRUS_PUBLISHER}/v1/blobs?epochs=5`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/octet-stream"
        },
        body: memory
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Walrus upload failed: ${errorText}`);
    }

    const data = await response.json();

    const blobId = data.newlyCreated.blobObject.blobId;

    if (!memories[userId]) {
      memories[userId] = [];
    }

    memories[userId].push({
      blobId,
      createdAt: new Date().toISOString()
    });

    saveMemoryIndex();

    res.json({
      success: true,
      message: "Memory saved to Walrus",
      blobId,
      memory
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Recall memories from Walrus
app.get("/memory/:userId", async (req, res) => {
  const userId = req.params.userId;

  const userMemories = memories[userId] || [];

  try {
    const recalledMemories = [];

    for (const item of userMemories) {
      const response = await fetch(
        `${WALRUS_AGGREGATOR}/v1/blobs/${item.blobId}`
      );

      if (!response.ok) {
        throw new Error(
          `Could not retrieve blob ${item.blobId}`
        );
      }

      const memory = await response.text();

      recalledMemories.push({
        memory,
        blobId: item.blobId,
        createdAt: item.createdAt
      });
    }

    res.json({
      userId,
      memories: recalledMemories
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});