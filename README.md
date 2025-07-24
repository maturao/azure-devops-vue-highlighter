# Azure Devops Vue Highlighter

Simple browser extension that adds syntax highlighting for [Vue.js SFC](https://vuejs.org/guide/scaling-up/sfc) in Azure Devops built using [WXT framework](https://wxt.dev/)

## How it works

Because Vue SFCs (*.vue files) are basically an extension of the HTML syntax, they can be simply highlighted as HTML. This extension hijacks the Azure Devops monaco editor and automatically sets the file type of all visited *.vue files from `plaintext` to `html`.
