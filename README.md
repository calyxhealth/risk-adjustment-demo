# RiskAdjustmentDemo

Demonstration of CMS's risk adjustment model. See it running at:  
https://calyxhealth.github.io/risk-adjustment-demo/



  
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy to Github Pages
There's a bug with the graphing library used for the DAG, so until it's fixed we can't compile in 'prod' mode. Instead use the following:
```
ng build --prod --aot=false --build-optimizer=false --base-href "https://calyxhealth.github.io/risk-adjustment-demo/"
npx ngh --dir=dist/risk-adjustment-demo
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
