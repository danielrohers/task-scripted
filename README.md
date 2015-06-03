# task-scripted

[Scripted'](https://www.npmjs.com/package/task-scripted) application to run JS files once.

Inspired Rails migrations, Scripted was created to run JS scripts only once, based on scripts already saved in the collection scripts in MongoDB.

Example: [1433298714535-for.js][for]
```sh
$ scripted -c for
$ scripts/1433298714535-for.js created
```

## Installation

```sh
$ npm install -g task-scripted
```

## Configuration
You must configure MongoDB, it can be done using mongoose.json or environment variable MONGO_SCRIPTED.

##### mongoose.json
```sh
$ scripted -m
```
```json
{
  "url" : "mongodb://localhost:27017/scripted"
}
```
##### Environment variable
In your .bash_profile or similar
```shell
export MONGO_SCRIPTED=mongodb://localhost:27017/scripted
```

## Command Line Options

  Usage: scripted [options]
  
  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -c, --create    Create script
    -e, --execute   Execute scripts
    -m, --mongoose  Create mongoose.json (optional)
    -s, --scripted  Create scripted-template.js (optional)

## License

[MIT](LICENSE)

[for]:https://github.com/danielrohers/task-scripted/blob/master/examples/scripts/1433298714535-for.js
