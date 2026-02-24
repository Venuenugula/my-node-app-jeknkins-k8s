pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-app:latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image Inside Minikube') {
            steps {
                sh '''
                eval $(minikube docker-env)
                docker build -t ${IMAGE_NAME} .
                docker push ${IMAGE_NAME},
                minikube image load ${IMAGE_NAME}
                '''
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh '''
                minikube kubectl -- apply -f k8s/deployment.yaml
                minikube kubectl -- apply -f k8s/service.yaml
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                minikube kubectl -- get pods
                '''
            }
        }
    }
}