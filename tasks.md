Bugs:
- Fix: when a new session: ERROR TypeError: remoteSession is undefined
- deleting a remote estimation in the list will not delete the same estimation in the participant local

tasks:
- add cookieless analytics - plausible?
- configure prod mode to the firebase db - due on july, 10th
- add landing page
- publish
- buy domain and link it
- upload code to github
- refactor: 
  - extract to another layer all the references to firebase
  - find better ways to define the domain objects
- automated testing
- pipeline
- write blogpost
  - architecture diagram
  - talk about realtime collaboration, serverless
- clean up database periodically
- test in mobile devices
- improve the way the session link is shared
- create a dev env

nice to have /Evaluate:
- load the current estimator if a session was found on the window
- there is a flick/flickering on change of information e.g. when an estimation is ready
