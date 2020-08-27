IMAGE_NAME=git-service
IMAGE_TAG=latest
CONTAINER_NAME=git-service

setup:
	docker build --tag "${IMAGE_NAME}:${IMAGE_TAG}" .

lint:
	docker run -t ${IMAGE_NAME}:${IMAGE_TAG} npm run lint

test:
	docker run -t ${IMAGE_NAME}:${IMAGE_TAG} npm run test

deploy:
	docker run -t ${IMAGE_NAME}:${IMAGE_TAG} npm run deploy:install
	docker run -t ${IMAGE_NAME}:${IMAGE_TAG} npm run deploy:build
	docker run -t ${IMAGE_NAME}:${IMAGE_TAG} npm run deploy:synth
	docker run -t ${IMAGE_NAME}:${IMAGE_TAG} npm run deploy:prod
