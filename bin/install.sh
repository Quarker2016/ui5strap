#!/bin/bash

echo '  __  ___ ____ ______              '
echo ' / / / (_) __// __/ /________ ____ ' 
echo '/ /_/ / /__ \_\ \/ __/ __/ _ `/ _ \'
echo '\____/_/____/___/\__/_/  \_,_/ .__/'
echo '                            /_/    '                                        

echo

curDir=$(pwd)

echo Welcome to Ui5Strap installation.

echo Installing node modules for /bin ...

cd "$(dirname "$0")"

npm install

echo Installing node modules for /server ...

cd ../server

npm install

echo Installing node modules for /build/pks.ui5strap/themes ...

cd ../build/pks.ui5strap/themes

npm install

echo Installing node modules for /build/pks.ui5strap/library ...

cd ../build/pks.ui5strap/library

npm install

echo Installing node modules for /build/pks.ui5strap/release ...

cd ../build/pks.ui5strap/release

npm install

cd $curDir

read -p "Finished. Press any key to continue or wait 10 seconds ..." -t 10
