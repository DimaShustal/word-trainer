start:
	(cd client && yarn start) & (cd server && yarn start)

build:
	(cd client && yarn build) & (cd server && yarn build)

test:
	(cd client && yarn test) & (cd server && yarn test)

install-all:
	yarn install
	cd client && yarn install
	cd server && yarn install
