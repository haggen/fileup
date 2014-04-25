// FileUp v1.0.0
// more on http://github.com/haggen/fileup
;(function(root) {

  'use strict';

  var FileUp, each, proxy;

  proxy = function(that, fn) {
    return function() {
      fn.apply(that, arguments);
    };
  };

  each = function(iterable, action) {
    for(var index in iterable) {
      if(iterable.hasOwnProperty(index)) {
        action(index, iterable[index]);
      }
    }
  };

  FileUp = function(options) {
    this.options = FileUp.options;

    each(options, proxy(this, function(key, value) {
      this.options[key] = value;
    }));

    if(this.options.endpoint === '') {
      throw new Error('Endpoint cannot be empty');
    }

    this.listeners = {};
    this.working = 0;
    this.queue = [];
    this.items = [];
  };

  FileUp.options = {

    // Limit of simultaneously uploads
    threshold: 1,

    // Upload enpoint
    endpoint: '',

    // Header to be sent with each upload
    headers: {},

    // Additional parameters to be sent with each upload
    params: function() { return {}; },

    // File field name
    field: 'file',
  };

  FileUp.prototype = {
    upload: function(index) {
      var item = this.items[index];

      item.xhr = new XMLHttpRequest();
      item.data = new FormData();

      each(this.options.headers, proxy(this, function(key, value) {
        item.xhr.setRequestHeader(key, value);
      }));

      item.xhr.addEventListener('load', proxy(this, function(e) {
        this.finish(index, 'done');
        this.emit('load', item, e);
      }));

      item.xhr.addEventListener('error', proxy(this, function(e) {
        this.finish(index, 'failed');
        this.emit('error', item, e);
      }));

      item.xhr.addEventListener('abort', proxy(this, function(e) {
        this.finish(index, 'aborted');
        this.emit('abort', item, e);
      }));

      item.xhr.upload.addEventListener('progress', proxy(this, function(e) {
        this.emit('progress', item, e);
      }));

      item.xhr.open('POST', this.options.endpoint, true);

      each(this.options.params(item), proxy(this, function(key, value) {
        item.data.append(key, value);
      }));

      item.data.append(this.options.field, item.file);

      item.xhr.send(item.data);

      item.status = 'uploading';

      this.emit('upload', item);
    },

    on: function(event, callback) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(callback);
    },

    emit: function() {
      var event, args;

      args = [].slice.call(arguments);
      event = args.shift();

      each(this.listeners[event], proxy(this, function(index, callback) {
        callback.apply(this, args);
      }));
    },

    work: function() {
      while(this.queue.length > 0 && this.working < this.options.threshold) {
        this.process(this.queue.shift());
      }
    },

    process: function(index) {
      this.working += 1;
      this.upload(index);
    },

    finish: function(index, status) {
      this.items[index].status = status;
      this.working -= 1;
      this.work();
    },

    add: function(file) {
      var item = {
        file: file,
        index: this.items.length,
        status: 'enqueued'
      };

      this.items.push(item);
      this.emit('add', item);
      this.queue.push(item.index);
    }
  };

  root.FileUp = FileUp;

})(window);