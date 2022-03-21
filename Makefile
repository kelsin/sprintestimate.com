.PHONY: server client build lint

server: export PORT = 3001
server:
	yarn workspace server dev

client:
	yarn workspace client start

build:
	yarn workspace client build

lint:
	yarn workspace server lint
	yarn workspace client lint
