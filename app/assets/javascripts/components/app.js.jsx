var App = React.createClass({

  getInitialState: function() {
    return {
      notebooks: this.props.notebooks,
      nav: this.props.nav,
      editing: null,
      lists: null,
      listPages: null,
      notebookPages: null,
      notebookLists: null,
      form: null,
      isModalOpen: false,
      modalContent: ""
    };
  },

  setlists: function(lists) {
    this.setState({lists: lists});
  },

  toggleModal: function(modalContent = "") {
    this.setState({isModalOpen: !this.state.isModalOpen});
    this.setState({modalContent: modalContent});
  },

  getNotebookLists: function(notebook) {
    $.ajax({
      type: "GET",
      url: '/users/' + this.props.user.id + '/notebooks/' + notebook.id ,
      success: (data) => {
        this.selectNotebook(data.lists, data.pages, notebook);
      }
    })
  },

  getListPages: function(list) {
    $.ajax({
      url: '/users/' + this.props.user.id + '/notebooks/' + list.notebook_id + '/lists/' + list.id,
      success: (data) => {
        this.selectList(data.pages, list);
        this.setState({notebookLists: data.notebookLists});
      }
    })
  },

  getNotebooks: function() {
    $.ajax({
      url: '/users/' + this.props.user.id + '/notebooks',
      success: (notebooks) => {
        this.jumpToNotebooks(notebooks);
      }
    })
  },

  selectNotebook: function(lists, pages, notebook) {
    nav = {...this.state.nav};
    nav.notebook = notebook;
    this.setState({lists: lists, notebookLists: lists, notebookPages: pages, nav: nav});
    this.jumpToNotebook(notebook);
  },

  selectList: function(pages, list) {
    nav = {...this.state.nav};
    nav.list = list;
    this.setState({listPages: pages, nav: nav});
  },

  selectPage: function(page) {
  nav = {...this.state.nav};
  nav.page = page;
  this.setState({nav: nav});
  },

  deletePage: function(page, event) {
    event.stopPropagation();

    $.ajax({
      type: "DELETE",
      url: '/users/' + this.props.user.id + '/notebooks/' + page.notebook_id + '/pages/' + page.id ,
      data: {list: this.state.nav.list},
      success: (list) => {
        this.getListPages(list);
        
      }
    })
  },

 jumpToNotebooks: function(notebooks) {
    nav = {...this.state.nav};
    nav.notebook = null;
    nav.list = null;
    this.setState({notebooks: notebooks, nav: nav});
  },

  jumpToNotebook: function(notebook) {
    nav = {...this.state.nav};
    nav.notebook = notebook;
    nav.list = null;
    this.setState({nav: nav, notebook: notebook});
  },

  editNotebook: function(notebook, event) {
    event.stopPropagation();
    this.setState({editing: notebook});
    this.toggleModal("Edit Notebook");
  },

  editList: function(list, event) {
    event.stopPropagation();
    this.setState({editing: list});
    this.toggleModal("Edit List");
  },

  editPage: function(page, event) {
    event.stopPropagation();
    this.setState({editing: page});
    this.toggleModal("Edit Page");
  },

  deleteNotebook: function(notebook, event) {
    event.stopPropagation();

    $.ajax({
      type: "DELETE",
      url: '/users/' + this.props.user.id + '/notebooks/' + notebook.id,
      success: (notebooks) => {
        this.jumpToNotebooks(notebooks);
      }
    })
  },

  deleteList: function(list, event) {
    event.stopPropagation();
    $.ajax({
      type: "DELETE",
      url: '/users/' + this.props.user.id + '/notebooks/' + list.notebook_id + '/lists/' + list.id ,
      success: (lists) => {
        this.setState({lists: lists});
      }
    })
  },

  render: function() {

    return (
      <div style={{"height": "100%", "paddingTop": "1.25em"}}>
        <Nav
          notebooks={this.state.notebooks}
          notebook={this.state.nav.notebook}
          lists={this.state.lists}
          jumpToNotebooks={this.jumpToNotebooks}
          selectNotebook={this.selectNotebook}
          getNotebookLists={this.getNotebookLists}
          deleteNotebook={this.deleteNotebook}
          toggleModal={this.toggleModal}
          editNotebook={this.editNotebook}
          getListPages={this.getListPages}
          getNotebooks={this.getNotebooks}
          jumpToNotebooks={this.jumpToNotebooks}
          list={this.state.nav.list}
          listPages={this.state.listPages}
          selectPage={this.selectPage}
          nav={this.state.nav}
          editList={this.editList}
          getAllPages={this.getAllPages}
          deleteList={this.deleteList}
          deletePage={this.deletePage}
          editPage={this.editPage}
        />
        <Technique
          page={this.state.nav.page}
          form={this.state.form}
          exitForm={this.exitForm}
        />
        <Modal
          isOpen={this.state.isModalOpen}
          toggleModal={this.toggleModal}
          modalContent={this.state.modalContent}
          user={this.props.user}
          notebook={this.state.nav.notebook}
          jumpToNotebooks={this.jumpToNotebooks}
          getNotebookLists={this.getNotebookLists}
          getListPages={this.getListPages}
          editing={this.state.editing}
          notebookPages={this.state.notebookPages}
          notebookLists={this.state.notebookLists}
          setLists={this.setLists}
          selectPage={this.selectPage}
          nav={this.state.nav}
          selectList={this.selectList}
          list={this.state.nav.list}
        >
        </Modal>
      </div>
    );
  }
});
