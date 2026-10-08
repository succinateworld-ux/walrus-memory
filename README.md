\# 🧠 Walrus Memory Chatbot



A chatbot that remembers user information using decentralized storage with Walrus.



\## 🚀 Live Demo



https://walrus-memory.onrender.com



\## 📌 Overview



Walrus Memory Chatbot is a simple persistent-memory chatbot that allows users to tell the chatbot information about themselves and retrieve that information later.



Instead of keeping the actual memory only inside the chatbot application, each memory is stored as a blob on the Walrus decentralized storage network. The application keeps track of the Walrus Blob IDs associated with each user and retrieves the stored memories from the Walrus aggregator when the user wants to recall them.



\## ✨ Features



\- Save personal memories through a chatbot interface

\- Store memories directly on Walrus

\- Receive a unique Walrus Blob ID for each stored memory

\- Recall previously stored memories

\- Retrieve memories from the Walrus aggregator

\- Simple web interface

\- Publicly deployed demo



\## 🔄 How It Works



```text

User

&#x20; ↓

Chatbot

&#x20; ↓

POST /memory

&#x20; ↓

Walrus Publisher

&#x20; ↓

Memory stored as a Walrus blob

&#x20; ↓

Walrus Blob ID

&#x20; ↓

Memory index

&#x20; ↓

GET /memory/:userId

&#x20; ↓

Walrus Aggregator

&#x20; ↓

Chatbot recalls the memory

```



\## 🗄️ Walrus Integration



The application uses the Walrus testnet Publisher API to store memories.



When a user saves a memory, the application sends the memory to Walrus and receives a Blob ID.



Example:



```text

Memory:

My name is Alex and I love building with Walrus.



Walrus Blob ID:

hCiQMXe0vzXal6BVNKqJEzRzNOf8D0kNlRbTknT8e6Q

```



The application later uses the Blob ID with the Walrus Aggregator to retrieve the original memory.



\## 🧪 Verified Example



A memory was stored through the deployed chatbot:



```text

My name is Alex and I love building with Walrus.

```



Walrus returned:



```text

hCiQMXe0vzXal6BVNKqJEzRzNOf8D0kNlRbTknT8e6Q

```



The same Blob ID was independently queried through the Walrus Aggregator and returned:



```text

My name is Alex and I love building with Walrus.

```



This demonstrates that the chatbot is storing and retrieving actual data through Walrus.



\## 🛠️ Tech Stack



\- Node.js

\- Express.js

\- HTML/CSS/JavaScript

\- Walrus decentralized storage

\- Walrus Publisher API

\- Walrus Aggregator API

\- Render



\## 📂 Project Structure



```text

walrus-memory/

├── public/

│   └── index.html

├── server.js

├── package.json

├── package-lock.json

└── .gitignore

```



\## ⚙️ Running Locally



Clone the repository:



```bash

git clone https://github.com/succinateworld-ux/walrus-memory.git

cd walrus-memory

```



Install dependencies:



```bash

npm install

```



Start the server:



```bash

npm start

```



The application will run locally on:



```text

http://localhost:3000

```



\## 🎯 Hackathon Goal



This project demonstrates how decentralized storage can provide a foundation for chatbot memory.



The core idea is simple:



> A chatbot should not have to forget everything when a conversation ends.



By storing memories as Walrus blobs and retrieving them through their Blob IDs, the chatbot can maintain user-specific memories beyond a single conversation.



\## 🔮 Future Improvements



\- Semantic memory search

\- Memory summarization

\- User authentication

\- Multiple user profiles

\- Memory deletion and management

\- More advanced long-term memory retrieval

\- Persistent decentralized storage for the memory index



\## 📸 Demo Evidence



The project has been tested with real Walrus blobs, including:



```text

My favorite color is green.

```



and:



```text

My favorite food is jollof rice.

```



and:



```text

My name is Alex and I love building with Walrus.

```



The memories were successfully stored on Walrus and retrieved through the deployed chatbot.



\## 📄 License



This project is created as a hackathon project demonstrating Walrus-based decentralized chatbot memory.

