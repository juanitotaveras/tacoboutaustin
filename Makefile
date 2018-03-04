start_containers:
	docker run --name taco_front -d -p 3000:3000 -v `pwd`/app/frontend/src:/app/frontend/src juanitotaveras/tacoboutaustin:front
