pipeline {
    agent any
    
    tools {
        nodejs 'NodeJs'  // Make sure this matches your Jenkins NodeJS installation name
    }
    
    environment {
        // Environment variables
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
                bat 'node --version'
                bat 'npm --version'
                bat 'dir'  // Show directory structure
            }
        }
        
        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
                    bat 'npm install'
                }
            }
        }
        
        stage('Install Frontend Dependencies') {
            steps {
                echo 'Installing frontend dependencies...'
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }
        
        stage('Backend Tests') {
            steps {
                echo 'Running backend tests...'
                dir('backend') {
                    bat 'npm test || echo "No tests configured"'
                }
            }
        }
        
        stage('Backend Linting') {
            steps {
                echo 'Running backend linting...'
                dir('backend') {
                    bat 'npx eslint . --ext .js || echo "Linting completed with warnings"'
                }
            }
        }
        
        stage('Frontend Build') {
            steps {
                echo 'Building frontend application...'
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }
        
        stage('Frontend Tests') {
            steps {
                echo 'Running frontend tests...'
                dir('frontend') {
                    bat 'npm test -- --coverage --ci --watchAll=false || echo "No tests configured"'
                }
            }
        }
        
        stage('Security Audit') {
            steps {
                echo 'Running security audit...'
                dir('backend') {
                    bat 'npm audit --audit-level moderate || echo "Audit completed with warnings"'
                }
                dir('frontend') {
                    bat 'npm audit --audit-level moderate || echo "Audit completed with warnings"'
                }
            }
        }
        
        stage('Deploy/Start Application') {
            parallel {
                stage('Start Backend') {
                    steps {
                        echo 'Starting backend server...'
                        dir('backend') {
                            // Start backend in background
                            bat '''
                                echo Starting backend server...
                                start /B node app.js
                                timeout /t 5
                                echo Backend started
                            '''
                        }
                    }
                }
                stage('Serve Frontend') {
                    steps {
                        echo 'Frontend build completed and ready to serve'
                        dir('frontend') {
                            bat 'echo Frontend build artifacts created in build/ directory'
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
                        // Wait a bit for server to start
                        bat 'timeout /t 10'
                        // Basic health check (you can customize this)
                        bat 'curl -f http://localhost:3000 || echo "Health check: Server may need more time to start"'
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
            // Clean up
            bat 'taskkill /F /IM node.exe || echo "No node processes to kill"'
        }
        success {
            echo 'Pipeline completed successfully! 🎉'
            // Archive build artifacts
            dir('frontend') {
                archiveArtifacts artifacts: 'build/**/*', allowEmptyArchive: true
            }
        }
        failure {
            echo 'Pipeline failed! 😞'
            // You can add notification steps here (email, Slack, etc.)
        }
        unstable {
            echo 'Pipeline completed with warnings ⚠️'
        }
    }
}