import { Component } from 'react';
import Main from '../Main';
import axios from 'axios';

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Alterar e Excluir'
}

const baseURL = 'http://localhost:3333/users';

const initialState = {
  user: { name: '', email: ''},
  list: []
}

class User extends Component {

  state = {...initialState};

  componentDidMount(){
    axios.get(baseURL).then(response => {
      this.setState({ list: response.data })
    })
  }

  clear(){
    this.setState({ user: initialState.user })
  }

  save(){
    const user = this.state.user;
    const method = user.id ? 'put' : 'post';
    const url = user.id ? `${baseURL}/${user.id}` : baseURL;
    axios[method](url, user).then(
      response => {
        const list = this.getUpdatedLista(response.data);
        this.setState({ user: initialState.user, list})
      }
    )
  }

  getUpdatedLista(user){
    const list = this.state.list.filter(u => u.id !== user.id);
    list.unshift(user);
    return list;
  }


  updateField(event){
    const user = {...this.state.user }
    user[event.target.name] = event.target.value;

    this.setState({ user })
  }

  renderForm(){
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <label htmlFor="">Nome</label>
            <input type="text" className="form-control"
              name="name"
              value={this.state.user.name}
              onChange={e => this.updateField(e)}
              placeholder="Digite um nome"
            />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="">Email</label>
            <input type="text" className="form-control"
              name="email"
              value={this.state.user.email}
              onChange={e => this.updateField(e)}
              placeholder="Digite um email"
            />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>
              Salvar
            </button>
            <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  load(user){
    this.setState({ user });
  }

  remove(user){
    axios.delete(`${baseURL}/${user.id}`).then(response => {
      const list = this.state.list.filter(u => u.id !== user.id);
      this.setState({ list });
    });
  }

  renderTable(){
    return (
      <table className="table mt-4">
        <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }

  renderRows(){
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }

  render(){
    return (
      <Main {...headerProps}>
        {this.renderForm()}
          <hr />
        {this.renderTable()}
      </Main>
    )
  }
}



export default User;