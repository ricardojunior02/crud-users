import Header from '../Header';
import './styles.css'
const Main = props => {
  return (
    <>
      <Header {...props} />
      <main className="content container-fluid">
        <div className="p-3 mt-3">
          {props.children}
        </div>
      </main>
    </>
  )
}

export default Main;