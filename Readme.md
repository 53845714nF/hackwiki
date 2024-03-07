# Hackwiki 

<img src="static/images/hackwiki_klein.png"  width="240" height="285">

## Neue Seite erstellen:
```
hugo new blog/neuereintrag/index.md
```

### Metadaten von Bildern entfernen
```
exiftool -all= bild.png
```

### Bild Resizen
```
mogrify -resize 376x250 bild.jpeg
```

### Vorschaubild
Das Bild hat ein Seitenverhältnis 376x250,65 (Breite x Höhe).
Bei Paint.net hab ich IBM Plex Sans KB mit einer Pixelgröße von 36 verwendet.