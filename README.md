# Weather Extension for glance_app

# Installation
Make sure you have `node` and `npm` installed on your system based on your environment. This is tested inside the docker container as well in debian 12 environment.

To install required packages for this API to work, run `npm install package.json`

You might be getting a bunch of warning messages talking about the versions of the dependencies, but this still works so I choose to ignore them.

# API serve 

`server.js` is the node.js application which is being served from either localhost or on a different server to which we make API calls via Glance App

To start the application so that we can send requests, run `node server.js`

To test the API call, run this `curl http://<location>:3000/getAlerts?state=FL`, where "<location>" can be either localhost or the ip address of the machine where the node.js application is being served.

If there are no alerts, you get nothing as output. But if there are, the below is the same response.

```

#Severity#: Moderate
#Event#: Rip Current Statement
#Certainty#: Likely
#Headline#: Rip Current Statement issued December 22 at 2:16AM EST until December 24 at 1:00AM EST by NWS Jacksonville FL
#Description#: 
* WHAT...Dangerous rip currents expected.

* WHERE...Southeast Georgia and Northeast Florida Beaches.

* WHEN...Through late Monday night.

* IMPACTS...Rip currents can sweep even the best swimmers away
from shore into deeper water.

#Instructions#:
Swim near a lifeguard. If caught in a rip current, relax and
float. Don't swim against the current. If able, swim in a
direction following the shoreline. If unable to escape, face the
shore and call or wave for help.

#Status#: Actual
#Sent Time#: 2024-12-22T02:16:00-05:00
#Effective Time#: 2024-12-22T02:16:00-05:00
#Start Time#:  2024-12-22T04:00:00-05:00
#End Time#:2024-12-24T01:00:00-05:00
#Expire Time#: 2024-12-23T01:00:00-05:00
#Message Type#: Alert

```

You can also test the API using the script `test-weather-api.py` which uses the requests module. It still gives the same output though.

# Standalone JS

If you just want to print the output, just run `node weather.js` and the message in the above format is printed. If there are not alerts, then the message "No active alerts for <state>" is printed where "<state>" is the value of the state that is defined inside the script.

