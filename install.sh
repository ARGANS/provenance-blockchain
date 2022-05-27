#!/bin/bash
# (C) 2020-2022 Keir Finlow-Bates
# See LICENSE for the licensing details of this software

# uncomment for debugging
# set -x

# check that the correct shell is used.
if [ -z $BASH_VERSION ] ; then
	echo -e "You must run this script using bash." 1>&2
	exit 1
fi


# Make sure we are running as sudo.
if [[ $EUID -ne 0 ]]; then
	echo -e "This script must be run using sudo." 1>&2
	exit 1
fi

# check we are not running as root, as that messes
# up the pyenv install (root's is in /root, whereas
# users are in /home/$USER, and this results in the
# wrong path for pyenv.
if [[ "$SUDO_USER" == "root" ]]; then
	echo -e "This script must be not be run as root." 1>&2
	exit 1
fi

if [[ "$SUDO_USER" == "" ]]; then
	echo -e "This script must be not be run as root." 1>&2
	exit 1
fi

# Store current folder
export FOLDER=`pwd`

echo -e ""
echo -e "--------------------------------------------------------------------------------"
echo -e "Installing MultiChain                                            "
echo -e "--------------------------------------------------------------------------------"
echo -e ""

MCFILE="multichain-2.2"
echo  -e "Current multichain is ${MCFILE}"

# Check whether we need to install MultiChain
if test -x /usr/local/bin/multichaind ; then
	echo -e "MultiChain already installed"
else
	cd /tmp
	wget "https://www.multichain.com/download/${MCFILE}.tar.gz"
	tar -xvzf "${MCFILE}.tar.gz"
	cd "${MCFILE}"
	mv multichaind multichain-cli multichain-util /usr/local/bin
fi

# open the required ports for client and master nodes 
# master:
ufw allow 6267

#client:
ufw allow 19255

echo -e ""
echo -e "--------------------------------------------------------------------------------"
echo -e "Install complete. Check README.md for instructions on setting up the node"
echo -e "--------------------------------------------------------------------------------"
echo -e ""
