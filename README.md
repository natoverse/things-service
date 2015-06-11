# things-service
REST web service wrapper around the Things API

[Things](https://culturedcode.com/things/) is an OSX/iOS app for managing tasks in a [GTD](http://gettingthingsdone.com/) style. I use it primarily for managing recurring tasks around the house. Things does not include much in the way of 3rd-party integration, however, they do have a small [AppleScript API](http://downloads.culturedcode.com/things/download/ThingsAppleScriptGuide.pdf). I wanted more ways to interact with Things, so this project exists to put a REST wrapper around some core task functionality, as well as some user interface options.

## Features

All it really does right now is list out the current day's tasks: `http://<host>:<port>/api/v1/things/lists/today`.

You can also get an individual task (which will eventually be expanded to include editing): `http://<host>:<port>/api/v1/things/todos/:id`. 

## Getting Started

Well, at a minimum you're gonna need a Mac with Things installed. This will allow execution of the AppleScript code, which extracts task lists. The services themselves are run with Node.js, and Grunt to help out.

1. Install Node.js if you don't have it
1. Install grunt cli if you don't have it `npm install -g grunt-cli`
1. Install deps `npm install`
1. Run code quality checks `npm test`
1. Start services `npm start`

### StatusBoard

If you're using StatusBoard, you can load the custom panels to see your TODOs.
Panic has instructions to do that [here](https://panic.com/statusboard/docs/diy_tutorial.pdf), but I'll summarize:

1. Start this app.
1. Find your Mac's IP address (easy way: System Preferences --> Network, it should be listed there.)
1. Open the StatusBoard app, add a new 'DIY' panel, and in the URL field, enter `http://<mac ip address>:3000/today.html`

Obviously this will all only work if your iPad is on the same network as the Mac running this service.
If you want it on the web, I guess you'll need to either open your firewall or find a host that will run a Mac.
In the future this could be made better by allowing remote create/delete of TODOs, so you could have a machine at home
that keeps a web-available service updated.

## Organization

* /applescript contains any AppleScript files needed to extract data from Things (and write back to it at some point).
* /service contains the RESTful service code. It's a Node app using Express.
* /statusboard contains HTML code for a custom [StatusBoard](https://panic.com/statusboard/) panel to display your tasks.

## Contributing

I'm open to any help I can get to expand the functionality.
I don't really have a roadmap yet, but ideas are welcome.
There are lots of things the AppleScript API exposes that may be useful/desirable to different people.
My main use case is seeing the days tasks, and preferably being able to mark them as complete.

I suck at AppleScript.

## License
[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
