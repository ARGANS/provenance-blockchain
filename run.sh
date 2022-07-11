#!/bin/bash
# (C) 2020-2021 Keir Finlow-Bates
# See LICENSE for the licensing details of this software

if [ -z $BASH_VERSION ] ; then
	echo "You must run this script using bash" 1>&2
	exit 1
fi

# uncomment for more debug info
set -x

# Proof of concept - so minimal error checking!

# check if blockchain is set up and running
# if it is not running, start it
# if it does not exist, create it

# Master nodes are run in the .multichain-master directory.
# client nodes are run in a .multichain-client directory
# ports are configured to allow two blockchain instances to work on one machine
# so we can run the master and a client on the same
# machine for debugging

# Note: we are assuming that if the master blockchain exists,
# then the relevant digital assets have been created.

if [ -e ~/.multichain-master/esa-blockchain/params.dat ]
then
  echo -e "Master blockchain already exists."
  # check if the blockchain daemon is running
  multichain-cli -datadir=~/.multichain-master -port=6267 -rpcport=6266 esa-blockchain getinfo
  if [ $? -eq 0 ]
  then
    echo -e "Master blockchain is running."
  else
    echo -e "Starting master blockchain daemon."
    # run with reindex in case there was a broken shutdown
    multichaind -datadir=~/.multichain-master -port=6267 -rpcport=6266 esa-blockchain -reindex=1 -daemon
  fi
else
  multichain-util create esa-blockchain
  # Wait for chain to be configured
  sleep 10

  # move the chain details to a new folder
  mv ~/.multichain ~/.multichain-master

  # in this section we should use sed to edit the blockchain to have the correct parameters

  # make a backup of the default parameters
  cp ~/.multichain-master/esa-blockchain/params.dat ~/.multichain-master/esa-blockchain/params.dat.old
  # change native currency award to maximum amount
  sed -i 's/first-block-reward = -1/first-block-reward = 100000000000000/g' ~/.multichain-master/esa-blockchain/params.dat
  # give miners a small reward for each block
  #sed -i 's/initial-block-reward = 0/initial-block-reward = 2048/g' ~/.multichain-master/esa-blockchain/params.dat                
  #sed -i 's/reward-halving-interval = 52560000/reward-halving-interval = 500000000/g' ~/.multichain-master/esa-blockchain/params.dat

  # change transaction fee from 0 to 1 per 1000 bytes so that all transactions require payment for anti-spam
  sed -i 's/minimum-relay-fee = 0/minimum-relay-fee = 1/g' ~/.multichain-master/esa-blockchain/params.dat
  # change display units so 1 native currency is showns (i.e. use the equivalent of satoshi, not bitcoin)
  sed -i 's/native-currency-multiple = 100000000/native-currency-multiple = 1/g' ~/.multichain-master/esa-blockchain/params.dat
  # make mining close to round-robin
  sed -i 's/mining-turnover = 0.5/mining-turnover = 0.1/g' ~/.multichain-master/esa-blockchain/params.dat
  # if we are at a future point going to use off-chain functionality, there should be an anti-spam charge
  sed -i 's/minimum-offchain-fee = 0/minimum-offchain-fee = 1/g' ~/.multichain-master/esa-blockchain/params.dat
  # set difficulty so low as to be almost negligable
  sed -i 's/pow-minimum-bits = 8/pow-minimum-bits = 4/g' ~/.multichain-master/esa-blockchain/params.dat
  # change standard port to 6267
  sed -i 's/default-network-port = [[:digit:]]\+/default-network-port = 6267/g' ~/.multichain-master/esa-blockchain/params.dat
  # change rpcport to 6266
  sed -i 's/default-rpc-port = [[:digit:]]\+/default-rpc-port = 6266/g' ~/.multichain-master/esa-blockchain/params.dat

  # then start the chain for the first time - this locks down the parameters
  multichaind -datadir=~/.multichain-master -port=6267 -rpcport=6266 esa-blockchain -daemon

  # this section allows the automatic generation of other virtual assets should they be required
  # masteraddress=$(multichain-cli game listpermissions issue | python -c "import json,sys;obj=json.load(sys.stdin);print(obj[0]['address']);")
  # sleep 5 # it can take a while for the blockchain to be ready
  # for example, this command would create 10000 tokens called gold
  # multichain-cli esa-blockchain issue $masteraddress '{"name":"gold","open":true}' 10000 1
fi

# Write the config file that makes this a master node to the config folder
echo 'export const chain = ["-datadir=~/.multichain-master",
         "-port=6267", "-rpcport=6266",
         "esa-blockchain"]' > config/config.js

echo 'export const server = "http://localhost:3000"' >> config/config.js 

# this runs the application
# first we need to switch to the right node version
. ~/.nvm/nvm.sh
nvm use 17
# then run the nextjs webserver
echo -e "Starting master node interface"
yarn run dev
