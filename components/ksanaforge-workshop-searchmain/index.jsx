/** @jsx React.DOM */ 
var kse=Require("ksana-document").kse; 
var kde=Require("ksana-document").kde; 
var searchmain = React.createClass({
  mixins: Require('kse-mixins'), 
  shouldComponentUpdate:function(nextProps,nextState) {
    if (this.db && (this.db.activeFile!=this.activeFile || this.db.activeFolder!=this.activeFolder )) {
      this.dosearch(false);
      return false;
    }
    return (nextState.output!=this.state.output );
  },
  componentDidMount:function() {
    if (!this.props.db) return;
    this.db=kde.open(this.props.db);
    this.db.setContext(this);
  },
  getInitialState: function() {
    return {bar: "world", output:""};
  },
  dosearch:function(e) {
    if (!this.db)return;
    var range=null;
    if (this.activeFolder!=this.db.activeFolder && this.db.activeFolder) {
      range=this.db.folderOffset(this.db.activeFolder);
      this.activeFolder=this.db.activeFolder;
      this.db.activeFile=this.activeFile="";
    }  else if (this.activeFile!=this.db.activeFile && this.db.activeFile) {
      range=this.db.fileOffset(this.db.activeFile);
      this.activeFile=this.db.activeFile;
    }
    kse.search(this.db,this.refs.tofind.getDOMNode().value,{range:range},function(data){
      this.db.activeQuery=data;
      var that=this;
      setTimeout(function(){  
        that.setState({output:data}); 
      },100); 
      if (e) {
            that.props.action("newquery",this.props.db,data);
      }
    });
  }, 
  openpage:function(e) {
    var i=parseInt(e.target.attributes['data-i'].value);
    var excerpt=this.state.output.excerpt[i];
    console.log(excerpt);
  },
  renderExcerpt:function(excerpt,i) {
    return <div>
      <a data-i={i} onClick={this.openpage} className="btn btn-link">{"["+excerpt.pagename+"]"}</a>
      <span className="excerpt" dangerouslySetInnerHTML={{__html: excerpt.text}} ></span>
    </div>;
  }, 
  renderExcerpts:function() {
    var output=this.state.output;
    if (!output.excerpt) return null;
    return output.excerpt.map(this.renderExcerpt);
  },  
  render: function() {
    return (
      <div>
        <input className="text" ref="tofind" defaultValue="ཕྱག་"></input>
        <button className="btn btn-primary" onClick={this.dosearch}>Search</button>
        <div>{this.renderExcerpts()}</div>
      </div>
    );
  }
});
module.exports=searchmain;