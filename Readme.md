# Hackwiki 🧠
This is the repository for the Hackwiki Blog Website.
The main Topics are: HomeLab, IT-Security, Open Source, and Programming. 
<img src="static/images/hackwiki_klein.png"  width="240" height="285">

## Contributing 🤝
If you want to add or coriegate something to a topic, feel free to create a pull request.
You are also welcome to write your own post.
You are also welcome to write an Issue, if you have a question or a suggestion.
The website is built with Hugo and uses the theme "hugo-theme-learn".

## Prerequisites 📋
You need Hugo to build the website.
And a photo editor of your choise, to work with the images.


## Create a new Post 📃
```
hugo new blog/<new_post>/index.md
```
In the index.md file you can add the content of the post. It is written in markdown.
I use a lot of emojis in the posts, so the post looks more friendly but you can also write without emojis.

### Remove all Metadata from an Image 📷
I use `exiftool` to remove all metadata from an image.

```
exiftool -all= image.png
```

You cann install `exiftool` with `sudo apt-get install libimage-exiftool-perl`.

### Rezise an Image 🗜️
For the images it is mostly nessesary to resize them. I use `mogrify` to resize the images.
```
mogrify -resize 376x250 image.png
```

You can install `mogrify` with `sudo apt-get install imagemagick`.

### Thumbnail 🖼️
The Image of the thumbnail has a ratio of 376x250,65 (width x height).
For text on the thumbnail I use the font IBM Plex Sans KB with a pixel size of 36 (Paint.net).
