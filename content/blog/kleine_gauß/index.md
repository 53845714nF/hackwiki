---
title: "Kleine Gauß 💯"
date: 2021-09-26T15:22:24+02:00
draft: false
hideLastModified: true
summaryImage: "img/Gauß.jpg"
keepImageRatio: true
summary: "Kontakt Punkte mit dem kleinen Gauß in meinem Leben."
showInMenu: false
tags: ["Programmieren"]
---

Ich musste schon wieder schmunzeln. Als bei meiner Einführungswoche an der Hochschule, der kleine Gauß oder eher bekannt als Gaußsche Summenformel das Thema der ersten 
Mathematik Vorbereitung war.

In meiner Schule Zeit hatte ich den Film die "Die Vermessung der Welt" gesehen, wo es eine Szene gibt in der genau die Geschichte des kleinen Gauß aufgezeigt wird.
Es ist ein sehr interessanter Film und es lohnt sich ihn einmal an zugucken.

## Der Film basiert aus diesem Buch:
{{< book title="Die Vermessung der Welt" authors="Daniel Kehlmann" image="img/vermessung_der_welt.jpg" size="300x" >}}
Das Thema ist die fiktive Doppelbiografie des Mathematikers Carl Friedrich Gauß und des Naturforschers Alexander von Humboldt.
{{< /book >}}

## Meine Python Implementierung
In meiner Ausbildung habe ich dann zwei Wege in Python programmiert wie diese Problem gelöst werden kann. [Link zum Gitlab](https://git.aei.mpg.de/sfeustel/ci-cd-python-unittest)

### Einmal der umständliche Weg mit einer klassischen For Loop:
{{< code language="python" >}}
def loop(number):
    """
    This function returns the value of the small Gauss.
    (Sums all numbers from 1 to n together, as a loop).

    :param n: only integer
    :return: integer of the sum of gaussian summation formela
    """

    try:
        number = int(number)
    except ValueError:
        raise TypeError('Must be an integer,') from ValueError
    if number < 1:
        raise ValueError('The number must be greater than 0.')

    ergebnis = 0
    for i in range(1, number+1):
        ergebnis = (i + ergebnis)
    return ergebnis
{{< /code >}}

### Und der Weg mit Anwendung der Gaußsche Summenformel:
{{< code language="python" >}}
def formula(number):
    """
    This function returns the value of the small Gauss.
    (Sums all numbers from 1 to n together, according to Gauss formula)

    :param n: only integer
    :return: integer of the sum of gaussian summation formela
    """
    try:
        number = int(number)
    except ValueError:
        raise TypeError("Must be an integer.") from ValueError
    if number < 1:
        raise ValueError('The number must be greater than 0.')

    return int(number*(number+1)/2)
{{< /code >}}

Es ist ein cooler und einfacher Weg sein Code zu optimieren, soweit ich Weiß findet diese Formel auch Anwendung in modernen Compielern wie GCC.
