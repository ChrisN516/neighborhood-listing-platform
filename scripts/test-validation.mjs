import fs from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schema = JSON.parse(
  fs.readFileSync(
    new URL("../schemas/property.schema.json", import.meta.url),
    "utf8",
  ),
);

const records = JSON.parse(
  fs.readFileSync(
    new URL("../data/generated/properties.json", import.meta.url),
    "utf8",
  ),
);

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

const validRecord = structuredClone(records[0]);

const missingId = structuredClone(validRecord);
delete missingId.property_id;

const negativePrice = structuredClone(validRecord);
negativePrice.price = -1;

const badZip = structuredClone(validRecord);
badZip.zip_code = "ABCDE";

const unknownProperty = structuredClone(validRecord);
unknownProperty.unexpected_field = "not allowed";

const testCases = [
  { name: "valid record", record: validRecord, expected: true },
  { name: "missing property ID", record: missingId, expected: false },
  { name: "negative price", record: negativePrice, expected: false },
  { name: "bad ZIP code", record: badZip, expected: false },
  { name: "unknown property", record: unknownProperty, expected: false },
];

let failures = 0;

for (const testCase of testCases) {
  const result = validate(testCase.record);
  const passed = result === testCase.expected;

  console.log(`${passed ? "PASS" : "FAIL"}: ${testCase.name}`);

  if (!passed) {
    failures += 1;
    console.log(validate.errors);
  }
}

if (failures > 0) {
  console.error(`\n${failures} validation test(s) failed.`);
  process.exit(1);
}

console.log("\nAll 5 validation tests passed.");