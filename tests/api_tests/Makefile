.DEFAULT_GOAL := all

PFILES :=               \
    api_tests			\

.pylintrc:
	pylint --disable=locally-disabled --reports=no --generate-rcfile > $@

run:
	-mypy     api_tests.py
	-pylint   api_tests.py
	-coverage run    --branch api_tests.py
	-coverage report -m --omit="*/lib/*"

all:

check: $(FILES)

format:
	autopep8 -i api_tests.py

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -rf .mypy_cache

travis:
	make clean
	ls -al
	make run
	ls -al


