# Run IFE API in K8s

This guide will guide you through the process of deploying the recommendations API inside a k8s cluster.

## Pre-requisite
- K8s client install 
- K8s cluster is running
- Recommendation API docker image created

## Installation
1. Create a new namespace `kubectl create namespace ife-api-dev`
3. Apply the `deployment.yaml` and `service.yaml` file 
```
kubectl -n ife-api-dev apply -f deployment.yaml
kubectl -n ife-api-dev apply -f service.yaml
```
4. To get external ip adderess of the service, use `kubectl -n ife-api-dev get svc`
5. Use the EXTERNAL-IP:80/ife/recommendation/{seatId} to make API call.