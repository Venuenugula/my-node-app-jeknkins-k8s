pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "venuenugula/my-app:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push ${DOCKER_IMAGE}
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                kubectl set image deployment/my-node-app \
                my-node-app=${DOCKER_IMAGE} --record
                """
            }
        }

        stage('Verify') {
            steps {
                sh "kubectl rollout status deployment/my-node-app"
            }
        }
    }
}
