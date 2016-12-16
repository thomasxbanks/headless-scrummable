# Headless WordPress

Front-end work for a headless WordPress project

## Installation

1. Clone repo
1. Run `npm i` in your favourite terminal/command prompt
1. Go and make a brew while dependencies install
1. Install and activate the (WordPress REST API Plugin)[https://en-gb.wordpress.org/plugins/rest-api/]
1. Point the URL in `loadPosts.js` at the WordPress installation

## Commands

There are a few commands you can use, have a look in `gulpfile.js` and figure them out. The main ones are;

- `gulp` - The default build command. Concatenates, compiles Scss, and moves files to `dist`
- `gulp production` - The production build command. Does the default stuff but also minifies and optimises
- `gulp watch` - Uses BrowserSync to live reload on changes
