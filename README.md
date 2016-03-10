# Wut?

This is a interface to generate static maps from **Google Maps**.

# Why?

It's kind of messy when you try to do it on your own, this... thing abstracts most of the stuff you don't usually touch and only exposes the gps coordinates of your locations. It takes the first location as a starting point and the last one as finis. You can also customize the map size.

# How?

Fist [get an API key for Google Static Maps](https://developers.google.com/maps/documentation/static-maps/get-api-key), then:

1. `$ npm install`
1. `node app.js [YOUR_API_KEY](https://developers.google.com/maps/documentation/static-maps/get-api-key)`
1. Visit [http://localhost:8080/?p=4.718799,-74.050629%7C4.714212,-74.037668%7C4.712598,%20-74.032798&size=600x600](http://localhost:8080/?p=4.718799,-74.050629%7C4.714212,-74.037668%7C4.712598,%20-74.032798&size=600x600)

`p` is the set of gps coordinates: `latitude,longitude` separated by a pipe `|`.
`size` is `widh`x`height` of the map generated.

