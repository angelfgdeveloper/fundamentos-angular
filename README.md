# MyStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Crear componentes
- ng g c components/img

## Abrir proyecto 
- ng serve -o

## Separar la logica de negocio - Servicios
### Inyección de dependencias
- ng g s services/store
- ng g s services/categories

## Ejemplo de API
- http://fakestoreapi.com/docs

## Crear PIPES
- ng g p pipes/reverse

## Linters - para verificar si estamos desarrollando buenas practicas
- ng lint
- copiar y pegar .. ng...

## Interceptors
- ng g interceptor interceptors/time --flat

## Descargar archivos
- npm install file-saver 
- npm install @types/file-saver --save-dev

## Crear cms
- ng g m cms --routing
- ng g c cms/pages/tasks

## Usuario puede ver que precargar por medio de la vista - QuickLink Strategy
- npm i ngx-quicklink --save

## Creacion de guardinas para proteger rutas
- ng g g guards/auth

Guards
Los Guards en Angular, son de alguna manera: middlewares que se ejecutan antes de cargar una ruta y determinan si se puede cargar dicha ruta o no. Existen 4 tipos diferentes de Guards (o combinaciones de estos) que son los siguientes:

(CanActivate) Antes de cargar los componentes de la ruta.
(CanLoad) Antes de cargar los recursos (assets) de la ruta.
(CanDeactivate) Antes de intentar salir de la ruta actual (usualmente utilizado para evitar salir de una ruta, si no se han guardado los datos).
(CanActivateChild) Antes de cargar las rutas hijas de la ruta actual.


## Correr proxy
- npm run start:proxy
