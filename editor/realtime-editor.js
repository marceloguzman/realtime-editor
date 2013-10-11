/* ****************************************
   
   realtime-editor
   Author: Marcelo Guzman (marcelo@marceloguzman.com)
   https://github.com/marceloguzman/realtime-editor

   **************************************** */

var oldHTML = "";
var oldCSS = "";
var fontsize = 15;
var nl = "\n";
var defaultHTML = '<html>\n<body>\n' + '<h1>Carpe Diem<\/h1>\n<\/body>\n<\/html>';
var defaultCSS = 'body h1 {\n' + '   width: 300px;\n' + '   text-align: center;\n' + '   margin: auto;\n' + '}\n';
var cleanCSS = 'body {' + nl + 'background:#fff url("../images/document_icon.gif") no-repeat 50% 50%;' + nl + 'height: 100%;' + nl + 'width: 100%;' + nl + '}';
var cleanHTML = '<html><body>' + nl + '</body></html>';

 /* ---------------------------------------------------------------------------------------------- */

function update() {

	var textarea = editor.getValue();
	var cssarea = editor2.getValue();
	var d = window.parent.frames['rightbox'].document;
	
	if (textarea == +"" && cssarea === "") {
		textarea = cleanHTML;
		cssarea = cleanCSS;
	}
	
	if ((oldHTML != textarea) || (oldCSS != cssarea)) {
		oldHTML = textarea;
		oldCSS = "<style>" + cssarea + "</style>";
		d.open();
		d.write(oldHTML + oldCSS);
		if (oldHTML.replace(/[\r\n]/g, '') == defaultHTML.replace(/[\r\n]/g, '')) d.write();
		d.close();
	}
	
	window.setTimeout(update, 400);
} 

/* ---------------------------------------------------------------------------------------------- */

jQuery(document).ready(function() {

	editor.setValue(defaultHTML);
	editor2.setValue(defaultCSS);
	update();
	
	$("#font_dec").click(function(event) {
		event.preventDefault();
		if (fontsize >= 10) fontsize -= 5;
		$(".CodeMirror").css("font-size", fontsize);
		editor.refresh();
		editor2.refresh();
	});
	
	$("#font_inc").click(function(event) {
		event.preventDefault();
		if (fontsize <= 55) fontsize += 5;
		$(".CodeMirror").css("font-size", fontsize);
		editor.refresh();
		editor2.refresh();
	});
	
	$("#restart").click(function(event) {
		event.preventDefault();
		editor.setValue("");
		editor2.setValue("");
	});
	
	$("#menu").click(function() {
		$(".iconos").slideToggle();
	});
});