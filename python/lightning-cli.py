import lnd.lightning_pb2 as ln
import lnd.lightning_pb2_grpc as lnrpc
import grpc
import os

# Due to updated ECDSA generated tls.cert we need to let gprc know that
# we need to use that cipher suite otherwise there will be a handhsake
# error when we communicate with the lnd rpc server.
os.environ["GRPC_SSL_CIPHER_SUITES"] = 'HIGH+ECDSA'

with open(os.path.expanduser('macaroon.hex'), 'r') as f:
    macaroon = f.read()

def metadata_callback(context, callback):
    # for more info see grpc docs
    callback([('macaroon', macaroon)], None)

cert = open(os.path.expanduser('tls.cert'), 'rb').read()
creds = grpc.ssl_channel_credentials(cert)

# build ssl credentials using the cert the same as before
cert_creds = grpc.ssl_channel_credentials(cert)

# now build meta data credentials
auth_creds = grpc.metadata_call_credentials(metadata_callback)

# combine the cert credentials and the macaroon auth credentials
# such that every call is properly encrypted and authenticated
combined_creds = grpc.composite_channel_credentials(cert_creds, auth_creds)

# finally pass in the combined credentials when creating a channel
channel = grpc.secure_channel('mynode.local:10009', combined_creds) # replace with your node endpoint
stub = lnrpc.LightningStub(channel)

# now every call will be made with the macaroon already included

# Uncomment the next 2 rows for printing total balance
# balance = stub.WalletBalance(ln.WalletBalanceRequest())
# print("balance: %s" % balance.total_balance)

info = stub.GetInfo(ln.GetInfoRequest())

print("Node Alias: %s" % info.alias)
print("Node Public Key: %s" % info.identity_pubkey)
print("LND Version: %s" % info.version)