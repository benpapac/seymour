# LG Management

This repo holds the code for LG Management's public facing React app. It's a digital calling card for the sole proprietor of LG Management, Nicole Seymour.

## Learn More

You can [view the website here](https://lgmanagement.org).

To see the back end API for this project, [visit this repo](https://github.com/benpapac/seymourAPI/).


### The Components

The app components are structured in a nested hierarchy.

-App
    -About
    -Talent
        -Actor
        -Lookbook
        -Actor(phone)
    -Coaching
    -Contact
    -API
        -actorApi
        -testimonialApi

App contains routes to About, Talent, Coaching, and Contact.

Talent, in turn, returns different components (Actor & Lookbook, or ActorPhone), based on the width of the device visiting the web page.

API is a "secret," page, protected by a login, and must be visited directly by the user. There are no Link elements on the app. It is only meant to be known and used by the client. this is rudimentary cybersecurity, and is only accepted for this project because the database holds no sensitive information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

