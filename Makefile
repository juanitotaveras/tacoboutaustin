create_env:
	docker run --name taco_front -d -p 3000:3000 -v `pwd`/app/frontend/src:/app/frontend/src juanitotaveras/tacoboutaustin:front
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

