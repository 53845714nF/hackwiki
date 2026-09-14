---
title: "Protection Goal 🔒"
date: 2022-02-12T19:18:13+01:00
draft: false
hideLastModified: true
summaryImage: "img/schutzziele.jpg"
keepImageRatio: true
summary: "A brief summary of IT protection goals."
showInMenu: false
tags: ["Hacking"]
---

A classic of IT security are protection goals, sometimes also called security objectives.

Recently, I read something about protection goals again in a book (Introduction to Kali Linux Penetration Testing and Ethical Hacking with Linux).

{{< book title="Einstieg in Kali Linux Penetration Testing und Ethical Hacking mit Linux" authors="Jürgen Ebner" image="img/buch.jpg" size="300x" >}}
The book provides an overview of the Kali Linux operating system and also explains IT security procedures.
{{< /book >}}

The book speaks of the CIA Triad, that is:
  - Confidentiality (Confidentiality)
  - Integrity (Integrity)
  - Availability (Availability)

I know four or seven goals, but the CIA Triad sounds much cooler. 😎

## Authenticity
Here it's about knowing who I am communicating with. The authenticity of my counterpart.
A good example of this are digital signatures, such as those used in https.
Here I can see who the website belongs to.

## Integrity
Here it's about ensuring that data cannot be altered.
The simplest way to do this is to run a one-way function (hash function) over the file. This generates a code (hash).
This must happen after the file is created and again after an upload/download. Because errors can always occur during transmission, or the data can be manipulated by an attacker.

## Confidentiality
It must be ensured that secrets remain secret. This applies to all secrets, whether private or business-related.

## Availability
As the name suggests, if I have systems, I want them to be available too.
What can also be considered an availability failure is of course a failure of an automated backup. Because the backup process is not ensured.
Even when the backup is not needed.

### Size Estimation
If you offer a service, it is also important to consider the size of the underlying infrastructure. My blog will never have as many readers as Amazon has customers, so my infrastructure is correspondingly many times smaller than Amazon's. At the same time, Alibaba, a Chinese competitor of Amazon, is even larger than Amazon. They too must worry about ensuring their service is not disrupted.

## Additional Goals
Over the years, more and more protection goals have emerged.

### Data Protection
This is a legal construct designed to ensure protection against misuse of data processing.

### Anonymity
I want to be able to do things without always revealing my entire identity.

### Liabilities
These are legal provisions, e.g., a business transaction.

Frequently, these goals overlap and are hard to separate.