# jupiter-orm

## API

#### .typeRegister(name, module)

Register new type of adapter.

**Example:**
```javascript
const jOrm = require('jupiter-orm');

jOrm.typeRegister('psql', require('jupiter-orm-sql'));
```

**Arguments**
name - { String } Type name
module - { Object } Reference to jupter orm adapter

#### .Fabric(type, options)

Return API object of adapter.

**Example:**
```javascript
const jOrm = require('jupiter-orm');

jOrm.typeRegister('psql', require('jupiter-orm-sql'));

const orm = jOrm.Fabric('psql', {
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database'
});
```

#### .query()

Return Query interface of Type

**Example:**
```javascript
const orm = jOrm.Fabric('psql', {});

orm.query().where({email: 'rastopyr@gmail.com'}).order('id').limit(10)
```

#### .exec()

Execute query, and return Promise object.

**Example:**
```javascript
const orm = jOrm.Fabric('psql', {});

orm.query().where({email: 'rastopyr@gmail.com'}).exec()
  .then(console.log.bind(console)) // consoled result of query
```
