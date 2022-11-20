const {deterministicPartitionKey} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns partitionKey if it exists in the event", () => {
    const partitionKey = "asdf";
    const expected = deterministicPartitionKey({partitionKey: partitionKey});
    expect(expected).toBe(partitionKey);
  });

  it("Returns partitionKey in string", () => {
    const partitionKey = 100;
    const expected = deterministicPartitionKey({partitionKey: partitionKey});
    expect(expected).toBe("100");
  });

  it("Returns hashed event if partitionKey does not exist", () => {
    const expected = deterministicPartitionKey({hello: "world"});
    expect(expected).toBe("a8034f17272123164ee10dabf4a4e2da80b1b19f585b52b9f88cce2ab87c67b067a7746c44632b27a8ad5ed9a71768551b2b9251f019ac715d5168dc06e88fa4")
  });

  it("Returns hashed partitionKey if longer than 256", () => {
    const partitionKey = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const expected = deterministicPartitionKey({partitionKey: partitionKey});
    expect(expected).toBe("f32a9423551351df0a07c0b8c20eb972367c398d61066038e16986448ebfbc3d15ede0ed3693e3905e9a8c601d9d002a06853b9797ef9ab10cbde1009c7d0f09");
  });
});
