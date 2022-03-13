[![npm version](https://badge.fury.io/js/prisma-query-inspector.svg)](https://badge.fury.io/js/prisma-query-inspector)
[![npm](https://img.shields.io/npm/dt/prisma-query-inspector.svg)](https://www.npmjs.com/package/prisma-query-inspector) 
[![npm](https://img.shields.io/npm/l/prisma-query-inspector.svg)](LICENSE)

# Prisma Query Inspector

Prisma 2 tool to inspect all queries going to the database, formatted and with all params if any

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
<br>

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

### 2- Register the query handler
<br>

```js
import { queryHandler } from "prisma-query-inspector";
prisma.$on("query", queryHandler);
```

### 3- Add a new npm script in `package.json` to run the server
<br>

```js
"inspect-queries": "prisma-query-inspector"
```
<br>

### You're done!

