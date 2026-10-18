import fs from "node:fs";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const schemaPath = "schemas/property.schema.json";
const dataPath = process.argv[2] ?? "data/generated/properties.json";

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const records = JSON.parse(fs.readFileSync(dataPath, "utf8"));

if (!Array.isArray(records)) {
  console.error("FAIL: The data file must contain a JSON array.");
  process.exit(1);
}

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

const validate = ajv.compile(schema);
let failureCount = 0;

records.forEach((record, index) => {
  const valid = validate(record);

  if (valid) {
    console.log(`PASS: Record ${index + 1} (${record.property_id})`);
  } else {
    failureCount += 1;
    console.error(`FAIL: Record ${index + 1} (${record.property_id ?? "unknown"})`);
    console.error(JSON.stringify(validate.errors, null, 2));
  }
});

if (failureCount > 0) {
  console.error(`${failureCount} record(s) failed validation.`);
  process.exit(1);
}

console.log(`All ${records.length} records passed validation.`);