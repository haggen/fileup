# FileUp

> AJAX file upload with queue.

## Browser support

FileUp was made to work on browsers with support for [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and has been tested only on the newest versions of Chrome, Firefox, Safari and IE.

If you're looking for a more robust solution with wider browser support see [FineUploader](http://fineuploader.com).

## What it will do

1. Make the asynchronous request
2. Manage the upload queue
3. Notify listeners of each upload phase and progress

## What it won't do

1. Handle the response
2. Render image preview
3. Anything DOM related

## Usage

### The interface

Everything starts instantiating a new `FileUp` object.

```javascript
var uploader = new FileUp({endpoint: '...'});
```

Once you setup an uploader you can call the following methods:

| Method | Arguments                               | Description                 |
|--------|-----------------------------------------|-----------------------------|
| add    | `[File file]`                           | Add file to the queue.      |
| on     | `[String event]`, `[Function callback]` | Listen to given event.      |
| work   | _No arguments_                          | Begin processing the queue. |

Plus, you have access to the following properties:

_TODO: table of properties_

The `endpoint` option is the only required key, the other options will be assumed. You can check the default options and a list of possible keys below.

### Options

The possible options (with each default value) you can supply an uploader are:

| Key         | Type       | Default                     | Description                                                                 |
|-------------|------------|-----------------------------|-----------------------------------------------------------------------------|
| threshold   | `Number`   | `1`                         | Optional. Limit of simultaneously uploads.                                  |
| endpoint    | `String`   | _Empty_                     | Required. Location to where the data will be posted.                        |
| headers     | `Object`   | `{}`                        | Optional. Request headers.                                                  |
| params      | `Function` | `function() { return {}; }` | Optional. Additional parameters will be set per item through this function. |
| field       | `String`   | `file`                      | Optional. Name for file field.                                              |

### Events

| Event      | Fired                          | Arguments                   |
|------------|--------------------------------|-----------------------------|
| load       | After upload is complete.      | `item`, `event`             |
| error      | After upload has failed.       | `item`, `event`             |
| abort      | After upload was aborted.      | `item`, `event`             |
| progress   | Each upload progress.          | `item`, `event`             |
| upload     | Right after the upload begins. | `item`                      |
| add        | After file is added.           | `item`                      |

## License

Licensed under [Creative Commons ShareAlike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/deed.en_US)

## Contributing

1. Fork it
2. Change it following the same coding style
3. Commit your changes with a meaningful message
4. Send pull request with your reasoning (why you changed it)
