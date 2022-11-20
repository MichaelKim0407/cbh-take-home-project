const crypto = require("crypto");

const getHash = (s) => {
  return crypto.createHash("sha3-512").update(s).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) {
    candidate = TRIVIAL_PARTITION_KEY;
  } else if (event.partitionKey) {
    candidate = event.partitionKey;
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = getHash(candidate);
    }
  } else {
    candidate = getHash(JSON.stringify(event));
  }

  return candidate;
};