import json
from time import sleep
import sys
import os
import pathlib
import hashlib
import subprocess
import random

def shellRun(args):
    # use subprocess.run for security (we do not want to be passing
    # commands in as strings as that allows arbitrary code execution)
    result = subprocess.run(["multichain-cli"] + args,
                            capture_output=True, check=True, text=True)
    print(result, flush=True)
    return result

def getAllAddresses(chain):
    # Returns an array of all addresses registered on this node
    obj = shellRun(chain + ["listaddresses"])
    address_array = json.loads(obj.stdout)
    return address_array

def getMyAddress(chain):
    # Returns the last address from your node's list of owned addresses
    # we should only use one address per node
    address_array = getAllAddresses(chain)
    address = ""
    for item in address_array:
        if item['ismine'] is True:
            address = item['address']
    if address == "":
        sys.exit("My node has no address!")
    return address



data_start = sys.argv[1]
if data_start == "":
    data_start = "./"

chain = ["-datadir=~/.multichain-master",
         "-port=6267", "-rpcport=6266",
         "esa-blockchain"]

events = [
    "Generation",
    "ProxyGeneration",
    "Processing",
    "Merging",
    "Packaging",
    "Deletion",
    "Correction"
]

eventMatch = {
    "Generation": "green",
    "ProxyGeneration": "lime",
    "Processing": "yellow",
    "Merging": "indigo",
    "Packaging": "violet",
    "Deletion": "red",
    "Correction": "pink"
}

clientAddress = getMyAddress(chain)
print('**********************************************************')
print(clientAddress)
print('**********************************************************')

def writeStr(chain, productHash, fileHash, filename):
    # Writes a JSON text object string to the root stream with a given key
    randnum = random.randint(0, len(events) - 1)
    key = '["' + events[randnum] + '", "' + productHash + '", "' + fileHash + '"]' 
    mydata = '{"json": {"Type":"' + events[randnum] + '", "Product identifier":"' + productHash + '", "File identifier":"' + fileHash + '", "Filename": "' + filename + '", "Description": "none", "Hash schema": "SHA256", "Owner": "' + clientAddress + '", "color": "' + eventMatch.get(events[randnum]) + '"}}'
    obj = shellRun(chain + ["publish", "root", key, mydata])
    return obj.stdout


def py_files(base):  
    for path, dirs, files in os.walk(base): 
        yield from ((path, file) for file in files if pathlib.Path(file) )
        # yield from ((path, file) for file in files if pathlib.Path(file) )

count = 0
size = 0
print("About to start")
for path, myfile in py_files(data_start):
    count = count + 1
    print(str(count) + ": " + path + "/" + myfile)
    tmp_size = os.path.getsize(path + "/" + myfile)
    print("Size: " + str(tmp_size))
    size = size + tmp_size

    # generate file hash
    file_hash = hashlib.sha256()
    with open(path + "/" + myfile, "rb") as f:
        fb = f.read(65536)
        while len(fb) > 0:
            file_hash.update(fb)
            fb = f.read(65536)
    myhash = file_hash.hexdigest()
    myprod = hashlib.sha256(myhash.encode('utf-8')).hexdigest()

    # resp = writeStr(chain, myprod, myhash, myfile)
    print(myfile + ": " + myhash)

print()
print("Files processed: " + str(count))
print("GB processed: " + str(size/(1024*1024*1024)))

