# ionic-alfresco

Alfresco ADF bindings for Ionic 2 and Angular 2

# Prerequisites

`ionic-alfresco` relies on the following:

- [alfresco-js-api](https://www.npmjs.com/package/alfresco-js-api) library v0.3.0 or later;
- `ionic 2` project configured with [SystemJS](https://github.com/systemjs/systemjs) module loader;

# Installing

Use the following command to install all required dependencies:

```sh
npm install ionic-alfresco alfresco-js-api --save
```

# Basic example

*For the sake of simplicity only important content provided in the examples below:*

**View1.html**
```html
<ion-content>
  <alf-file-view
    [nodeId]="nodeId"
    [debug]="true">
  </alf-file-view>
</ion-content>
```

**View1.ts**
```ts
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ALFRESCO_IONIC_DIRECTIVES } from 'ionic-alfresco';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  templateUrl: './file-view.html',
  directives: [ALFRESCO_IONIC_DIRECTIVES]
})
export class FileView {

  nodeId: string;

  constructor(private navParams: NavParams) {
    this.nodeId = navParams.get('nodeId');
  }
}
```

# Package content

## Services

- **ApiService**, *provides access to Alfresco JS Api instance*
- **AuthService**, *authentication service*
- **NodeService**, *ECM node management service*
- **SettingsService**, *provides access to global settings*

## Components

- **FileViewComponent**, file viewer component

## Constants

- **ALFRESCO_IONIC_PROVIDERS**, *exports all `ionic-alfresco` services*
- **ALFRESCO_IONIC_DIRECTIVES**, *exports all `ionic-alfresco` components and directives*
