pipeline {
  agent any
  stages {
//     stage('Build') {
//       steps {
//         echo 'building...'
//         sh 'make setup'
//       }
//     }
//     stage('Test') {
//       steps {
//         echo 'testing...'
//         sh 'make test'
//       }
//     }
//     stage('Lint') {
//       steps {
//         echo 'linting...'
//         sh 'make lint'
//       }
//     }
    stage('Deploying') {
      environment {
        AWS_ACCESS_KEY_ID = credentials('jenkins-aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
        AWS_REGION = 'eu-west-2'
      }
      steps {
        echo 'deploying to AWS...'
        sh 'npm run deploy'
      }
    }
    stage('Cleanup') {
      steps {
         cleanWs()
      }
    }
  }
}
