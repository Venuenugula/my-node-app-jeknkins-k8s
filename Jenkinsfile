pipeline {
    agent any

    environment {
        IMAGE_NAME = "venuenugula/my-app"
        IMAGE_TAG  = "${BUILD_NUMBER}"
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh '''
                docker push $IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                export KUBECONFIG=$KUBECONFIG

                kubectl set image deployment/my-node-app \
                my-node-app=$IMAGE_NAME:$IMAGE_TAG || \
                kubectl apply -f k8s/deployment.yaml

                kubectl rollout status deployment/my-node-app
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                kubectl get pods
                '''
            }
        }
    }
}