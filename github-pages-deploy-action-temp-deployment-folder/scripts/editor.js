import Config from "./config.js";

const Editor = (() => {
  let editorInstance;

  function initEditor() {
    editorInstance = CodeMirror.fromTextArea(
      document.getElementById("editor"),
      {
        mode: "yaml",
        lineNumbers: true,
        theme: "default",
      }
    );
    resetEditor();
  }

  function getValue() {
    return editorInstance.getValue();
  }

  function setValue(value) {
    editorInstance.setValue(value);
  }

  function resetEditor() {
    setValue(Config.DEFAULT_TEMPLATE);
  }

  return {
    initEditor,
    getValue,
    setValue,
    resetEditor,
  };
})();

export default Editor;
