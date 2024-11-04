pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'sonjiseokk/client'
        DOCKER_HUB_CREDENTIALS_ID = 'DOCKER_HUB_CREDENTIALS_ID'
        NETWORK_NAME = 'monitor'
        GITLAB_CREDENTIALS_ID = 'GITLAB_CREDENTIALS_ID' // GitLab 인증 정보 ID
        GITHUB_CREDENTIALS_ID = 'GITHUB_CREDENTIALS_ID'
        
        GITHUB_BACKEND_REPO_URL = "github.com/gonggibap/server.git"
        GITHUB_FRONTEND_REPO_URL = "github.com/gonggibap/client.git"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    configFileProvider([configFile(fileId: '7a5d7d98-ac9f-4166-8b8f-4ade51ea57d6', targetLocation: 'gonggibap/.env')]) {
                        // Dockerfile이 /gonggibap에 있으므로 해당 디렉토리에서 빌드
                        def app = docker.build("${DOCKER_HUB_REPO}:latest", "./gonggibap")
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_HUB_CREDENTIALS_ID}") {
                        def app = docker.image("${DOCKER_HUB_REPO}:latest")
                        app.push()
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'ubuntu', // Jenkins SSH 서버 설정 이름
                        transfers: [
                            sshTransfer(
                                sourceFiles: '', // 파일 전송이 필요 없으므로 빈 문자열
                                execCommand: """
                                    docker image prune -a -f
                                    docker pull ${DOCKER_HUB_REPO}:latest
                                    docker stop client || true
                                    docker rm client || true
                                    docker ps --filter "publish=4000" --format "{{.ID}}" | xargs -r docker stop
                                    docker ps --filter "publish=4000" --format "{{.ID}}" | xargs -r docker rm
                                    docker run -d --name client --network ${NETWORK_NAME} -p 4000:4000 -p 9209:9209 ${DOCKER_HUB_REPO}:latest
                                """,
                                remoteDirectory: '/home/ubuntu', // 원격 디렉토리
                                removePrefix: ''
                            )
                        ],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true
                    )
                ])
            }
        }
        
        stage('Update GitLab Repository') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${GITLAB_CREDENTIALS_ID}", passwordVariable: 'GITLAB_PASSWORD', usernameVariable: 'GITLAB_USERNAME'),
                                 string(credentialsId: "${GITHUB_CREDENTIALS_ID}", variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        git config --global user.email "thswltjr11@gmail.com"
                        git config --global user.name "sonjiseokk"

                        rm -rf S11P31C204

                        # Clone GitLab repository
                        
                        git clone https://${GITLAB_USERNAME}:${GITLAB_PASSWORD}@lab.ssafy.com/s11-final/S11P31C204.git
                        cd S11P31C204

                        # Add backend subtree (to ensure it remains updated)
                        git subtree pull --prefix=server https://${GITHUB_TOKEN}@${GITHUB_BACKEND_REPO_URL} main

                        # Add frontend subtree
                        git subtree pull --prefix=client https://${GITHUB_TOKEN}@${GITHUB_FRONTEND_REPO_URL} main

                        # Set remote URL for GitLab
                        git remote set-url origin https://${GITLAB_USERNAME}:${GITLAB_PASSWORD}@lab.ssafy.com/s11-final/S11P31C204.git

                        # Ensure there are changes to commit and force push
                        git add .
                        git commit -m "Update subtrees" || true
                        git push --force origin main
                    '''
                }
            }
        }


    }

    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend(color: 'good',
                message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                endpoint: 'https://meeting.ssafy.com/hooks/e61kngw88idn8gtrxuwafbxy3y',
                channel: 'GongGiBap-Jenkins')
            }
        }
        failure {
            script {
                withEnv(["LANG=en_US.UTF-8"]) {
                    def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                    def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                    mattermostSend(color: 'danger',
                    message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)",
                    endpoint: 'https://meeting.ssafy.com/hooks/e61kngw88idn8gtrxuwafbxy3y',
                    channel: 'GongGiBap-Jenkins')
                }
            }
        }
    }
}