import Config from "./config.js";

const Validator = (() => {
  function parseYAML(yamlString) {
    try {
      const parsedData = jsyaml.load(yamlString);
      if (typeof parsedData !== "object" || parsedData === null) {
        throw new Error(
          "Invalid YAML structure: Must contain key-value pairs."
        );
      }
      return parsedData;
    } catch (e) {
      throw new Error("Invalid YAML format: " + e.message);
    }
  }

  function findLine(yamlString, field) {
    return (
      yamlString.split("\n").findIndex((line) => line.startsWith(field + ":")) +
      1
    );
  }

  function checkField(field, data, yamlString, validValues) {
    const lineNum = findLine(yamlString, field);
    if (!data[field]) {
      return `Line ${lineNum}: Missing ${field}\n`;
    } else if (
      Array.isArray(validValues) &&
      !validValues.includes(data[field])
    ) {
      return `Line ${lineNum}: Invalid ${field}: '${
        data[field]
      }' (must be one of: ${validValues.join(", ")})\n`;
    }
    return "";
  }

  function containsKorean(text) {
    return /[\u3131-\u318E\uAC00-\uD7A3]/.test(text);
  }

  function checkKoreanLines(yamlString) {
    const lines = yamlString.split("\n");
    const foundLine = lines.find((line) => containsKorean(line));

    return foundLine
      ? `Error: Korean characters are not allowed\nLine ${
          lines.indexOf(foundLine) + 1
        }: ${foundLine}`
      : "";
  }

  function validateTestSpecification(data, yamlString) {
    let errors = "";

    errors += checkKoreanLines(yamlString);
    errors += checkField("TestCaseID", data, yamlString);
    errors += checkField("TestDescription", data, yamlString);
    errors += checkField("SWUDID", data, yamlString);
    errors += checkField("SWMethodName", data, yamlString);
    errors += checkField("Note", data, yamlString);
    errors += checkField("ASIL", data, yamlString, Config.ASIL);
    errors += checkField("Status", data, yamlString, Config.Statuses);
    errors += checkField("Priority", data, yamlString, Config.Priorities);

    if (
      !data["TestMethod"] ||
      !data["TestMethod"].every((method) => Config.TestMethods.includes(method))
    ) {
      errors += `Line ${findLine(
        yamlString,
        "TestMethod"
      )}: Invalid or Missing TestMethod: '${
        data["TestMethod"]
      }' (must contain: ${Config.TestMethods.join(", ")})\n`;
    }
    if (
      !data["TCGMethod"] ||
      !data["TCGMethod"].every((method) => Config.TCGMethods.includes(method))
    ) {
      errors += `Line ${findLine(
        yamlString,
        "TCGMethod"
      )}: Invalid or Missing TCGMethod: '${
        data["TCGMethod"]
      }' (must contain: ${Config.TCGMethods.join(", ")})\n`;
    }

    return errors.length > 0 ? errors : "All checks passed!\n";
  }

  return {
    parseYAML,
    validateTestSpecification,
  };
})();

export default Validator;
