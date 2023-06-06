install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint
test:
	npx jest
mytest:
	npx jest --watch
gendiff:
	node bin/gendiff.js
