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
	sudo apt-get install xserver-xephyr pylint
	sudo apt-get install xvfb
	pip install pyvirtualdisplay selenium
	chmod +x app/frontend/guitests/chromedriver

travis:
	cd app/frontend/guitests; make travis
	cd app; make travis
	@echo

production_back:
	docker run -d --name taco_back -p 80:80 -t -v `pwd`/app:/app juanitotaveras/tacoboutaustin:back

production_front:
	docker run --name taco_front -d -p 80:3000 -v `pwd`/app/frontend/src:/app/frontend/src juanitotaveras/tacoboutaustin:front

GithubID = juanitotaveras
RepoName = tacoboutaustin
SHA      = 28ea05cf572deb6b11019cbfea2c9982361f1aac

githubid:
	@echo "${GithubID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"

# The Makefile should be present in the root of the project.
# There should be the following commands written:

# make github   - prints link to github repo
github:
	@echo "http://www.github.com/${GithubID}/${RepoName}"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "http://www.github.com/${GithubID}/${RepoName}/blob/${SHA}/stories.txt"

# make uml      - prints link to uml diagram
uml:
	@echo "http://www.github.com/${GithubID}/${RepoName}/blob/${SHA}/UML/uml.png"

# make selenium - runs selenium tests
selenium:
	$(MAKE) gui_testing
	cd app/frontend/guitests; make travis
	@echo

# make frontend - runs frontend tests
frontend:
	cd app/frontend/tests; npm install; npm test
	@echo

# make backend  - runs backend tests
backend:
	pip install -r requirements.txt
	cd app; make travis
	python app/tests.py
	@echo

# make website  - prints link to a website
website:
	@echo "http://tacoboutaustin.me/"

# make report   - prints link to technical report
report:
	@echo "https://carorineee.gitbooks.io/report-and-critiques/content/techreport/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://tienlatien252.gitbooks.io/tacoboutaustin/content/"

# make self     - prints link to self critique
self:
	@echo "https://carorineee.gitbooks.io/report-and-critiques/content/selfcritiques/"

# make other    - prints link to other critique
other:
	@echo "https://carorineee.gitbooks.io/report-and-critiques/content/othercritiques/"
