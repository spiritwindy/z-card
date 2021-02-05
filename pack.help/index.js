var browserify = require('browserify');
var fs = require("fs");
var path = require("path")
browserify({
	entries: 'App/main.js',
	debug: true,
	basedir: path.join(__dirname, ".."),
	plugin: [
		[require('esmify'), { /* ... options ... */ }],
	],
})

	.transform('vueify', {})
	.plugin('vueify/plugins/extract-css', {
		out: 'dist/bundle.css' // can also be a WritableStream
	})
	// 转成node readabel stream流，拥有pipe方法（stream流分小片段传输）
	.bundle()
	.on('error', function (error) {
		console.log(error.toString())
	})
	// 转成gulp系的stream流，node系只有content，添加名字
	.pipe(fs.createWriteStream("dist/index.js"))