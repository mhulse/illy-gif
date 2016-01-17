/* jshint laxbreak:true, -W043, -W030 */
/* globals app */

// jshint ignore:start
#target illustrator
#targetengine main
// jshint ignore:end

/**
 * @@@BUILDINFO@@@ Animated GIF From Layers.jsx !Version! Fri Dec 25 2015 22:47:45 GMT-0800
 *
 * @see https://gist.github.com/mhulse/5f2fb7dbe48b65cd6861
 */

var NS = 'GIF';

this[NS] = (function(_$this, _$application, _$window, undefined) {
	
	'use strict';
	
	//----------------------------------------------------------------------
	// Private variables:
	//----------------------------------------------------------------------
	
	var _private = {};
	var _doc = null;
	var _ref = null;
	var _title = '';
	var _directory = ''; // Where does this script live?
	var _name = 'tmp';
	var _term;
	
	//----------------------------------------------------------------------
	// Private methods:
	//----------------------------------------------------------------------
	
	/**
	 * Internal init/constructor.
	 *
	 * @return {void}
	 */
	
	_private.main = function() {
		
		_private.setup();
		
		_ref = _private.palette();
		_ref.center();
		_ref.show();
		
	};
	
	_private.setup = function() {
		
		// Determine location of "temp" folder:
		_directory = new Folder(File($.fileName).path + '/' + _name);
		
		_private.directory(_directory);
		
		_term = _private.term(_directory, _name);
		
		_private.shell(_directory, _name);
		
	}
	
	/**
	 * Create palette window.
	 *
	 * @return {window} Illustrator Window object.
	 */
	
	_private.palette = function() {
		
		// Palette box setup:
		var meta = 'palette { \
			orientation: "column", \
			preferredSize: [300, ""], \
			alignChildren: ["fill", "top"], \
			margins: 15, \
			$$gif: Button { text: "Create GIF" }, \
		}';
		
		// Instanciate `Window` class with setup from above:
		var palette = new Window(meta, _title, undefined, {
			//closeButton: false
		});
		
		// Create GIF button:
		palette.$$gif.onClick = function() {
			
			// For more options, see: https://gist.github.com/mhulse/efd706ab3252b9cb6a25
			_private.btm('input', undefined, 'output'); // Queries target application and returns a result.
			
		};
		
		// Palette UI close buttons:
		palette.onClose = function() {
			
			// Remove "temp" folder:
			_private.directory(_directory, true); // Second argument is for removal.
			
		};
		
		return palette;
		
	};
	
	/**
	 * Boilerplate used to create a “BridgeTalk Message”.
	 *
	 * @param  {string} $name1   BridgeTalk input function.
	 * @param  {array}  $params1 BridgeTalk input function parameters (array values will be converted to strings).
	 * @param  {string} $name2   BridgeTalk output function.
	 * @param  {array}  $params2 BridgeTalk output function parameters.
	 * @return {void}
	 */
	
	_private.btm = function($name1, $params1, $name2, $params2) {
		
		var talk;
		
		/**
		 * Convert array to quoted strings delimited with comma.
		 *
		 * @param {array} $array Array to be "sanitized".
		 * @return {string} String value of sanitized array.
		 */
		
		function sanitize($array) {
			
			// If not an array, or if array is empty, then return an empty string. Otherwise, return quoted strings:
			return (($array.length === 0) ? '' : ('"' + $array.join('","') + '"'));
			
		};
		
		// Some defaults:
		$params1 = ($params1 instanceof Array) ? $params1 : [];
		$params2 = ($params2 instanceof Array) ? $params2 : [];
		
		if ($name1 !== undefined) {
			
			$params1 = sanitize($params1); // Arguments must be converted to strings.
			
			// Make BridgeTalk message:
			talk = new BridgeTalk();
			talk.target = 'illustrator';
			talk.body = (NS + '.' + $name1 + '.apply(null, [' + $params1 + ']);');
			
			if ($name2 !== undefined) {
				
				talk.onResult = function($result) {
					
					$params2.unshift($result); // Must be unshifted outside of function call (i.e., can't be inline with arguments in call to `apply()` below).
					
					_$this[$name2].apply(null, $params2);
					
				};
				
			}
			
			talk.send();
			
		}
		
	};
	
	_private.create = function() {
		
		var count = _doc.layers.length;
		var layer;
		
		while (count--) {
			
			layer = _doc.layers[count];
			
			if (layer.locked == false) {
				
				_private.hide();
				
				layer.visible = true;
				
				_$application.redraw();
				
				_private.make(count);
				
			}
			
		}
		
	};
	
	_private.hide = function() {
		
		var count = _doc.layers.length;
		var layer;
		
		while (count--) {
			
			layer = _doc.layers[count];
			
			if ( ! layer.locked) {
				
				layer.visible = false;
				
			}
			
		}
		
	};
	
	_private.make = function($count) {
		
		var options = new ExportOptionsPNG24();
		var destination = new File(_directory + '/' + $count);
		var type = ExportType.PNG24;
		
		options.antiAliasing = true;
		options.artBoardClipping = true;
		options.transparency = true;
		options.horizontalScale = 100;
		options.verticalScale = 100;
		
		_doc.exportFile(destination, type, options);
		
	};
	
	_private.script = function() {
		
		var result = _term.execute(); // now execute the termfile
		
	};
	
	_private.directory = function($directory, $remove) {
		
		if ( ! $directory.exists) {
			
			$directory.create();
			
		} else if ( !! $remove) {
			
			_private.clean($directory);
			
			$directory.remove();
			
		}
		
	};
	
	_private.clean = function($directory) {
		
		var file;
		
		for each (file in $directory.getFiles()) {
			
			file.remove();
			
		}
		
	};
	
	/**
	 * Creates a `.term` file.
	 *
	 * @see http://docstore.mik.ua/orelly/unix3/mac/ch01_03.htm
	 *
	 * @param {string} $name Name of the `.term` file.
	 * @param {string} $path Path to this script.
	 * @return {file} The newly created `.term` file.
	 */
	
	_private.term = function($path, $name) {
		
		var script = [
			'<?xml version="1.0" encoding="UTF-8"?>',
			'<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
			'<plist version="1.0">',
				'<dict>',
					'<key>WindowSettings</key>',
					'<array>',
						'<dict>',
							'<key>name</key>',
							'<string>My first termfile</string>',
							'<key>ExecutionString</key>',
							'<string>TMP=' + $path + '/' + $name + '.sh; chmod u+x $TMP; source $TMP;</string>',
						'</dict>',
					'</array>',
				'</dict>',
			'</plist>'
		].join('\n');
		
		return _private.file($path + '/' + $name + '.term', script);
		
	};
	
	_private.shell = function($path, $name) {
		
		var script = [
			'#!/usr/bin/env bash\n', // Newline after shebang required for shell script to work.
			'cd ' + $path + '/;',
			'convert -delay 35 -loop 0 *.png ' + $name + '.gif;',
			'qlmanage -p ' + $name + '.gif >& /dev/null;',
			'exit;'
		].join('\n');
		
		return _private.file($path + '/' + $name + '.sh', script);
		
	};
	
	/**
	 * Create file encoded as UTF-8 with Unix line endings.
	 *
	 * @see https://github.com/fabiantheblind/extendscript/wiki/Create-And-Read-Files
	 *
	 * @param {string} $file Absolute path (including file name itself) to desired file's location.
	 * @param {string} $string Contents to be written to file.
	 * @return File object.
	 */
	
	_private.file = function($file, $string) {
		
		var f = new File($file);
		
		f.encoding = 'UTF-8';
		f.lineFeed = 'Unix'; // Convert to UNIX lineFeed
		// term.lineFeed = 'Windows';
		// term.lineFeed = 'Macintosh';
		
		f.open('w');
		f.writeln($string);
		f.close();
		
		return f;
		
	};
	
	//----------------------------------------------------------------------
	// Public methods:
	//----------------------------------------------------------------------
	
	/**
	 * Constructor.
	 *
	 * @param  {string} $title Title of palette window.
	 * @return {void}
	 */
	
	_$this.init = function($title) {
		
		// Open document(s)?
		if (_$application.documents.length > 0) {
			
			// Yup, so setup local globals:
			_title = $title;
			_doc = _$application.activeDocument;
			
			// Begin the program:
			_private.main(); // Only run if there's at least one document open.
			
		} else {
			
			// Nope, let the user know what they did wrong:
			_$window.alert('You must open at least one document.');
			
		}
		
	};
	
	/**
	 * Re-starts script (called from BridgeTalk).
	 *
	 * @return {void}
	 */
	
	_$this.input = function() {
		
		_private.create();
		
	};
	
	_$this.output = function() {
		
		_private.script();
		
	}
	
	//----------------------------------------------------------------------
	// Return public API:
	//----------------------------------------------------------------------
	
	return _$this;
	
}((this[NS] || {}), app, Window));

//----------------------------------------------------------------------
// Initialize plugin:
//----------------------------------------------------------------------

this[NS].init('Animated GIF From Layers');
