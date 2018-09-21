#! /bin/bash

set -e

cachepath=".gh-pages-cache"

giturl="git@github.com:UCloud-FE/react-components.git"

if [ "$1" != '-p' ]; then
    echo "when build just use https url"
    giturl="https://github.com/UCloud-FE/react-components.git"
fi

echo "clean cache path"
if [ ! -a $cachepath ]; then
  echo "exist"
  rm -rf $cachepath
fi

echo "clone gh-pages"
mkdir $cachepath
git clone $giturl -b gh-pages $cachepath

# echo "clean old docs"
# rm -rf "${cachepath}/*"

echo "build new docs"
export STYLEGUIDE_BUILD_DIR=$cachepath
npm run build:styleguide

if [ "$1" != '-p' ]; then
    echo "only build"
else
    echo "push to gh-pages"
    cd $cachepath
    git add -A
    git commit -m "update docs"
    git push origin gh-pages
fi

echo "clean cache path"
rm -rf $cachepath
