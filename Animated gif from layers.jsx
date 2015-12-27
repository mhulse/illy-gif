#target illustrator
#targetengine main

/**
 * @see http://stackoverflow.com/a/14440834/922323
 * @see https://www.safaribooksonline.com/library/view/mac-os-x/0596003560/ch01s03.html
 */

function main() {
	
	var script_file = File($.fileName); // get the full path of the script
	var script_folder = script_file.path; // get the path from that
	var new_termfile = createTermFile("execute_something", script_folder);
	var result = new_termfile.execute(); // now execute the termfile
	
	$.writeln(result)
	
}
/**
 * creates a .term file
 * @param  {String} term_file_name --> the name for the .term file
 * @param  {Strin} path --> the path to the script file
 * @return {File}                the created termfile
 */
function createTermFile(term_file_name, path) {
	
	var termfile = new File(path + "/" + term_file_name + ".term");
	termfile.open("w");
	termfile.writeln(
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
		"<!DOCTYPE plist PUBLIC \"-//Apple Computer//DTD PLIST 1.0//EN\"" +
		"\"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n" +
		"<plist version=\"1.0\">\n" +
		"<dict>\n" +
		"<key>WindowSettings</key>\n" +
		"<array>\n" +
		" <dict>\n" +
		"<key>CustomTitle</key>\n" +
		"<string>My first termfile</string>\n" +
		"<key>ExecutionString</key>\n" +
		"<string>python\nprint(\"Hello World\")\nexit()</string>\n" +
		"</dict>\n" +
		"</array>\n" +
		"</dict>\n" +
		"</plist>\n");
	termfile.close();
	return termfile;
};

function processDocument(currDoc){

    doc = currDoc;
    var len = doc.layers.length;
    var fname = doc.name;
    fname = fname.substr(0,fname.lastIndexOf("."));
    fileName = "test" == "test" ? fname : "test";
    while (len--){
        
           //if layer isn't locked
        var thisLayer = doc.layers[len];
        if(thisLayer.locked == false){
            hideAllUnlocked();
            thisLayer.visible=true;
            app.redraw();


            var suffix =  false ? thisLayer.name:len;
            switch("PNG")
            {
                case "JPG":
                    exportJPG(suffix);
                    break;
                case "GIF":
                    exportGIF(suffix);
                    break;
                case"PNG":
                    exportPNG(suffix);
                    break;
                default:
                    break;
                
            }
            
            }
       }
}

function exportPNG(num){
     var exportOptions = new ExportOptionsPNG24();  
    var exportName = ("~/Desktop/foo"+"/"+ fileName+"_"+num);
    var dest = new File(exportName);
    var type = ExportType.PNG24;
     exportOptions.antiAliasing = true;
     exportOptions.artBoardClipping=true;
     exportOptions.transparency=true ;
     exportOptions.horizontalScale = 100;
     exportOptions.verticalScale = 100;
    doc.exportFile(dest,type,exportOptions); 
    }


function hideAllUnlocked(){
    var all = doc.layers.length;
    while(all--){
        if( doc.layers[all].locked==false){
        doc.layers[all].visible=false;
        }
     }
   }

main();