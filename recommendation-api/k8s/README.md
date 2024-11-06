# Run Recommendations API in K8s

This guide will guide you through the process of deploying the recommendations API inside a k8s cluster.

## Pre-requisite
- K8s client install 
- K8s cluster is running
- Recommendation API docker image created
- Have AWS account access key and secret of user with access to "personalize:GetRecommendations" API.

## Installation
1. Create a new namespace `kubectl create namespace recommendations-api-dev`
2. Create secret inside namespace created during the first step. 
```
kubectl -n recommendations-api-dev \
create secret generic aws-personalize-runtime-config \
--from-literal access-key-id=AWS_ACCESS_KEY_ID \
--from-literal secret-access-key=AWS_SECRET_ACCESS_KEY
```
3. Apply the `deployment.yaml` and `service.yaml` file 
```
kubectl -n recommendations-api-dev apply -f k8s/deployment.yaml
kubectl -n recommendations-api-dev apply -f k8s/service.yaml
```
4. To get external ip adderess of the service, use `kubectl -n recommendations-api-dev get svc`
5. Use the EXTERNAL-IP:80/recommendations?userId={userId} to make API call.