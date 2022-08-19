#!/bin/bash
# (C) 2020-2021 Keir Finlow-Bates
# See LICENSE for the licensing details of this software
start=$(date +"%T")
for i in {0..100000}; do
  echo "$i";
  multichain-cli -datadir=~/.multichain-client -port=19255 -rpcport=19254 esa-blockchain publish root 'test2.txt' '{"text": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}';
done

while true; do
  multichain-cli -datadir=~/.multichain-client -port=19255 -rpcport=19254 esa-blockchain getmempoolinfo
  echo $start
  date +"%T"
  sleep 5
done

