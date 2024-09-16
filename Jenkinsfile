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
        stage ('Install-Qlack-Dependencies') {
            steps {
                container (name: 'qlack-typescript-builder') {
                    sh 'npm install'

                    dir('projects/qlack/form-validation') {
                        sh 'npm install'
                    }
                    dir('projects/qlack/forms') {
                        sh 'npm install'
                    }
                    dir('projects/qlack/qng-pubsub') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage ('Build-Qlack') {
            steps {
                container (name: 'qlack-typescript-builder') {
                    dir('projects/qlack/form-validation') {
                        sh 'ng build --project @qlack/form-validation'
                    }
                    dir('projects/qlack/forms') {
                        sh 'ng build --project @qlack/forms'
                    }
                    dir('projects/qlack/qng-pubsub') {
                        sh 'ng build --project @qlack/qng-pubsub'
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
        // stage ('Publish-Qlack-Form-Validation') {
        //     steps {
        //         container (name: 'qlack-typescript-builder') {
        //             dir('dist/qlack/form-validation') {
        //                 sh 'npm publish'
        //             }
        //         }
        //     }
        // }
        // stage ('Build-Qlack-Forms') {
        //     steps {
        //         container (name: 'qlack-typescript-builder') {
        //             dir('dist/qlack/forms') {
        //                 sh 'npm publish'
        //             }
        //         }
        //     }
        // }
        // stage ('Build-Qlack-Form-Qng-Pubsub') {
        //     steps {
        //         container (name: 'qlack-typescript-builder') {
        //             dir('dist/qlack/qng-pubsub') {
        //                 sh 'npm publish'
        //             }
        //         }
        //     }
        // }
    }
}

