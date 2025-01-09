

# **NFL GPT**

### The ultimate AI-powered chatbot for NFL fans! 🏈

---

## **Overview**

NFL GPT is an intelligent chatbot designed to provide accurate and context-aware answers to all NFL-related questions. Leveraging advanced AI technologies like **OpenAI’s GPT**, **LangChain**, and **Retrieval-Augmented Generation (RAG)**, it offers seamless real-time interactions for NFL enthusiasts. With a clean, responsive interface built using **Next.js** and a robust backend powered by **AstraDB**, this project brings cutting-edge technology to NFL fans.

---

## **Features**

- **AI-Powered Chatbot**: Delivers precise and context-aware answers using OpenAI’s API and LangChain.
- **RAG Integration**: Enhanced accuracy by combining a vector database with GPT’s language model for Retrieval-Augmented Generation.
- **Dynamic Web Scraping**: Gathers and processes data from 10+ NFL-related websites for up-to-date insights.
- **Responsive Design**: A mobile-friendly interface built with Next.js, ensuring accessibility across devices.
- **Real-Time Interactions**: Provides immediate responses with a smooth and interactive user experience.

---

## **Tech Stack**

- **Frontend**: [Next.js](https://nextjs.org/), [Vercel](https://vercel.com/)
- **Backend**: [OpenAI](https://openai.com/), [LangChain](https://langchain.readthedocs.io/)
- **Database**: [AstraDB](https://www.datastax.com/products/datastax-astra)
- **Web Scraping**: Puppeteer

---

## **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- AstraDB account and API key
- OpenAI API key

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nfl-gpt.git
   cd nfl-gpt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   ASTRA_DB_NAMESPACE=your-namespace
   ASTRA_DB_COLLECTION=your-collection
   ASTRA_DB_API_ENDPOINT=your-api-endpoint
   ASTRA_DB_APPLICATION_TOKEN=your-app-token
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## **Usage**

- **Chat with NFL GPT**: Ask NFL-related questions like:
  - "Who won the Super Bowl in 2024?"
  - "What’s the highest-scoring game in NFL history?"
  - "Who is the top-paid NFL player this season?"

- **Interactive Prompt Suggestions**: Click on predefined questions for a quick start.

---

## **Project Structure**

```
nfl-gpt/
├── app/
│   ├── api/chat/  
|   ├── assets/            #images           
│   ├── components/        # Reusable components (Bubble, PromptSuggestionRow, etc.)
│   ├── global.css         # Global CSS
│   ├── layout.tsx         # Root Layout     
|   ├── page.tsx           # Main page file    
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

---

