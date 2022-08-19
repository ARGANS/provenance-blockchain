import json
from time import sleep
import sys
import os
import pathlib
import hashlib
import subprocess

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

def writeStr(chain, key, output):
    # Writes a JSON text object string to the root stream with a given key
    mydata = '{"text": "' + output + '"}'
    obj = shellRun(chain + ["publish", "root", key, mydata])
    return obj.stdout

data_start = sys.argv[1]
if data_start == "":
    data_start = "./"

chain = ["-datadir=~/.multichain-master",
         "-port=6267", "-rpcport=6266",
         "esa-blockchain"]
clientAddress = getMyAddress(chain)
print('**********************************************************')
print(clientAddress)
print('**********************************************************')

def py_files(base):  
    for path, dirs, files in os.walk(base): 
        yield from ((path, file) for file in files if pathlib.Path(file) )
        # yield from ((path, file) for file in files if pathlib.Path(file) )

count = 0
size = 0
print("About to start")
for path, file in py_files(data_start):
    count = count + 1
    print(str(count) + ": " + path + "/" + file)
    tmp_size = os.path.getsize(path + "/" + file)
    print("Size: " + str(tmp_size))
    size = size + tmp_size

    # generate file hash
    file_hash = hashlib.sha256()
    with open(path + "/" + file, "rb") as f:
        fb = f.read(65536)
        while len(fb) > 0:
            file_hash.update(fb)
            fb = f.read(65536)
    hash = file_hash.hexdigest()

    # resp = writeStr(chain, file, hash)
    print(hash)

print()
print("Files processed: " + str(count))
print("GB processed: " + str(size/(1024*1024*1024)))

