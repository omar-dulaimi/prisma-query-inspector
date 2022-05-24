[![npm version](https://badge.fury.io/js/prisma-query-inspector.svg)](https://badge.fury.io/js/prisma-query-inspector)
[![npm](https://img.shields.io/npm/dt/prisma-query-inspector.svg)](https://www.npmjs.com/package/prisma-query-inspector)
[![HitCount](https://hits.dwyl.com/omar-dulaimi/prisma-query-inspector.svg?style=flat)](http://hits.dwyl.com/omar-dulaimi/prisma-query-inspector)
[![npm](https://img.shields.io/npm/l/prisma-query-inspector.svg)](LICENSE)

# Prisma Query Inspector

Prisma 2 tool to inspect all queries going to the database, formatted and with all params if any
<br />
<br />
![prisma-query-inspector](https://user-images.githubusercontent.com/11743389/158146058-ce4f103c-4a27-470d-82f6-d8d94f9a5133.png)

<p align="center">
  <a href="https://www.buymeacoffee.com/omardulaimi">
    <img src="https://cdn.buymeacoffee.com/buttons/default-black.png" alt="Buy Me A Coffee" height="41" width="174">
  </a>
</p>

# Todo List

- [x] MySQL support
- [x] PostgreSQL support
- [x] MariaDB support
- [x] SQLite support
- [x] Standard SQL support
- [x] Make UI responsive

## Table of Contents

- [Installation](#installing)
- [Usage](#usage)

## Installation

Using npm:

```bash
$ npm install prisma-query-inspector --save-dev
```

Using yarn:

```bash
$ yarn add prisma-query-inspector --dev
```

# Usage

### 1- Enable Prisma query logs

```js
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});
```
<br>

### 2- Register the query handler

```js
import { queryHandler } from "prisma-query-inspector";
prisma.$on("query", queryHandler);
```
<br>

### 3- Add a new npm script in `package.json`

```js
"inspect-queries": "prisma-query-inspector start"
```

<br>

### 4- Now run it, then run your project afterwards

```bash
npm run inspect-queries
```

<br>

### You're done!

<br>
<br>

# Available Options

- port: number - inspector server port

  - alias: `p`
  - default: `7001`

- language: string - database language used to format the queries
  - alias: `l`
  - default: `sql`
  - possible values: `sql` | `mysql` | `mariadb` | `postgresql`
