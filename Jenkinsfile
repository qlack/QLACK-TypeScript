pipeline {
    agent {
        kubernetes {
            yaml '''
              apiVersion: v1
              kind: Pod
              metadata:
                name: qlack-typescript
                namespace: jenkins
              spec:
                affinity:
                  podAntiAffinity:
                    preferredDuringSchedulingIgnoredDuringExecution:
                    - weight: 50
                      podAffinityTerm:
                        labelSelector:
                          matchExpressions:
                          - key: jenkins/jenkins-jenkins-agent
                            operator: In
                            values:
                            - "true"
                        topologyKey: kubernetes.io/hostname
                securityContext:
                  runAsUser: 0
                  runAsGroup: 0
                containers:
                - name: qlack-typescript-builder
                  image: eddevopsd2/ubuntu-dind:dind-mvn3.8.5-jdk17-node18.16-go1.20-buildx-helm-pip
                  volumeMounts:
                  - name: docker
                    mountPath: /root/.docker
                  tty: true
                  securityContext:
                    privileged: true
                    runAsUser: 0
                    fsGroup: 0
                imagePullSecrets:
                - name: regcred
                volumes:
                - name: docker
                  persistentVolumeClaim:
                    claimName: docker-nfs-pvc
            '''
            workspaceVolume persistentVolumeClaimWorkspaceVolume(claimName: 'workspace-nfs-pvc', readOnly: false)
        }
    }
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 3, unit: 'HOURS')
    }
    environment {
        NPM_TOKEN = credentials('qlack-npm-auth-token')
    }
    stages {
        stage ('NPM Publish Form-Validation') {
            steps {
                container (name: 'qlack-typescript-builder') {
                    script {
                        env.publishFormValidation = input(message: 'Do you want to publish an npm package for the project "form-validation"?',
                                    parameters: [booleanParam(name: 'PUBLISH NPM FORM-VALIDATION', defaultValue: false, description: '')])
                    }
                }
            }
        }
        stage ('NPM Publish Forms') {
            steps {
                container (name: 'qlack-typescript-builder') {
                    script {
                        env.publishForms = input(message: 'Do you want to publish an npm package for the project "forms"?',
                                    parameters: [booleanParam(name: 'PUBLISH NPM FORMS', defaultValue: false, description: '')])
                    }
                }
            }
        }
        stage ('NPM Publish Qng-Pubsub') {
            steps {
                container (name: 'qlack-typescript-builder') {
                    script {
                        env.publishQngPubsub = input(message: 'Do you want to publish an npm package for the project "qng-pubsub"?',
                                    parameters: [booleanParam(name: 'PUBLISH NPM QNG-PUBSUB', defaultValue: false, description: '')])
                    }
                }
            }
        }
        stage ('Install-Qlack-Dependencies') {
            steps {
                container (name: 'qlack-typescript-builder') {
                    script {
                        sh 'npm install'
                        
                        if(env.publishFormValidation == 'true'){
                            dir('projects/qlack/form-validation') {
                                sh 'echo "install dependencies for qlack form-validation"'
                                sh 'npm install'
                            }
                        }
                        
                        if(env.publishForms == 'true'){
                            dir('projects/qlack/forms') {
                                sh 'echo "install dependencies for qlack forms"'
                                sh 'npm install'
                            }
                        }
                        
                        if(env.publishQngPubsub == 'true'){
                            dir('projects/qlack/qng-pubsub') {
                                sh 'echo "install dependencies for qlack qng-pubsub"'
                                sh 'npm install'
                            }
                        }
                    }
                }
            }
        }
        stage ('Build-Qlack') {
            steps {
                container (name: 'qlack-typescript-builder') {
                    script {
                        // install angular cli
                        sh 'npm install -g @angular/cli'
                        
                        if(env.publishFormValidation == 'true'){
                            dir('projects/qlack/form-validation') {
                                sh 'echo "build qlack form-validation"'
                                sh 'npx ng build --project @qlack/form-validation'
                            }
                        }

                        if(env.publishForms == 'true'){
                            dir('projects/qlack/forms') {
                                sh 'echo "build qlack forms"'
                                sh 'npx ng build --project @qlack/forms'
                            }
                        }

                        if(env.publishQngPubsub == 'true'){
                            dir('projects/qlack/qng-pubsub') {
                                sh 'echo "build qlack qng-pubsub"'
                                sh 'npx ng build --project @qlack/qng-pubsub'
                            }
                        }
                    }
                }
            }
        }
        stage ('NPM-Login') {
            steps {
                container (name: 'qlack-typescript-builder') {
                    script {
                        // Login to npm registry
                        if (env.NPM_TOKEN) {
                            sh 'echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc'
                        } else {
                            error 'NPM_TOKEN is not available. Exiting...'
                        }
                    }
                }
            }
        }
        stage ('Publish-Qlack-Form-Validation') {
            when {
                expression { env.publishFormValidation == 'true' }
            }
            steps {
                container (name: 'qlack-typescript-builder') {
                    dir('dist/qlack/form-validation') {
                        sh 'npm publish'
                    }
                }
            }
        }
        stage ('Build-Qlack-Forms') {
            when {
                expression { env.publishForms == 'true' }
            }
            steps {
                container (name: 'qlack-typescript-builder') {
                    dir('dist/qlack/forms') {
                        sh 'npm publish'
                    }
                }
            }
        }
        stage ('Build-Qlack-Form-Qng-Pubsub') {
            when {
                expression { env.publishQngPubsub == 'true' }
            }
            steps {
                container (name: 'qlack-typescript-builder') {
                    dir('dist/qlack/qng-pubsub') {
                        sh 'npm publish'
                    }
                }
            }
        }
    }
}

