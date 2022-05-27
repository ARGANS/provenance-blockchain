#!/bin/bash
# (C) 2020-2021 Keir Finlow-Bates
# See LICENSE for the licensing details of this software

if [ -z $BASH_VERSION ] ; then
	echo "You must run this script using bash" 1>&2
	exit 1
fi

# uncomment for debug info
set -x

# Proof of concept - so minimal error checking!

# check if esa-blockchain has already been connected to
# if it is not running, start it
# if it does not exist, create it

# Master nodes are run in the default directory .multichain.
# client nodes are run in a .multichain-client directory
# ports are configured to allow two blockchain instances to work on one machine
# so we can run the master and a client on the same
# machine for debugging

# check if the blockchain node is already configured
if [ -e ~/.multichain-client/esa-blockchain/params.dat ]
then
  echo -e "ESA blockchain already exists."
  multichain-cli -datadir=~/.multichain-client -port=19255 -rpcport=19254 esa-blockchain getinfo
  if [ $? -eq 0 ]
  then
    echo -e "ESA client blockchain node is running."
  else
    echo -e "Starting client blockchain daemon."
    # run with reindex in case there was a broken shutdown
    multichaind -datadir=~/.multichain-client -port=19255 -rpcport=19254 -reindex=1 esa-blockchain -daemon
  fi

# otherwise sign up, get address activated, and start node
else
  if [ -z "$1" ]
  then
    echo -e "No blockchain address supplied: see master node website for details."
	exit 0
  else
    if [ -z "$2" ]
    then
      echo -e "No signup address supplied: see master node website for details."
	  exit 0

    else
      # create multichain client instance by connecting to master node website and run the instructions
      # provided there.
      # Then extract local address and send it to the master node webserver for automatic connection
      mkdir ~/.multichain-client
      # blockchain = $1, first argument
      myaddress=$(multichaind -datadir=~/.multichain-client -port=19255 -rpcport=19254 $1 | grep -P -i -o -m 1 '(?<=grant )\S+' | sed -r 's/^\W|\W$//g')
      echo -e "My address: $myaddress"
      # POST section to sign up
      curl --header "Content-Type: application/json" --request POST --data '{"address":"'"$myaddress"'"}' $2 
      # wait a few seconds for signup transaction to register
      sleep 10
      echo -e "Starting client blockchain daemon."
      multichaind -datadir=~/.multichain-client -port=19255 -rpcport=19254 esa-blockchain -daemon     
    fi
  fi
fi

# this runs the application

echo -e "Starting client interface"
# first we need to switch to the right node version
. ~/.nvm/nvm.sh
nvm use 17
# then run the nextjs webserver
# start local webserver and browser if current machine has a desktop
dpkg -l ubuntu-desktop
if [ "$?" -eq "0" ]; then
  google-chrome --app=http://localhost:3010 &>/dev/null &
fi

yarn run dev -p 3010



