# Provenance Blockchain

This has been tested on Ubuntu 20.04 only.

This repository provides a sample setup for a blockchain-backed key-value database system, using MultiChain (http://www.multichain.com) as the backend blockchain, and NextJS as the frontend.

The system implements a very open version of a permissioned blockchain, in that anyone can sign up and send or retrieve transactions key/value data pairs on the blockchain, however only permissioned nodes can "mine" blocks. A native currency is used for spam prevention, in that every transaction requires one native currency unit for the transaction to be included.

The mining difficulty is set extremely low (a standard PC can find a block in a few seconds) and does not change: this is a workaround for what appears to be a requirement in Multichain that proof of work is used when supporting native currency.

A faucet page that allows participants to send native currency to others is included.



## Installation
For either master or client run:

     sudo ./install.sh
     
This sets up the relevant Python virtual environment and installs the required packages.

To run the node, execute:

    ./run.sh
    
This starts a local webserver. See http://localhost:3000/

## Firewall rules
The blockchchain instances can only connect to the network if the relevant firewall ports have been opened. The instances are set to the following defaults:

master:
 node port: 6267
 rpc port : 6266

client:
 node port: 19255
 rpc port : 19254

The install.sh script automatically opens these ports.
