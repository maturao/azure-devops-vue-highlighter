export default defineUnlistedScript({
  main() {
    onMonacoInitialized((monaco) => {
      const { editor } = monaco;

      const setVueModelFormatting = (model: MonacoModel) => {
        if (model.uri.path.toLowerCase().endsWith(".vue")) {
          const language = model.getLanguageIdentifier().language;

          if (language === "plaintext") {
            editor.setModelLanguage(model, "html");
          }
        }
      };

      const models = editor.getModels();
      models.forEach(setVueModelFormatting);
      editor.onDidCreateModel(setVueModelFormatting);
    });
  },
});
