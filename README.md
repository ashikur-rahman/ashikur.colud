# Autonomous AI Portfolio Assistant  
### RAG + n8n Workflow Orchestration + DevOps CI/CD

An autonomous AI assistant embedded in my developer portfolio that demonstrates how **LLMs, RAG knowledge systems, and workflow automation** can be combined to build intelligent software systems.

This project showcases modern **AI engineering practices**, including:

• Retrieval-Augmented Generation (RAG)  
• AI workflow orchestration with **n8n**  
• LLM-driven automation  
• DevOps CI/CD deployment  
• secure backend API gateway architecture  

---

# Live Demo

Portfolio with AI Assistant

http://ashikur.cloud:8080

Ask the assistant about:

• my engineering experience  
• system architecture  
• fintech platforms  
• project implementations  
• meeting scheduling  

---

# System Architecture

The assistant is designed as a **layered AI automation architecture**.

User
│
▼
Frontend Chat UI (Tailwind + JavaScript)
│
▼
PHP API Gateway (submit.php)
│
▼
n8n Workflow Engine
│
├── LLM Agent
├── RAG Knowledge Retrieval
├── Google APIs
├── Calendar Integration
├── Email Automation
├── Slack / Telegram Automation
│
▼
Response Returned to Chat UI


---

# Key Features

## AI Assistant

Interactive AI agent integrated directly into the portfolio website.

Capabilities include:

• answering technical questions  
• explaining projects and architecture  
• retrieving knowledge from documents  
• suggesting meeting times  
• triggering automation workflows  

The assistant behaves like a **developer-focused AI support agent**.

---

# Retrieval-Augmented Generation (RAG)

The assistant uses a **RAG architecture** to produce reliable answers.

Instead of relying only on an LLM, the system retrieves relevant information from a knowledge base.

Workflow:
User Question
│
▼
Embedding Generation
│
▼
Vector Search
│
▼
Relevant Documents
│
▼
LLM Context Injection
│
▼
Generated Response


Benefits:

• reduces hallucinations  
• improves response accuracy  
• allows knowledge updates without retraining  

---

# AI Workflow Orchestration (n8n)

The system uses **n8n** as an orchestration layer for AI agents and external services.

Example automations:

• AI question answering workflow  
• document retrieval pipelines  
• meeting scheduling  
• email notifications  
• knowledge queries  
• data logging  

The backend sends user queries to an **n8n webhook**, which triggers the AI workflow pipeline.

This allows the assistant to behave like an **autonomous task execution system**.

---

# Chat System Design

The chat interface provides a modern conversational UX.

Features include:

• session-based conversation persistence  
• typing indicators  
• rich formatted responses  
• message timestamps  
• local conversation history storage  
• asynchronous API requests  

Each user session generates a unique ID to maintain conversation context.

---

# DevOps & Continuous Deployment

This project includes a **fully automated CI/CD pipeline**.

Deployment pipeline:
Deployment pipeline:


Git Push
│
▼
GitHub Actions
│
▼
SSH Deployment
│
▼
Remote VPS Server
│
▼
Production Website


Deployment tasks include:

• secure SSH connection  
• repository checkout  
• file synchronization to server  
• permissions management  
• optional web server restart  

This pipeline allows **automatic deployment on every push to main**.

---

# Technology Stack

Frontend

• HTML  
• TailwindCSS  
• JavaScript  

Backend

• PHP API gateway  

AI

• OpenAI / LLM  
• Retrieval-Augmented Generation  

Automation

• n8n workflow engine  

DevOps

• GitHub Actions  
• SSH deployment  
• Linux VPS  

---

# Real-World Use Cases

This architecture is applicable to many real-world systems:

AI Customer Support Agents  
AI Developer Assistants  
Enterprise Knowledge Assistants  
Automated Workflow Systems  
AI SaaS Platforms  

The same architecture can power:

• fintech assistants  
• SaaS automation platforms  
• enterprise AI copilots  

---

# Developer Background

I am a backend engineer with **12+ years of experience** building scalable systems across:

• banking  
• fintech  
• SaaS platforms  

My work includes:

• microservice architecture  
• API platforms  
• payment systems  
• automation frameworks  
• AI-assisted engineering workflows  

Technologies I regularly work with:

Java Spring Boot  
PHP (Laravel / CodeIgniter)  
Python  
AWS  
Docker  
CI/CD pipelines  
LLM automation tools  

---

# Future Improvements

Planned system improvements include:

• vector database integration (Pinecone / Weaviate)  
• multi-agent AI architecture  
• persistent memory store  
• Kubernetes deployment  
• analytics dashboard for conversations  

---

# Author

**Md Ashikur Rahman**

Backend Engineer | Fintech Systems | AI Automation

GitHub  
https://github.com/ashikur-rahman

LinkedIn  
https://linkedin.com/in/ashikurrahmanshuvo

Email  
im.md.ashikur.rahman@gmail.com
