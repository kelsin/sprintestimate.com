# Sprint Estimate

[![Docker Image](https://github.com/kelsin/sprintestimate.com/actions/workflows/docker.yml/badge.svg)](https://github.com/kelsin/sprintestimate.com/actions/workflows/docker.yml)

This is the code powering https://sprintestimate.com

## Client

The client is made in [React](https://reactjs.org/) with
[Redux](https://redux.js.org/) and [React Router](https://reactrouter.com/).

## Server

The server is written in [Node.js](https://nodejs.org/en/) using the
[ws](https://github.com/websockets/ws) websocket library.

## Development

Development is handled via docker-compose. You can launch the environment with
`make dev`.
