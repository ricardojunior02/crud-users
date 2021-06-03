import Main from '../Main';

const Home = props => {
  return (
    <Main icon="home"  title="Inicio" subtitle="Segundo projeto no capitulo de react">
      <div className="display-4">Bem Vindo!</div>
      <hr />
      <p className="mb-0">Sistema para exemplificar a construção de um cadastro desenvolvido em React!! </p>
    </Main>
  )
}

export default Home;