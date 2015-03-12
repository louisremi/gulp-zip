'use strict';
var path = require('path');
var assert = require('assert');
var gutil = require('gulp-util');
var zip = require('./');

it('should zip files', function (cb) {
	var stream = zip('test.zip');
	var i = 0;

	stream.on('data', function (file) {
		i++;
		assert.equal(path.normalize(file.path), path.join(__dirname, 'fixture/test.zip'));
		assert.equal(file.relative, 'test.zip');
		assert(file.contents.length > 0);
	});

	stream.on('end', function () {
		assert(i ===  1);
		cb();
	});

	stream.write(new gutil.File({
		cwd: __dirname,
		base: __dirname + '/fixture',
		path: __dirname + '/fixture/fixture.txt',
		contents: new Buffer('hello world'),
		stat: {
			mtime: new Date()
		}
	}));

	stream.write(new gutil.File({
		cwd: __dirname,
		base: __dirname + '/fixture',
		path: __dirname + '/fixture/fixture2.txt',
		contents: new Buffer('hello world 2'),
		stat: {
			mtime: new Date()
		}
	}));

	stream.end();
});
