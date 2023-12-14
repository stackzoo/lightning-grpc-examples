const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};
const protoPath = path.join(__dirname, 'lightning.proto');
const packageDefinition = protoLoader.loadSync(protoPath, loaderOptions);

process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';

const macaroonPath = path.join(__dirname, 'macaroon.hex');
const macaroon = fs.readFileSync(macaroonPath, 'utf-8');

// Build meta data credentials
const metadata = new grpc.Metadata();
metadata.add('macaroon', macaroon);
const macaroonCreds = grpc.credentials.createFromMetadataGenerator((_args, callback) => {
  callback(null, metadata);
});

// Build ssl credentials using the cert the same as before
const lndCertPath = path.join(__dirname, 'tls.cert');
const lndCert = fs.readFileSync(lndCertPath);
const sslCreds = grpc.credentials.createSsl(lndCert);

// Combine the cert credentials and the macaroon auth credentials
// such that every call is properly encrypted and authenticated
const credentials = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);

// Pass the credentials when creating a channel
const lnrpcDescriptor = grpc.loadPackageDefinition(packageDefinition);
const lnrpc = lnrpcDescriptor.lnrpc;
const client = new lnrpc.Lightning('mynode.local:10009', credentials); //replace with your node endpoint

client.getInfo({}, (err, response) => {
  if (err) {
    console.log('Error: ' + err);
  }
  console.log('Node Alias:', response.alias);
  console.log('Node Public Key:', response.identity_pubkey);
  console.log('Node LND Version:', response.version);
  console.log('Node Active Channels:', response.num_active_channels);
});
