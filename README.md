# things-service
REST web service wrapper around the Things API

[Things](https://culturedcode.com/things/) is an OSX/iOS app for managing tasks in a [GTD](http://gettingthingsdone.com/) style. I use it primarily for managing recurring tasks around the house. Things does not include much in the way of 3rd-party integration, however, they do have a small [AppleScript API](http://downloads.culturedcode.com/things/download/ThingsAppleScriptGuide.pdf). I wanted more ways to interact with Things, so this project exists to put a REST wrapper around some core task functionality, as well as some user interface options.

## Features

Well, all it really does right now is list out the current day's tasks: `http://<host>:<port>/api/v1/things/lists/today`.


## Getting Started

Well, at a minimum you're gonna need a Mac with Things installed. This will allow execution of the AppleScript code, which extracts task lists. The services themselves are run with Node.js, and Grunt to help out.

1. Install Node.js if you don't have it
1. Install grunt cli if you don't have it `npm install -g grunt-cli`
1. Install deps `npm install`
1. Run code quality checks `npm test`
1. Start services `npm start`

## Organization

* /applescript contains any AppleScript files needed to extract data from Things (and write back to it at some point).
* /service contains the RESTful service code. It's a Node app using Express.
* /statusboard contains HTML code for a custom [StatusBoard](https://panic.com/statusboard/) panel to display your tasks.
 
## Contributing

I'm open to any help I can get to expand the functionality. I don't really have a roadmap yet, but ideas are welcome. I suck at AppleScript.

## License
[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0). Do something with it.
