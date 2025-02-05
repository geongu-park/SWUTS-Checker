import Editor from "./editor.js";
import Validator from "./validator.js";

document.addEventListener("DOMContentLoaded", () => {
  Editor.initEditor();

  document.querySelector("#runBtn").addEventListener("click", () => {
    const editorContent = Editor.getValue();
    let consoleOutput = "";

    try {
      const yamlData = Validator.parseYAML(editorContent);
      consoleOutput += Validator.validateTestSpecification(
        yamlData,
        editorContent
      );

      Editor.setValue(jsyaml.dump(yamlData, { indent: 2 }));
    } catch (error) {
      consoleOutput += `Error: ${error.message}\n`;
    }

    document.querySelector("#console").textContent = consoleOutput;
  });

  document.querySelector("#resetBtn").addEventListener("click", () => {
    Editor.resetEditor();

    const icon = document.querySelector("#resetBtn i");
    icon.classList.add("animate-spin");

    setTimeout(() => {
      icon.classList.remove("animate-spin");
      document.querySelector("#console").textContent =
        "Refresh the test specification based on the default template!";
    }, 500);
  });
});
