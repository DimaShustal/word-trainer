### Start docker container locally

```bash
docker build -t word-trainer-api .
docker run -it --rm -p 4000:4000 word-trainer-api
```

### Push docker image to ECR

```bash
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 891377171404.dkr.ecr.eu-central-1.amazonaws.com
docker build --platform linux/amd64 -t word-trainer-api-amd64 .
docker tag word-trainer-api-amd64:latest 891377171404.dkr.ecr.eu-central-1.amazonaws.com/word-trainer-api-amd64:latest
docker push 891377171404.dkr.ecr.eu-central-1.amazonaws.com/word-trainer-api-amd64:latest
```
