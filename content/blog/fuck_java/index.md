---
title: "Java Spickzettel 🗒️"
date: 2022-06-14T19:58:07+02:00
draft: false
hideLastModified: true
summaryImage: ""
keepImageRatio: true
summary: "Java Spickzettel wird gelöscht nach der Nachprüfung."
showInMenu: false
tags: [""]
---

Danke an [Max](https://github.com/maxriedel03)

## Getter/ Setter 

{{< tabsCode
	file1="/content/blog/fuck_java/getter.md" language1="java" title1="Getter" icon1="java"
	file2="/content/blog/fuck_java/setter.md" language2="java" title2="Setter" icon2="java"
>}}

## Standert Methoden
{{< tabsCode
	file1="/content/blog/fuck_java/clone.md" language1="java" title1="clone" icon1="java"
	file2="/content/blog/fuck_java/equalsandhashcode.md"  language2="java" title2="equals/hashCode" icon2="java"
	file3="/content/blog/fuck_java/toString.md"  language3="java" title3="toString" icon3="java"
>}}

## Imports
{{< codeWide >}}
java.util.*
java.lang.*
java.io.*
{{< /codeWide >}}

## Enum
{{< codeWide >}}
public enum Spezies {
	SCHWALBE("Schwalbe"), WILDGANZ("Wildganz");

	private String name;
	
	private Spezies(String name) {
		this.name = name;
	}
	
	public String toString() {
		return name;
	}

}
{{< /codeWide >}}

## Comparable
{{< tabsCode
	file1="/content/blog/fuck_java/comparable.md" language1="java" title1="AthleteVO.java" icon1="java"
	file2="/content/blog/fuck_java/comparable.md" language1="java" title1="AthleteVO.java" icon1="java"
>}}


## Interfaces

![Interfaces](img/Interface.jpg)

{{< tabsCode
	file1="/content/blog/fuck_java/interfaces/Programmierer.md" language1="java" title1="Programmierer.java" icon1="java"
	file2="/content/blog/fuck_java/interfaces/Informatiker.md" language2="java" title2="Informatiker.java" icon2="java"
>}}


## Abstrakte Klassen

![Abstrakte Klassen](img/Abstract_Class.jpg)

{{< tabsCode
	file1="/content/blog/fuck_java/abstrakte_klassen/DataAnalyst.md" language1="java" title1="DataAnalyst.java" icon1="java"
	file2="/content/blog/fuck_java/abstrakte_klassen/Wirtschaftsinformatiker.md" language2="java" title2="Wirtschaftsinformatiker.java" icon2="java"
>}}


## Collections

![Collections](img/Collection.jpg)

{{< tabsCode
	file1="/content/blog/fuck_java/collections/Computer.md" language1="java" title1="Computer.java" icon1="java"
	file2="/content/blog/fuck_java/collections/Programmierer.md"  language2="java" title2="Programmierer.java " icon2="java"
>}}

## Iterator
{{< codeWide >}}
Iterator <SchuhPaar> iterator = tester.getShuhKollektion().iterator();

while(iterator.hasNext()){
	iterator.next().toString();
}

{{< /codeWide >}}

## Exceptions

  - checkedException -> extends Exception
  - uncheckedException -> extends RuntimeException

![Exeption](img/Exception.jpg)

{{< tabsCode
	file1="/content/blog/fuck_java/exeption/Programmierer.md" language1="java" title1="Programmierer.java" icon1="java"
	file2="/content/blog/fuck_java/exeption/NegativerKaffeekonsumException.md"  language2="java" title2="NegativerKaffeekonsumException.java " icon2="java"
	file3="/content/blog/fuck_java/exeption/ZuHoherKaffeekonsumException.md"  language3="java" title3="ZuHoherKaffeekonsumException.java " icon3="java"
>}}

## IO

[IO link](https://www.tutorialspoint.com/java/java_serialization.htm)