---
title: "Introduction to Vector Databases"
date: 2026-05-06T14:52:01+02:00
draft: false
hideLastModified: true
summaryImage: "img/Vektordatenbanken.png"
keepImageRatio: true
summary: "Retrospective: My lecture on vector databases at the Brandenburger Linux User Group."
showInMenu: false
tags: ["Search"]
---

Yesterday I had the opportunity to give a lecture on **Introduction to Vector Databases** at the Brandenburger Linux User Group. It was an exciting exchange, and for all those who couldn't be there (or just wanted to review the content in peace), I am publishing my presentation slides here.

The topic of Artificial Intelligence is becoming more prevalent, and with it the underlying database technologies are becoming increasingly important. But what exactly makes a vector database?

## Here are the most important takeaways from my lecture:

* **What are vectors and embeddings?** A vector is fundamentally an ordered list of numbers. In the AI context, we usually talk about high-dimensional vectors (e.g., with 768 or 1536 dimensions), where each entry represents a learned property. Models convert data such as text, images, or audio into these so-called vector embeddings.
* **Vector Databases vs. Relational Databases:** While classical databases search for exact keyword matches, vector databases are designed for **similarity search**. They find objects that are semantically similar based on distance measures.
* **The Evolution of Language Understanding:** We looked at how we go from text to vectors. Starting from simple methods like **Bag of Words** (which unfortunately don't understand context or word order) through **Word2Vec** to contextual embeddings of the latest generation (State of the Art) like **BERT**. The latter use Transformer architectures to build genuine language understanding by assigning a different vector to the same word depending on the sentence context.
* **Architectures in Practice (RAG):** A central use case is **Retrieval Augmented Generation (RAG)**. Here, we use vector databases to find the most relevant text passages for a prompt and pass these as context to a **Large Language Model (LLM)**.
* **My Practical Projects:** Theory is good, practice is better! That's why I also presented two of my own projects:
    * **Dinofind:** An image search engine based on 30,000 Flickr images, which were converted into vectors using the DINOv2 model and stored in a **Qdrant** vector database.
    * **Malwareuniverse:** A project for malware analysis.

Finally, there was a brief outlook on topics like benchmarking embedding models on own data.

## Download Slides and Materials

* [Presentation Slides](data/Vektordatenbanken.pdf)
* [Worksheet](data/Vektordatenbanken_Arbeitsblatt.pdf)
* [Solution Sheet](data/Vektordatenbanken_Arbeitsblatt_Lösung.pdf)

A big thank you to everyone who was there yesterday!

If you have any questions or want to discuss the topics, feel free to email me.