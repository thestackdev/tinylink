## Nextjs TinyURL

### DB Config

#### Schema validation

```js
db.createCollection('urls', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'source',
        'shortUrl',
        'passwordEnabled',
        'password',
        'oneTimeUse',
        'clicks',
        'createdAt',
        'expireAt',
      ],
      properties: {
        source: {
          bsonType: 'string',
          description: 'required and must be a string',
        },
        shortUrl: {
          bsonType: 'string',
          description: 'required and must be a string',
        },
        passwordEnabled: {
          bsonType: 'bool',
          description: 'required and must be a valid boolean',
        },
        password: {
          bsonType: 'string',
          description: 'required and must be a string',
        },
        oneTimeUse: {
          bsonType: 'bool',
          description: 'required and must be a valid boolean',
        },
        clicks: {
          bsonType: 'int',
          description: 'required and must be a valid int',
        },
        createdAt: {
          bsonType: 'date',
          description: 'required and must be a valid date',
        },
        expireAt: {
          bsonType: 'date',
          description: 'required and must be a valid date',
        },
      },
    },
  },
  validationLevel: 'strict',
  validationAction: 'error',
})
```

#### TTL 24 Hours

```js
db.urls.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 })
```

#### Indexing url to be unique

```js
db.urls.createIndex({ shortUrl: 1 }, { unique: true })
```
