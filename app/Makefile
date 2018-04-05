.DEFAULT_GOAL := all

PFILES :=               \
    tests				\

.pylintrc:
	pylint --disable=locally-disabled --reports=no --generate-rcfile > $@

run:
	-mypy     tests.py --ignore-missing-imports
	-pylint   tests.py
	-coverage run    --branch tests.py
	-coverage report -m --omit="*/lib/*"

all:

check: $(FILES)

format:
	autopep8 -i tests.py

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -rf .mypy_cache

travis:
	make clean
	ls -al
	make run
	ls -al


