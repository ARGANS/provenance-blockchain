#!/bin/bash
# (C) 2020-2021 Keir Finlow-Bates
# See LICENSE for the licensing details of this software

# Test script that generates the four test folders with random
# large files. Takes the base folder for generating the
# data structure as a command line argument

# Note that running this can take an hour to complete
# make sure you have 700G spare disk space


cd $1
mkdir data-10M
mkdir data-1G
mkdir data-100G
mkdir data-500G

cd data-10M
echo "Generating 10MB file at $(pwd)"
dd if=<(openssl enc -aes-256-ctr -pass pass:"$(dd if=/dev/urandom bs=128 count=1 2>/dev/null | base64)" -nosalt < /dev/zero) of=file-001.zip bs=1M count=10 iflag=fullblock

cd ../data-1G
echo "Generating 1GB file at $(pwd)"
dd if=<(openssl enc -aes-256-ctr -pass pass:"$(dd if=/dev/urandom bs=128 count=1 2>/dev/null | base64)" -nosalt < /dev/zero) of=file-001.zip bs=100M count=10 iflag=fullblock

cd ../data-100G
echo "Generating 100GB file at $(pwd)"
dd if=<(openssl enc -aes-256-ctr -pass pass:"$(dd if=/dev/urandom bs=128 count=1 2>/dev/null | base64)" -nosalt < /dev/zero) of=file-001.zip bs=10G count=10 iflag=fullblock

cd ../data-500G
echo "Generating 5x 100GB files at $(pwd)"
echo "File 1 ..."
dd if=<(openssl enc -aes-256-ctr -pass pass:"$(dd if=/dev/urandom bs=128 count=1 2>/dev/null | base64)" -nosalt < /dev/zero) of=file-001.zip bs=10G count=10 iflag=fullblock
echo "File 1 ..."
dd if=<(openssl enc -aes-256-ctr -pass pass:"$(dd if=/dev/urandom bs=128 count=1 2>/dev/null | base64)" -nosalt < /dev/zero) of=file-002.zip bs=10G count=10 iflag=fullblock
echo "File 1 ..."
dd if=<(openssl enc -aes-256-ctr -pass pass:"$(dd if=/dev/urandom bs=128 count=1 2>/dev/null | base64)" -nosalt < /dev/zero) of=file-003.zip bs=10G count=10 iflag=fullblock
echo "File 1 ..."
dd if=<(openssl enc -aes-256-ctr -pass pass:"$(dd if=/dev/urandom bs=128 count=1 2>/dev/null | base64)" -nosalt < /dev/zero) of=file-004.zip bs=10G count=10 iflag=fullblock
echo "File 1 ..."
dd if=<(openssl enc -aes-256-ctr -pass pass:"$(dd if=/dev/urandom bs=128 count=1 2>/dev/null | base64)" -nosalt < /dev/zero) of=file-005.zip bs=10G count=10 iflag=fullblock

echo "Data structure generated at $1"
