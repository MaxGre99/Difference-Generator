install:
	install ci
publish:
	npm publish --dry-run
lint:
	npx eslint
test:
	npx jest --watch
