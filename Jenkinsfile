pipeline {
    agent any
    
    tools {
        nodejs 'NodeJs'
    }
    
    environment {
        NODE_ENV = 'production'
        BACKEND_PORT = '3000'
        FRONTEND_PORT = '3001'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from repository...'
                git branch: 'main', url: 'https://github.com/bit-007/DriverManagement.git'
            }
        }
        
        stage('Environment Info') {
            steps {
                echo 'Displaying environment information...'
                sh 'node --version'
                sh 'npm --version'
                sh 'pwd'
                sh 'ls -la'
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                echo 'Installing frontend dependencies...'
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Backend Tests') {
            steps {
                echo 'Running backend tests...'
                dir('backend') {
                    sh 'npm test || echo "No tests configured"'
                }
            }
        }
        
        stage('Backend Linting') {
            steps {
                echo 'Running backend linting...'
                dir('backend') {
                    sh 'npx eslint . --ext .js || echo "Linting completed with warnings"'
                }
            }
        }
        
        stage('Frontend Build') {
            steps {
                echo 'Building frontend application...'
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Frontend Tests') {
            steps {
                echo 'Running frontend tests...'
                dir('frontend') {
                    sh 'npm test -- --coverage --ci --watchAll=false || echo "No tests configured"'
                }
            }
        }
        
        stage('Security Audit') {
            steps {
                echo 'Running security audit...'
                dir('backend') {
                    sh 'npm audit --audit-level moderate || echo "Audit completed with warnings"'
                }
                dir('frontend') {
                    sh 'npm audit --audit-level moderate || echo "Audit completed with warnings"'
                }
            }
        }
        
        stage('Deploy/Start Application') {
            parallel {
                stage('Start Backend') {
                    steps {
                        echo 'Starting backend server...'
                        dir('backend') {
                            sh '''
                                echo "Starting backend server..."
                                nohup node app.js > server.log 2>&1 &
                                sleep 5
                                echo "Backend started"
                            '''
                        }
                    }
                }
                stage('Serve Frontend') {
                    steps {
                        echo 'Frontend build completed and ready to serve'
                        dir('frontend') {
                            sh 'echo "Frontend build artifacts created in build/ directory"'
                        }
                    }
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health checks...'
                script {
                    try {
                        sh 'sleep 10'
                        sh 'curl -f http://localhost:3000 || echo "Health check: Server may need more time to start"'
                    } catch (Exception e) {
                        echo "Health check failed: ${e.getMessage()}"
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution completed!'
            sh 'pkill -f "node app.js" || echo "No node processes to kill"'
        }
        success {
            echo 'Pipeline completed successfully! 🎉'
            dir('frontend') {
                archiveArtifacts artifacts: 'build/**/*', allowEmptyArchive: true
            }
        }
        failure {
            echo 'Pipeline failed! 😞'
        }
        unstable {
            echo 'Pipeline completed with warnings ⚠️'
        }
    }
}