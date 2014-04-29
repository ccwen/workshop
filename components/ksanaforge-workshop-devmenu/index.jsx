/** @jsx React.DOM */
var surfacetest=Require("surfacetest");

var devmenu = React.createClass({
  getInitialState: function() {
    return {bar: "world"};
  },
  closeImageViewer:function() {
    if (!this.new_win) return;
    this.new_win.close();
  },
  openImageViewer:function() {
    var gui = nodeRequire('nw.gui'); 
    this.new_win = gui.Window.get(
      window.open('imageviewer.html')
    ); 
    this.new_win.isFullscreen=true; 
  }, 
  openFiles:function() { //platform dependent

  },
  surfacetest:function() {
    React.renderComponent(surfacetest(),document.getElementById("main"));
  },
  moveWindow:function() {
    //if (!this.new_win) return;
    var gui = nodeRequire('nw.gui');
    var win = gui.Window.get();
    //home
    win.moveTo(1920,-500);
     win.resizeTo(1080,500);
    //office
    win.moveTo(2420,-350)
    win.resizeTo(1380,900);
    //this.new_win.resizeTo();
    //var d=this.new_win.window.document;
    //d.getElementById("test").innerHTML="test"
  },
  render: function() {
    return (
      <div>
        <button onClick={this.moveWindow}>move window</button>
        <button onClick={this.surfacetest}>surface test</button>
      </div>
    );
  }
});
module.exports=devmenu;