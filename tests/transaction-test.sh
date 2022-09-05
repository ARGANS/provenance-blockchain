#!/bin/bash
# (C) 2020-2021 Keir Finlow-Bates
# See LICENSE for the licensing details of this software
start=$(date +"%T")
for i in {0..100000}; do
  echo "$i";
  multichain-cli -datadir=~/.multichain-master -port=6267 -rpcport=6266 esa-blockchain publish root '["Deletion", "7b0f35c1ac954080cc924e03c3676fe9e5e0be9b38fbc0e607af345a76495848", "cd106b2dbfd09e29c4ed3558896dc56d142c53420305985a52adf7c0a815aef2"]' '{"json": {"Type":"Deletion","Product identifier":"7b0f35c1ac954080cc924e03c3676fe9e5e0be9b38fbc0e607af345a76495848","File identifier":"cd106b2dbfd09e29c4ed3558896dc56d142c53420305985a52adf7c0a815aef2","Filename":"moses.jpg","Description":"none","Hash schema":"SHA256","Owner":"1RJ8Ki6vKos9YcKL4rRXC5cdbcM3U9WXWMSQe","Corrections":[],"color":"red"}}';
done

while true; do
  multichain-cli -datadir=~/.multichain-client -port=19255 -rpcport=19254 esa-blockchain getmempoolinfo
  echo $start
  date +"%T"
  sleep 5
done

