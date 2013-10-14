/* ****************************************
   
   realtime-editor
   Author: Marcelo Guzman (marcelo@marceloguzman.com)
   https://github.com/marceloguzman/realtime-editor

   **************************************** */

var oldHTML = "";
var oldCSS = "";
var fontsize = 15;
var nl = "\n";
var defaultHTML = '<html>\n' + '  <body>\n' + '    <h1>Carpe Diem</h1>\n' + '    <h2>quam minimum credula postero</h2>\n' + '  </body>\n' + '</html>\n' ;



var defaultCSS = 'h1 {\n' + '    text-align: center;\n' + '   margin: auto;\n' + '}\n\n' +
				 'h2 {\n' + '    font-size: 16px;\n' + '    text-align: center;\n' + '   margin: auto;\n\n';

var cleanCSS = 'body {' + nl + 'background:#fff url("../images/document_icon.gif") no-repeat 50% 50%;' + nl + 'height: 100%;' + nl + 'width: 100%;' + nl + '}';
var cleanHTML = '<html><body>' + nl + '</body></html>';
var autorefresh=true;

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
	
	if (autorefresh==true ) {
		window.setTimeout(update, 400);
	}
} 





function clear_text(){

    var conf = confirm("Are you sure you want to clear the editor windows?");

    if(conf == true){
		editor.setValue("");
		editor2.setValue("");
		update();
    }

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
	
	$("#autorefresh").click(function(event) {
		event.preventDefault();		
		
		if (autorefresh==false) {
		autorefresh=true;
		$(this).attr("src","../images/refresh_auto.png");
		$(this).attr("title","auto refresh is ON");
		$("#refresh").css("display","none");
		window.setTimeout(update, 400);
		}else{
		autorefresh=false;
		$(this).attr("src","../images/refresh_off.png");
		$(this).attr("title","auto refresh is OFF");
		$("#refresh").css("display","block");
		}
	
	});	
			
			
$("#refresh").click(function(event) {
		event.preventDefault();					
		update();
		
		
		
	});
	
	$("#restart").click(function(event) {
		event.preventDefault();
		clear_text();
	});
	
	
	
	$("#menu").click(function() {
		$(".iconos").slideToggle();
	});
});