---
title: "Kleine Gauß 💯"
date: 2021-09-26T15:22:24+02:00
draft: false
hideLastModified: true
summaryImage: "img/Gauß.jpg"
keepImageRatio: true
summary: "Contact with the Gauss Sum Formula in my life."
showInMenu: false
tags: ["Programmieren"]
---

I couldn't help but smile when the topic of the first math preparation class in my college introduction week was the Gauss Sum Formula.

During my school days, I had watched the movie "Measuring the World", which featured a scene that depicted the story of young Gauss. It's a very interesting movie, and it's worth watching.

### The movie is based on the book:
{{< book title="Measuring the World" authors="Daniel Kehlmann" image="img/vermessung_der_welt.jpg" size="300x" >}}
The book is a fictionalized dual biography of the mathematician Carl Friedrich Gauss and the naturalist Alexander von Humboldt.
{{< /book >}}

## My Python implementation

During my training, I wrote two Python implementations of how to solve this problem. Here's the link to the Gitlab repository: [https://git.aei.mpg.de/sfeustel/ci-cd-python-unittest](https://git.aei.mpg.de/sfeustel/ci-cd-python-unittest).

### Once the cumbersome way with a classic For Loop

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

### And the way using the Gauss Sum Formula

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

It's a cool and easy way to optimize your code, and as far as I know, this formula is also used in modern compilers like GCC.
