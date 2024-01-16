const fs = require("fs");

function jsonToEnv(json, prefix = "") {
  let env = "";

  for (let key in json) {
    if (typeof json[key] === "object") {
      env += jsonToEnv(json[key], `${prefix}${key}_`);
    } else {
      env += `${prefix}${key}=${json[key]}\n`;
    }
  }

  return env;
}

fs.readFile("env.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading env.json:", err);
    return;
  }

  try {
    const json = JSON.parse(data);
    const env = jsonToEnv(json);

    fs.writeFileSync("env-file", env);

    console.log("env-file file created successfully.");
  } catch (parseError) {
    console.error("Error parsing env.json:", parseError);
  }
});