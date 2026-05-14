---
title: "Einführung in Vektordatenbanken"
date: 2026-05-06T14:52:01+02:00
draft: false
hideLastModified: true
summaryImage: "img/Vektordatenbanken.png"
keepImageRatio: true
summary: "Rückblick: Mein Vortrag über Vektordatenbanken bei der Brandenburger Linux User Group."
showInMenu: false
tags: ["Search"]
---

Gestern hatte ich die Gelegenheit, bei der Brandenburger Linux User Group einen Vortrag zum Thema **Einführung in Vektordatenbanken** zu halten. Es war ein spannender Austausch, und für alle, die nicht dabei sein konnten (oder die Inhalte einfach noch einmal in Ruhe nachvollziehen möchten), veröffentliche ich hier meine Präsentationsfolien.

Das Thema Künstliche Intelligenz wird präsenter und damit werden auch die zugrundeliegenden Datenbanktechnologien immer wichtiger. Aber was genau macht eine Vektordatenbank eigentlich aus?

## Hier sind die wichtigsten Takeaways aus meinem Vortrag:

* **Was sind Vektoren und Embeddings?** Ein Vektor ist im Kern eine geordnete Liste von Zahlen. Im KI-Umfeld sprechen wir meist von hochdimensionalen Vektoren (z. B. mit 768 oder 1536 Dimensionen), bei denen jeder Eintrag eine gelernte Eigenschaft repräsentiert. Modelle wandeln Daten wie Text, Bilder oder Audio in diese sogenannten Vektor-Embeddings um.
* **Vektordatenbanken vs. Relationale Datenbanken:** Während klassische Datenbanken nach exakten Schlüsselbegriffen suchen, sind Vektordatenbanken auf die **Ähnlichkeitssuche** ausgelegt. Sie finden Objekte, die inhaltlich und semantisch ähnlich sind, basierend auf Distanzmaßen.
* **Die Evolution des Sprachverständnisses:** Wir haben uns angesehen, wie man von Text zu Vektoren kommt. Angefangen bei simplen Methoden wie **Bag of Words** (die leider keinen Kontext und keine Wortreihenfolge verstehen) über **Word2Vec** bis hin zu kontextuellen Embeddings der neuesten Generation (State of the Art) wie **BERT**. Letztere nutzen Transformer-Architekturen, um ein echtes Sprachverständnis aufzubauen, indem sie dem gleichen Wort je nach Satzkontext einen anderen Vektor zuweisen.
* **Architekturen in der Praxis (RAG):** Ein zentraler Use-Case ist **Retrieval Augmented Generation (RAG)**. Dabei nutzen wir Vektordatenbanken, um die relevantesten Textpassagen zu einem Prompt zu finden und diese als Kontext an ein **Large Language Model (LLM)** zu übergeben.
* **Meine Praxis-Projekte:** Theorie ist gut, Praxis ist besser! Deshalb habe ich auch zwei meiner eigenen Projekte vorgestellt:
    * **Dinofind:** Eine Bildersuchmaschine, basierend auf 30.000 Flickr-Bildern, die mithilfe des DINOv2-Modells in Vektoren umgewandelt und in einer **Qdrant**-Vektordatenbank gespeichert wurden.
    * **Malwareuniverse:** Ein Projekt zur Analyse von Malware.

Zum Schluss gab es noch einen kleinen Ausblick auf Themen wie das Benchmarking von Embedding-Modellen auf eigenen Daten.

## Download Folien und Arbeitsmaterial

* [Vortrags Folien](data/Vektordatenbanken.pdf)
* [Arbeitsblatt](data/Vektordatenbanken_Arbeitsblatt.pdf)
* [Musterlösung](data/Vektordatenbanken_Arbeitsblatt_Lösung.pdf)

Ein großes Dankeschön an alle, die gestern dabei waren!

Wenn ihr noch Fragen habt oder über die Themen diskutieren wollt, meldet euch gerne per Mail bei mir unter [blog@hackwiki.de](mailto:blog@hackwiki.de).
