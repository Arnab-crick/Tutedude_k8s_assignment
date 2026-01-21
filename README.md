Kubernetes Deployment – Flask Backend & Express Frontend
Architecture Overview

Flask backend deployed as a Kubernetes Deployment with a ClusterIP service

Express frontend deployed as a Kubernetes Deployment with a NodePort service

Minikube used as local Kubernetes cluster running on AWS EC2 (Ubuntu)

🔹 Backend (Flask API)

Service Type: ClusterIP

Port: 8000

Accessible only within the cluster

Frontend communicates using Kubernetes DNS:

http://flask-backend-service:8000


This ensures secure internal communication without exposing the backend publicly.

🔹 Frontend (Express App)

Service Type: NodePort

Container Port: 3000

NodePort: 30007

Intended to be accessed externally

⚠️ Why NodePort Alone Was Not Enough

Since Minikube runs inside a virtual machine on EC2, NodePort is exposed only inside the Minikube VM network and not directly on the EC2 public interface.

✅ Solution: Port Forwarding

To expose the frontend application externally, port forwarding was used:

kubectl port-forward svc/express-frontend-service 3000:3000 --address 0.0.0.0


This forwards traffic from the EC2 instance to the Kubernetes service.

Application becomes accessible at:

http://<EC2_PUBLIC_IP>:3000

🧪 Verification Commands
kubectl get pods
kubectl get services
kubectl logs deploy/express-frontend
kubectl logs deploy/flask-backend
