.DEFAULT_GOAL := all

PFILES :=                   \
    test_splash_page 			\
    test_hotels                 \
    test_restaurant_details     \
    test_about                  \
    test_search					\

%.jsx: %.js
	-jshint $<
	istanbul cover _mocha -- $<

.pylintrc:
	pylint --disable=locally-disabled --reports=no --generate-rcfile > $@

%.pyx: %.py .pylintrc
	-mypy     $< --ignore-missing-imports
	-pylint   $<
	-coverage run    --branch $<
	-coverage report -m --omit="*/lib/*"

all:

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -rf .mypy_cache

#docker:
#	docker run -it -v $(PWD):/usr/cs373 -w /usr/cs373 gpdowning/gcc

run: $(PFILES:=.pyx)

#$(JSFILES:=.jsx) 

travis:
	make clean
	ls -al
	make run
	ls -al
