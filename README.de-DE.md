<div align="center">
    <img src="static/images/hackwiki_klein.png"  width="168" height="200">

# 🧠 Hackwiki

</div>

[![Deploy to GitHub Pages (Hackwiki Blog)](https://github.com/53845714nF/hackwiki/actions/workflows/deploy_blog.yml/badge.svg)](https://github.com/53845714nF/hackwiki/actions/workflows/deploy_blog.yml)

Dies ist das Repository für die Hackwiki Blog-Website.
Die Hauptthemen sind: HomeLab, IT-Sicherheit, Open Source und Programmierung.

## 🤝 Beitragen
Wenn du etwas zu einem Thema hinzufügen oder korrigieren möchtest, erstelle gerne einen Pull Request.
Du kannst auch gerne deinen eigenen Beitrag schreiben.
Wenn du eine Frage oder einen Hinweis hast, kannst du auch gerne ein Issue erstellen.
Die Website wurde mit Hugo gebaut und verwendet das Theme [hugo-refresh](https://github.com/PippoRJ/hugo-refresh).

## 📋 Voraussetzungen
Du benötigst Hugo, um die Website zu bauen.
Außerdem einen Bildbearbeiter deiner Wahl, um mit den Bildern zu arbeiten.

## 📃 Einen neuen Beitrag erstellen
```
hugo new blog/<neuer_beitrag>/index.md
```
In der index.md-Datei kannst du den Inhalt des Beitrags hinzufügen. Er wird in Markdown geschrieben.
Ich verwende viele Emojis in den Beiträgen, damit sie freundlicher wirken, aber du kannst auch ohne Emojis schreiben.

### 📷 Alle Metadaten aus einem Bild entfernen
Ich verwende `exiftool`, um alle Metadaten aus einem Bild zu entfernen.

```
exiftool -all= image.png
```

Du kannst `exiftool` mit `sudo apt-get install libimage-exiftool-perl` installieren.

### 🗜️ Bildgröße ändern
Für die Bilder ist es meistens notwendig, sie zu verkleinern. Ich verwende `mogrify`, um die Bilder zu ändern.
```
mogrify -resize 376x250 image.png
```

Du kannst `mogrify` mit `sudo apt-get install imagemagick` installieren.

### 🖼️ Vorschaubild (Thumbnail)
Das Bild des Vorschaubildes hat ein Verhältnis von 376x250 (Breite x Höhe).
Für Text auf dem Vorschaubild verwende ich die Schriftart IBM Plex Sans KB mit einer Pixelgröße von 36 (Paint.net).