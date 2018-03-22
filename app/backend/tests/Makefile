.DEFAULT_GOAL := all

PFILES :=               \
    api_tests			\

.pylintrc:
	pylint --disable=locally-disabled --reports=no --generate-rcfile > $@

run:
	-mypy     unit_tests.py
	-pylint   unit_tests.py
	-coverage run    --branch unit_tests.py
	-coverage report -m --omit="*/lib/*"

all:

check: $(FILES)

format:
	autopep8 -i unit_tests.py

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -rf .mypy_cache

travis:
	make clean
	ls -al
	make run
	ls -al


