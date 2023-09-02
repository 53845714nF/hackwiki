---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
hideLastModified: true
summaryImage: "{{ printf "img/%s.png" .Name }}"
keepImageRatio: true
summary: "This is a custom summary for my article"
showInMenu: false
tags: [""]
---

