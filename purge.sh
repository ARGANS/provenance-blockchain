#!/bin/bash
# (C) 2020-2021 Keir Finlow-Bates
# See LICENSE for the licensing details of this software

# This script deletes log files, stops chains, and removes
# all blockchain instance files. Use with caution!

set -x

# delete logs
rm log-master.txt
rm log-client.txt
rm nodestore.json

# crudely kill multichaind and then delete files
pkill -9 multichaind
rm -fr ~/.multichain-master/
rm -fr ~/.multichain-client/


