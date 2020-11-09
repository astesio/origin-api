# ORIGIN-API

- First of all I would like to thank everyone for the opportunity.
  I would like to warn you that unfortunately I am not able to complete the whole process the way I would like it this week it was kind of like, going back to the office, some personal problems and finally not being able to leave the project as I really would like.

# This project using [Node.js](https://nodejs.org/en/) with [Fastify](https://www.fastify.io/) & [TypeScript](http://typescriptlang.org/)

## Included in the API

- TypeScript
- Development environment
- Tests (using Jest)
- Fastify
- Env vars config
- Linting

## Set Up

- First you need installed NodeJS. Please follow the instrunctions for this [page](https://nodejs.org/en/download/package-manager/)
- Now in the root folder install the dependencies.
  ​

```bash
npm install
```

- Start the server in development mode.
  ​

```bash
npm run dev
```

- Now you can be test the request like this

```curl
curl --request POST \
  --url http://localhost:5000/profile/risk \
  --header 'Content-Type: application/json' \
  --data '{
	"age": 31,
	"dependents": 0,
	"income": 220000.00,
	"marital_status": "married",
	"risk_questions": [1, 0, 1],
	"house": {
		"ownership_status": "mortgaged"
	},
	"vehicle": {
		"year": 2021
	}
}'
```

- Or you can you [insominia](https://insomnia.rest/) or [postman](https://www.postman.com/) this project already colletion from insomnia

```
.
├── README.md
├── newrelic.js
├── insomnia-collection  <- YOU CAN COPY THIS FILE AND IMPORT THERE
├── package-lock.json
├── package.json
```

## Backend API Development

There are a number of handy commands you can run to help with run the project.
​
|Command | Action |
|---|---|
|`npm run dev` | Run the server in dev mode
|`npm run build`| Compile TypeScript to JavaScript |
|`npm run start`| Start JavaScript from 'build' directory |
|`npm test`| Run unit tests |
|`compile-schemas`| Generate automatic Interface files, remember remove folder interface before run this command |
|`npm run lint`| Run eslint |
|`npm run lint:fix`| Run eslint in fix mode
