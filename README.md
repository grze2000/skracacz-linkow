# Skracacz linków

I wanted to learn another front-end framework. I chose Angular. I also decided to try Deno as back-end. It's a very simple project. It allows to create shorter/easier to remember links.

![](https://grzegorzbabiarz.com/img/skracacz-linkow.jpg)

## Built with

* **Angular**
* **MongoDB**
* **Deno** - simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust
* **Oak** - a middleware framework for Deno's http server, including a router middleware.

## Code structure
* `/server/` - **Back-end:** Deno app
* `/client/`- **Front-end:** Angular app

## Project setup

### Front-end

#### Run development server

```
ng serve
```

#### Build

Run `ng build` to build the project. Use the `--prod` flag for a production build.

### Back-end

[Install Deno](https://deno.land/#installation) and run project with command:
```
deno run --allow-net --allow-read --allow-write --allow-plugin --unstable app.ts
```
or using [velociraptor](https://deno.land/x/velociraptor) script:
```
vr run start
```