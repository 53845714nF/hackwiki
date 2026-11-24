---
title: "Kleine Gauß 💯"
date: 2021-09-26T15:22:24+02:00
draft: false
hideLastModified: true
summaryImage: "img/Gauß.jpg"
keepImageRatio: true
summary: "Kontaktpunkte mit dem kleinen Gauß in meinem Leben."
showInMenu: false
tags: ["Programmieren"]
---

Ich musste schon wieder schmunzeln, als bei meiner Einführungswoche an der Hochschule der kleine Gauß, eher bekannt als Gaußsche Summenformel, das Thema der ersten 
Mathematik-Vorbereitung war.

In meiner Schulzeit hatte ich den Film "Die Vermessung der Welt" gesehen, in dem es eine Szene gibt, in der genau die Geschichte des kleinen Gauß aufgezeigt wird.
Es ist ein sehr interessanter Film und es lohnt sich, ihn einmal anzugucken.

## Der Film basiert auf diesem Buch:
{{< book title="Die Vermessung der Welt" authors="Daniel Kehlmann" image="img/vermessung_der_welt.jpg" size="300x" >}}
Das Thema ist die fiktive Doppelbiografie des Mathematikers Carl Friedrich Gauß und des Naturforschers Alexander von Humboldt.
{{< /book >}}

## Meine Python Implementierung
In meiner Ausbildung habe ich dann zwei Wege in Python programmiert, wie dieses Problem gelöst werden kann. [Link zum GitLab](https://git.aei.mpg.de/sfeustel/ci-cd-python-unittest)

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

### Und der Weg mit Anwendung der Gaußschen Summenformel:
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

Es ist ein cooler und einfacher Weg, seinen Code zu optimieren. Soweit ich weiß, findet diese Formel auch Anwendung in modernen Compilern wie GCC.

Daneben kann man die Formel gut gebrauchen, um beim Kartenspiel Rommé die Punktesumme zu berechnen:

Beispiel: Man hat im Blatt eine 5, 6, 7, 8 und 9 der gleichen Farbe.

Der geübte Spieler schlussfolgert sogleich: Für die Punktsumme nehme ich den Wert der mittleren Karte (7) mal die Anzahl (5), also `7*5==35`.

Mit dem kleinen Gauß rechnet man ganz einfach `formula(9) - formula(4) == 35`.

Dieses Vorgehen ist eigentlich nur eine Abkürzung ausgehend vom kleinen Gauß, der nach dem gleichen Prinzip funktioniert. 
Denn so kann man die Formel vom kleinen Gauß auch verstehen: 

Mittelwert mal die Anzahl.

Dankeschön an Daniela Grothe ([LinkedIn](https://www.linkedin.com/in/daniela-grothe-743ab8235/)|[Github](https://github.com/DGrothe-PhD)), die zu diesem Post beigetragen hat.

Falls Sie Anmerkungen, Vorschläge oder Fragen haben, können Sie sich gerne per E-Mail, LinkedIn oder GitHub bei mir melden.