## Lightning Python gRPC

Lightning gRPC with **Python**  

## Abstract
This folder contains a `python script` to demonstrate gRPC comunication with a Lightning node (LND).  
Lnd uses the gRPC protocol for communication with clients like `lncli`.  
gRPC is based on protocol buffers and as such, we needed to compile the lnd proto file in Python before being able to use it to communicate with lnd.  
All the compiled files are inside the *lnd* directory in the root of the current folder.  
You will also need the certificate and a macaroon with necessary permission from your node.  


## Example
Launch `lightning-cli.py`:  
```console
python3 lightning-cli.py
```  
Output sample:  
```console
Node Alias: stackzoo.io
Node Public Key: 0356db1a21dbecf14c3a3781719c9c9c4e1eee3826b67a34619c7dbe34bcafaf96
LND Version: 0.17.2-beta commit=v0.17.2-beta
```  


