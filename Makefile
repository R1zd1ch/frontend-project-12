lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

build-frontend:
	make -C frontend build

start-backend:
	npx start-server

start:
	npx start-server -s ./frontend/build

deploy:
	git push heroku main

build:
	npm run build