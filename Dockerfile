#start from node base image
FROM node 

# less messages during Docker build
ENV NPM_CONFIG_LOGLEVEL warn 

# Allows app_env to be set during build (defaults to empty string)
ARG app_env                  

# sets an environment variable to app_env argument, so that variable will persist in container for use in node
ENV APP_ENV $app_env         

# creates folder to add code into
RUN mkdir -p /frontend       

# all commands will be run from this folder now
WORKDIR /frontend            

# copy code in local frontend directory into container's working directory
COPY ./app/frontend ./           

# install dependencies
RUN npm install
RUN npm install react-bootstrap --save
RUN npm install bootstrap --save        

# Install Python dependencies (from Downing's site)
#FROM python:3.5.2
RUN apt-get update			&& \
	apt-get -y install cmake	&& \
	apt-get -y install graphviz	&& \
	apt-get -y install vim

# Install Python pre-reqs
RUN apt-get -y install python-pip	&& \
	apt-get -y install python-dev	&& \
	apt-get -y install build-essential && \
	apt-get -y install checkinstall && \
	apt-get -y install libreadline-gplv2-dev && \
	apt-get -y install libncursesw5-dev && \
	apt-get -y install libssl-dev && \
	apt-get -y install libsqlite3-dev && \
	apt-get -y install tk-dev && \
	apt-get -y install libgdbm-dev && \
	apt-get -y install libc6-dev && \
	apt-get -y install libbz2-dev

CMD /usr/src

RUN wget https://www.python.org/ftp/python/3.5.2/Python-3.5.2.tgz

RUN tar xzf Python-3.5.2.tgz

WORKDIR Python-3.5.2
RUN bash -c "./configure"

RUN bash -c "make altinstall" 


RUN bash -c "alias python=python3 > ~/.bashrc"
RUN bash -c "source ~/.bashrc"

RUN pip install --upgrade pip 	&& \
	pip --version 		&& \
	pip install autopep8 	&& \
	pip install coverage 	&& \
	#pip install mypy 	&& \
	pip install numpy 	&& \
	pip install pylint

RUN pip install Flask

WORKDIR /frontend            
# If the arg_env was set as production, then this will install http-server and build/service optimized static files
# Otherwise, uses create-react-app's hot reloading tool
CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p 3000; \
	else \
	npm run start; \
	fi
# app runs on port 3000 by default
EXPOSE 3000   

#CMD bash