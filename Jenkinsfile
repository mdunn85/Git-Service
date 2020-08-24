pipeline {
  agent any
  stages {
    stage('build') {
      agent {
        dockerfile {
          filename 'Dockerfile'
        }

      }
      steps {
        cleanWs()
      }
    }

  }
}