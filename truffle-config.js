module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*", // Match any network id
        gas: 6721975, // Max gas limit
        gasPrice: 20000000000, // 20 Gwei
      },
    },
    compilers: {
      solc: {
        version: "0.8.20", // Adjust your version
      },
    },
  };
  