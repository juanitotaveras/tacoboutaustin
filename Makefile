build_front:
	docker build --tag t_frontend -f Dockerfile.frontend .

create_env:
	docker run --name taco_front -d -p 3000:3000 -v `pwd`/app:/app juanitotaveras/tacoboutaustin:front
	docker run -d --name taco_back -p 80:80 -t -v `pwd`/app:/app juanitotaveras/tacoboutaustin:back

start_env:
	docker start taco_front
	docker start taco_back

stop_env:
	docker stop taco_front
	docker stop taco_back

clear_env:
	docker stop taco_front
	docker rm taco_front
	docker stop taco_back
	docker rm taco_back

gui_testing:
	sudo apt-get install xserver-xephyr
	sudo apt-get install xvfb
	pip install pyvirtualdisplay selenium
	chmod +x app/frontend/guitests/chromedriver

travis:
	cd app/frontend/guitests; make travis
	cd app/backend/; make travis
	cd app/frontend/tests/; make travis
	@echo

production_back:
	docker run -d --name taco_back -p 80:80 -t -v `pwd`/app:/app juanitotaveras/tacoboutaustin:back

production_front:
	docker run --name taco_front -d -p 80:3000 -v `pwd`/app/frontend/src:/app/frontend/src juanitotaveras/tacoboutaustin:front
