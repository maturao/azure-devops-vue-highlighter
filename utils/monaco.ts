export interface MonacoGlobal {
  editor: MonacoEditorGlobal;
}

export interface MonacoEditorGlobal {
  getModels: () => MonacoModel[];
  onDidCreateModel: (listener: (model: MonacoModel) => void) => {
    dispose: () => void;
  };
  setModelLanguage: (model: MonacoModel, language: string) => void;
}

export interface MonacoModel {
  uri: { path: string };
  getLanguageIdentifier: () => { language: string };
}

export function onMonacoInitialized(callback: (monaco: MonacoGlobal) => void) {
  const globalMonaco = (window as any).monaco as MonacoGlobal | undefined;

  if (globalMonaco?.editor?.getModels) {
    // If Monaco is already initialized, call the callback immediately
    callback(globalMonaco);
  } else {
    // If Monaco is not initialized, set up a getter/setter for the global monaco variable
    // This allows us to detect when Monaco is initialized later
    Object.defineProperties(window, {
      _monaco: {
        writable: true,
        value: undefined,
      },

      monaco: {
        get() {
          return this._monaco;
        },
        set(monaco: MonacoGlobal | undefined) {
          this._monaco = monaco;

          if (monaco?.editor?.getModels) {
            callback(monaco);
          }
        },
      },
    });
  }
}
