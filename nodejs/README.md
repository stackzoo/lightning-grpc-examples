## Lightning NodeJS gRPC

Lightning gRPC with **NodeJS**  

## Abstract
This folder contains a `node project` to demonstrate gRPC comunication with a Lightning node (LND).  
Lnd uses the gRPC protocol for communication with clients like `lncli`.  
All the files required to make this work, including [lightning.proto](https://github.com/lightningnetwork/lnd/blob/master/lnrpc/lightning.proto) are already inside the the current folder.  
You will also need the *tls certificate* and a *macaroon* with necessary permission from your node.  


## Example
Launch the program:  
```console
npm start
```  
Output sample:  
```console
> nodejs@1.0.0 start
> node main.js

Node Alias: stackzoo.io
Node Public Key: 0356db1a21dbecf14c3a3781719c9c9c4e1eee3826b67a34619c7dbe34bcafaf96
Node LND Version: 0.17.2-beta commit=v0.17.2-beta
Node Active Channels: 2
```  


