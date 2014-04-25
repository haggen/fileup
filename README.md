# FileUp

> AJAX file upload with queue.

## Browser support

FileUp was made to work on browsers with support for [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and has been tested only on the newest versions of Chrome, Firefox, Safari and IE.

If you're looking for a more robust solution with wider browser support see [FineUploader](http://fineuploader.com).

## What it will do

1. Make the asynchronous request
2. Manage the upload queue
3. Emit messages on each upload phase and progress

## What it won't do

1. Handle the response
2. Render image preview
3. Anything DOM related

## Demo

A very simple working demo: http://jsfiddle.net/haggen/xtqS2/1/

Note that JSFiddle won't let the files be uploaded but the request works nonetheless.

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

On instantiating the FileUp object you can supply one or more of the following options.

| Key         | Type       | Default | Description                                            |
|-------------|------------|---------|--------------------------------------------------------|
| threshold   | `Number`   | `1`     | Optional. Limit of simultaneous uploads.               |
| endpoint    | `String`   | _Empty_ | Required. Location to where the file will be posted.   |
| headers     | `Object`   | `{}`    | Optional. Additional request headers.                  |
| params      | `Object`   | `{}`    | Optional. Additional request parameters.               |
| field       | `String`   | `file`  | Optional. Name of the file field.                      |

### Events

| Event      | When                     | Arguments       |
|------------|--------------------------|-----------------|
| add        | A file is added.         | `item`          |
| upload     | An upload begins.        | `item`          |
| success    | An upload has succeeded. | `item`, `event` |
| error      | An upload has failed.    | `item`, `event` |
| abort      | An upload was aborted.   | `item`, `event` |
| progress   | On upload progress.      | `item`, `event` |
| done       | An upload ends.          | `item`, `event` |

## License

Licensed under [Creative Commons ShareAlike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/deed.en_US)

## Contributing

1. Fork it
2. Change it following the same coding style
3. Commit your changes with a meaningful message
4. Send pull request with your reasoning (why you changed it)
