## Lightning go gRPC

Lightning gRPC with **Go**  

## Abstract
This folder contains a `go file` to demonstrate gRPC comunication with a Lightning node (LND).  
Lnd uses the gRPC protocol for communication with clients like `lncli`.  
You will need the *tls certificate* and a *macaroon* with necessary permission from your node.  


## Example
Launch the program:  
```console
go run main.go
```  
Output sample:  
```console

2023/12/16 16:46:01 Connection established
2023/12/16 16:46:03 Node Alias: stackzoo.io
2023/12/16 16:46:03 Node Public Key: 0356db1a21dbecf14c3a3781719c9c9c4e1eee3826b67a34619c7dbe34bcafaf96
2023/12/16 16:46:03 Node Active channels: 3
```  


