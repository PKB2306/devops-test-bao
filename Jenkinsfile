def notify(String msg) {
    withEnv(["MSG=${msg}"]) {
        sh '''
          curl -s -X POST "https://api.telegram.org/bot${TG_TOKEN}/sendMessage" \
            -d chat_id="${TG_CHAT}" \
            --data-urlencode text="${MSG}"
        '''
    }
}

pipeline {
    agent any

    environment {
        PROJECT    = 'devops-test'
        BRANCH     = 'main'
        SITE_URL   = 'http://localhost:8081'
        DEPLOY_DIR = '/var/www/devops-test'
        TG_TOKEN   = credentials('telegram-token')
        TG_CHAT    = credentials('telegram-chat-id')
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {
        stage('Notify Start') {
            steps {
                script { notify("🚀 DEPLOY STARTED\nProject: ${PROJECT}\nBranch: ${BRANCH}") }
            }
        }
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install Dependencies') {
            steps { sh 'npm install' }
        }
        stage('Build') {
            steps { sh 'npm run build' }
        }
        stage('Deploy') {
            steps { sh 'rsync -a --delete dist/ ${DEPLOY_DIR}/' }
        }
    }

    post {
        success {
            script { notify("✅ DEPLOY SUCCESS\nProject: ${PROJECT}\nBranch: ${BRANCH}\nURL: ${SITE_URL}") }
        }
        failure {
            script { notify("❌ DEPLOY FAILED\nProject: ${PROJECT}\nBranch: ${BRANCH}\nPlease check Jenkins.") }
        }
    }
}
