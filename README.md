Your task is to develop application for todo management
1. Use NgXs for state management
2. Implement form for todo creation and editing. It should be sidebar (you can use ui library of your choice or create your own implementation).
  But the form should close on click outside the form (and if form was partly filled, a confirmation popup should be present)
  A todo should have these fields: title: string, createdAt: Date, deadline: Date, status: Status.
  Possible statuses: "in Progress", "completed", "failed", "created", "delayed". Each todo should have its own color and the application should
  have two themes: light and dark (and switching between them should be easily possible).
3. Display a list of todos in main route. Angular animations should be present for each todos
  (ladder animation with a delay between each todo. If you have 10 todos, the first one is displayed with smooth animation, then
  when it half completed the second todo should start appearing with animation and so on).
4. Implement filtering system based on todo's status.
5. Implement a new route: "users" where you can see different users and after click one them - their todo list.
  So, you have two routes: "todos" for current user and "users" (which is accessible for users with "admin" rights, so a route guard must be present).
6. Implement custom structural directive which shows content for specified time (in milliseconds).
7. Implement notification service and show notification when todo is created or when a user is trying to create todo while the form is invalid.
  Angular animations for each notification should be implemented as well.
  7.5 (optional) Try to utilise custom structural directive created previously on step 6, to control display of notification.
8. Write unit tests (check that after click a form is open, then after "create" click a new todo is added, something else).
9. Configure linter (all components should be prefixes with "cmp" ("Company") and all directives should be prefixes with "app").
10. Configure git pre-hooks (husky), in such a way that before commit a linter, tests and prettier should be run.

 11. Try to use as less scss as possible and as much directives as possible.
 Remember, directives are the most idiomatic way for encapculating template logic.


# TodoListApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
