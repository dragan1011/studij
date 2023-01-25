import { Fragment,useState ,useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './Centri.module.css';

import AddCentarModal from './Centri/AddCentarModal/AddCentarModal'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CentriTabela from './Centri/CentriTabela'
import KorisniciTabela from './Korisnici/KorisniciTabela'

const ModalOverlay = (props) => {

  
  const [searchTerm, setSearchTerm] = useState('')
  const [searchUser, setSearchUser] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState([])

  const modal = () => {
    setIsModal(true)
    document.body.style.overflow = 'hidden'
   }

  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

  const hideOnEscape = (e) =>{
    if (e.key === "Escape") {
      close();
    }
  } 


  const notify = () => {
    toast.success('Uspješno izmijenjeno!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      
  }


  const search = (data) => {
    return data.filter(
     (item)=> 
     item.naziv.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.sifra.toString().toLowerCase().includes(searchTerm.toLowerCase())
   ) 
 }
 const searchUserFunc = (data) => {
  return Array.from(korisnici).filter(
   (item)=> 
   item.imePrezime.toString().toLowerCase().includes(searchUser.toLowerCase()) 
 ) 
}

        // fetch data centri
        const dataFetch = async () => {
          const data = await (
            await fetch(
              "http://localhost:3001/centri"
            )
          ).json();
    
          // set state when the data received
          setData(data);
        };
  
        const [korisnici, setKorisnici] = useState('')
        
        // fetch data korisnici
        const korisniciFetch = async () => {
          const data = await (
            await fetch(
              "http://localhost:3001/korisnici"
            )
          ).json();
    
          // set state when the data received
          setKorisnici(data);
        };
  
        const [uloga, setUloga] =useState('')
        // fetch data korisnici
        const ulogaFetch = async () => {
          const data = await (
            await fetch(
              "http://localhost:3001/uloga"
            )
          ).json();
    
          // set state when the data received
          setUloga(data);
        };
    
      useEffect(() => {
        dataFetch();
        korisniciFetch()
        ulogaFetch();
      }, [refresh]);
    
      const refreshFunc = () => {
    
        setRefresh(prev => !prev) 
      
      }

   const close = () => {
    props.closeModal(false)
    document.body.style.overflow = 'visible'
   }

   const [centarId, setCentarId] = useState('')

   const handleData = childData => {
    setCentarId(childData)
   }

  return (
    <div>
      <ToastContainer />
      <div onClick={() => {props.closeModal(false)}} className={classes.backdrop} />
      <div className={`${classes.modal} ${classes.card}`}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
          <h3>Broj studija: {props.data.broj}</h3>
        </header>
        <div className={classes.content}>
       
       <div className={classes.left}> <div className={classes.components}>
     <input type="text"  onChange={event => {setSearchTerm(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
     <button  onClick={modal}  className={classes.add}>Dodaj novi centar</button>
    { isModal && <AddCentarModal data={props.data}  refresh={refreshFunc}  closeModal={setIsModal} title="Dodaj novi centar" />}
        </div> 
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.half}`}>Naziv</div>
    <div className={`${classes.heading} ${classes.half}`}>Šifra</div>
  </div>
      <CentriTabela centarId={handleData} studijData={props.data}  refresh={refreshFunc}  data={(search(data))}  />
</div>
       <div className={classes.right}>
       <div className={classes.components}>
     <input type="text"  onChange={event => {setSearchUser(event.target.value)}} placeholder='Brza pretraga...' className={classes.search} />
        </div> 
    <div className={classes.row_heading}>
    <div className={`${classes.heading} ${classes.half}`}>Korisnik</div>
    <div className={`${classes.heading} ${classes.half}`}>Centar</div>
    <div className={`${classes.heading} ${classes.half}`}>Uloga</div>
    <div className={`${classes.heading} ${classes.half}`}>Datum od</div>
    <div className={`${classes.heading} ${classes.half}`}>Datum do</div>
    <div className={`${classes.heading} ${classes.half}`}>Status</div>
  </div>
      <KorisniciTabela uloga={uloga} centarId={centarId} centri={data} studijData={props.data}  refresh={refreshFunc}  data={(searchUserFunc(korisnici))}  />

       </div>
       </div>
   <footer className={classes.actions}>
          <button  onClick={() => {props.closeModal(false)}} className={classes.close}>Zatvori</button>
        </footer>
    
       
      </div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay data={props.data} closeModal={props.closeModal} title={props.title}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;