 function handleFileSelect(evt) {
    
    var files = evt.target.files; // FileList object
    var theFile = files[0];
    var theText;
    
    try {
      var reader = new FileReader();
      reader.onload = function(e) {
        theText = e.target.result;
        setText(theText)
        output("LOADED FILE: " + theFile.name);
      }
      reader.readAsText(theFile);
    } catch (e) {
       output("ERROR: " + e)
    }
    
  }
  
  document.getElementById('files').addEventListener('change', handleFileSelect, false);