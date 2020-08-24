IMAGE_NAME=git-service
IMAGE_TAG=latest
CONTAINER_NAME=git-service

setup:
	docker build --tag "${IMAGE_NAME}:${IMAGE_TAG}" -f Dockerfile .
