#target Illustrator

var idoc = idoc;
var ilayer;
var exists = function(name) {
	var i;
	var il;
	for (i = 0, il = idoc.layers.length; i < il; i++) {
		if (idoc.layers[i].name == name) {
			return true;
		}
	}
};
var populate = function() {
	var defaults = [
		'-delay 35 -loop 0 -reverse -dispose Background -quiet -layers OptimizePlus',
		'-delay 35 -loop 0 -dispose Background -quiet -layers OptimizePlus',
		'-delay 35 -loop 0 -dispose Background -duplicate 1,-2-1 -quiet -layers OptimizePlus'
	];
	var frame;
	var start = 0;
	var offset = 35;
	var size = 30;
	var chars;
	for (option in defaults) {
		frame = idoc.textFrames.add();
		frame.position = [idoc.width + offset, -start];
		frame.contents = defaults[option];
		chars = frame.textRange.characterAttributes;
		chars.size = size;
		start += offset;
		frame.move(idoc.layers.getByName('options'), ElementPlacement.INSIDE);
	}
};
var create = function() {
	if ( ! exists('options')) {
		ilayer = idoc.layers.add()
		ilayer.name = 'options';
		populate();
		ilayer.locked = true; // Now that we’re done, lock it!
		ilayer.printable = false; // Template layer.
	} else {
		alert('Options layer already exists.')
	}
};

// Start:
create();
