/** @jsx React.DOM */
var bootstrap=Require('bootstrap');
if (typeof $ =='undefined') $=Require('jquery');

var tabui=Require("tabui"); 

var styles=Require("styles")[0].markups;
var docview=Require("docview"); 
var mainmenu=Require("mainmenu"); 
var devmenu=Require("devmenu"); 
var reference=Require("referenceview"); 
var projectlist=Require("projectlist"); 
var projectview=Require("projectview");
var about=Require("about");
//sfxdfffasdfff 
var main = React.createClass({ 
  getInitialState: function() {
//    var doc=persistent.open("../node_modules/ksana-document/test/daodejin.kd")
    var tabs=[ 
      {"id":"t123","caption":"Home",
        "content":projectlist,"active":true,"notclosable":true,
        "params":{"action":this.action}},
   //   {"id":"t4","caption":"About","content":about,"notclosable":true},
//      {"id":"t456","caption":"yyy","content":docview,"params":{"msg":"hello"}},
//      {"id":"t789","caption":"zzz","content":rtab,"params":{"msg":"hello222"}}
    ];
    return {bar: "world2", tabs:tabs,pageid:1};
  },
  onSelection:function(api,start,len) {
    if (len==0) { 
      api("toggleMarkup",start,len,{type:"fullstop"});  
    } 
  },
  action:function() {
    var args = Array.prototype.slice.call(arguments);
    var type=args.shift();

    if (type==="setdoc") {
      this.setState({doc:args[0]});
    } else if (type==="prev") {
      if (this.state.pageid>1) this.setState({pageid: this.state.pageid-1});
    } else if (type==="next") {
      if (this.state.pageid<this.state.doc.pageCount-1) {
        this.setState({pageid: this.state.pageid+1});
      }
    } else if (type==="savemarkup") {
      persistent.saveMarkup(this.state.doc,function(){
        console.log("saved!!!")
      }); 
    } else if (type=="projectview") {
      this.setState({projectview:true});
    } else if (type=="openproject") {
      var proj=args[0];
      var obj={"id":"p_"+proj.shortname,"caption":proj.name,
        "content":projectview,"active":true,
        "params":{"action":this.action, project:proj}};

      this.refs.maintab.newTab(obj);
    } else if (type=="openfile") {
      var file=args[0];
      var proj=args[1];
      var template=args[2] || "docview_default";
      var docview=Require(template);

      var obj={"id":"f_"+file.shortname,"caption":proj.shortname+'/'+file.shortname,
        "content":docview,"active":true,
        "params":{"action":this.action, file:file, project:proj}};
        this.refs.maintab.newTab(obj);
    }
  },
  page:function() {
    return this.state.doc.getPage(this.state.pageid);
  },
  projectview:function() {
    if (this.state.projectview) {
      return <div>
          <projectview ref="projectview"/>
        </div>
    } else {
      return null;
    }
  },
  componentDidUpdate:function() {
    if (this.state.projectview) {
      $(this.refs.projectview.getDOMNode()).modal();
    }
  },
  newtab:function() {
    this.state.tabs.push( {"id":"t5","caption":"About","content":about,"notclosable":true})
    this.forceUpdate();
  },
   //<button onClick={this.newtab}>newtab</button>
  render:function() {
    return <div>
    <devmenu action={this.action}/>
    <tabui ref="maintab" tabs={this.state.tabs}/>
   
    </div>
  }
  /*
  render: function() {
    return (
      <div>
        {this.projectview()}
        <devmenu action={this.action}/>
        <mainmenu action={this.action}/>
        <div className="row">
          <div className="col-md-8">
          <docview 
            page={this.page()} 
            menu={contextmenu} 
            styles={styles}
            onSelection={this.onSelection}
          ></docview>
          </div>
          <div  className="col-md-4">
          <reference/>
          </div>
        </div>
      </div>
    );
  }
  */
});
module.exports=main;