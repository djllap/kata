var NotebookNav = React.createClass({

  render: function() {
    notebooks = this.props.notebooks;

    return (
      <div className="col-sm-4">
        <div className="panel panel-info">
          <div className="panel-heading">
            <h4 className="panel-title">Your Notebooks</h4>
          </div>

          <div className="panel-body">
            <Breadcrumbs
              notebook={this.props.notebook}
              list={this.props.list}
            />

            <a className="btn btn-xs btn-raised"
              style={{float: "right"}}
              onClick={() => this.props.toggleModal("Create Notebook")}
            >
              New Notebook
            </a>

            <ul className="nav nav-pills nav-stacked">
              <div className="btn-group-vertical" style={{"width": "100%"}}>
                {notebooks.map( function (notebook) {
                  return(
                    <li key={notebook.id}
                      className="btn btn-block btn-lg"
                      onClick={() => this.props.getNotebookLists(notebook)}
                      style={{paddingRight: "12px"}}
                    >
                      {notebook.name}
                      <span style={{color: "grey", float: "right"}}>
                        <span className="btn btn-s" style={{padding: '0.15em', color: 'grey'}}>
                          <i className="material-icons" 
                            style={{fontSize: "1em", marginRight: "0.15em"}}
                            onClick={(e) => this.props.editNotebook(notebook, e)}
                          >
                            edit
                          </i>
                        </span>
                        <span className="btn btn-s" style={{padding: '0.15em', color: 'grey'}}>
                          <i 
                            className="material-icons" 
                            style={{fontSize: "1em"}}
                            onClick={(e) => this.props.deleteNotebook(notebook, e)}
                          >
                            delete
                          </i>
                        </span>
                      </span>
                    </li>
                  );
                }, this )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
