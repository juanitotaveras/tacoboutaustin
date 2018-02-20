# tacoboutaustin
Tacoboutaustin award-winning website

## Setting up:

1. Clone the github repo to your machine:

 `git clone https://github.com/juanitotaveras/tacoboutaustin.git`

2. Go into the newly-created folder:

`cd tacoboutaustin`

3. Build the docker container from the Dockerfile in this directory and give the image a name:

`docker build --tag "OPTIONAL_IMAGE_NAME" .`

4. Observe that you have a newly created Docker image named "OPTIONAL_IMAGE_NAME".

`docker images`

5. Now build a new container (you can use the optional --name to give your container a name, which is "taco" in this case):
##### To run the new container in interactive mode:
```docker run --name OPTIONAL_CONTAINER_NAME -it -p 80:80 -t tacoboutaustin```

##### To run the container in detached mode (this is what you want if you still  need to use the terminal):
```docker run --name OPTIONAL_CONTAINER_NAME -d -p 80:80 -t tacoboutaustin```

##### To bring container back from detached mode to interactive mode:

`docker exec -it taco /bin/bash`

##### Now if you go to your browser and type "localhost" you should see the web app!


To stop the docker container quickly:

`docker kill taco`

To stop the container properly:

`docker stop taco`

To remove the container:

`docker rm taco`

## To remove the image:
`docker rmi tacoboutaustin` 


