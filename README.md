# tacoboutaustin
Tacoboutaustin award-winning website, check it out: http://tacoboutaustin.me/

## Setting up:

1. Clone the github repo to your machine:

 `git clone https://github.com/juanitotaveras/tacoboutaustin.git`

2. Go into the newly-created folder:

`cd tacoboutaustin`

3. Run docker images for api and frontend:

`make create_env`

This will run the api on localhost:80 and the frontend on localhost:3000

4. To close images:
`make clear_env`

# Testing
To run frontend tests, from the root folder run `make frontend`

To run backend tests, from the root folder run `make backend`

To run selenium tests, from the root folder run `make gui_testing` and then `make selenium`

To run api tests, from the root folder run `newman run Postman.json`

# API Documentation
https://tienlatien252.gitbooks.io/tacoboutaustin/content/

# Technical Report
https://carorineee.gitbooks.io/report-and-critiques/content/