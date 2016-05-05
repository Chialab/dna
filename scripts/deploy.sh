#!/bin/bash

set -e

TAG=$(node -p "require('./package.json').version")
BUILD_DIR="./dist"
REPO_DIR="./deploy"
DIST_DIR="${REPO_DIR}/lib"
REPO_URL="gitlab.com:dna-components/dna-library.git"
BRANCH="master"
if [ $1 == "--beta" ]; then
    BRANCH="beta"
fi

# build distribution scripts
npm run build
if [ -d "$BUILD_DIR" ]; then
    # clone distribution repo
    rm -rf $REPO_DIR
    git clone -b $BRANCH $REPO_URL $REPO_DIR
    # empty lib dir
    rm -rf $DIST_DIR
    # copy distribution files
    cp -R $BUILD_DIR $DIST_DIR
    # update distribution project
    if [ -d "$REPO_DIR" ]; then
        cd $REPO_DIR
        sed "s/\"version\": \".*\"/\"version\": \"${TAG}\"/" package.json | diff -p package.json /dev/stdin | patch
        sed "s/\"version\": \".*\"/\"version\": \"${TAG}\"/" bower.json | diff -p bower.json /dev/stdin | patch
        git add .
        git commit -m "release: ${TAG}"
        git push
        if [ $1 == "--beta" ]; then
            git status
            npm publish --tag beta
        else
            git tag -a ${TAG} -m "release: ${TAG}"
            git push origin $TAG
            npm publish
        fi
        cd ..
        rm -rf $REPO_DIR
    fi
fi
