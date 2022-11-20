const crypto = require("crypto");

const getHash = (s) => {
  return crypto.createHash("sha3-512").update(s).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return getHash(JSON.stringify(event))
  }

  let candidate = event.partitionKey;
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = getHash(candidate);
  }
  return candidate;
};