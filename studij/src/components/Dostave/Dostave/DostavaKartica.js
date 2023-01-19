import React, {useState} from 'react'

import CentarBiranjeModal from './CentarBiranjeModal/CentarBiranjeModal'

import Centar from '../Centar'

import TopMenuButton from '../../UI/TopMenuButton/TopMenuButton'

import classes from './DostavaKartica.module.css'
import { StatusiRed } from './DostavaRed'
import JedinicaMjere from '../JedinicaMjere/JedinicaMjere/JedinicaMjere'
import RezimCuvanja from '../RezimCuvanja/RezimCuvanja/RezimCuvanja'

export default function DijetaTabela(props) {

  const [edit, setEdit] = useState(false)
  const [showCentar, setShowCentar] = useState(true)
  const [modalData, setModalData] = useState([])
  const [centarId, setCentarId] = useState('')
  const [studijId, setStudijId] = useState('')


  const [active, setActive] = useState('Ulaz')

  const setSelectedHandler = naziv => {
    setActive(naziv);
  }


  const openModalHandler = (data) => {
    setModalData(data)
    setEdit(true)
  }




  return (
    <div>
       {edit && <CentarBiranjeModal centarId={setCentarId} showCentar={()=> setShowCentar(false)} centri={props.centri} refresh={props.refresh} title="Biranje centra" data={modalData} closeModal={()=> setEdit(false)} />}
       {!edit && !showCentar && <Centar studijId={studijId} centarId={centarId} showCentar={()=> setShowCentar(true)} closeCentar={()=> setEdit(false)} />}

       {showCentar && <div className={classes.component}>
<div className={classes.menuLook}>
    <TopMenuButton name={'Ulaz'} activ={active} select={setSelectedHandler}><div className={classes.ispravljenje}>Ulaz</div></TopMenuButton>
    <TopMenuButton name={'RezimCuvanja'} activ={active} select={setSelectedHandler}><div className={classes.ispravljenje}>Režim čuvanja</div></TopMenuButton>
    <TopMenuButton name={'jm'} activ={active} select={setSelectedHandler}><div className={classes.ispravljenje}>Jedinica mjere</div></TopMenuButton>
</div>


   {active === 'Ulaz' && <div className={classes.studiji}>  {props.data.sort((a,b) => +a.broj > +b.broj ? 1 : -1).map(item =>
         <StatusiRed studijId={setStudijId} key={item.id} {...item} open={openModalHandler}></StatusiRed>
         )} </div> }
    {active === 'RezimCuvanja' && <RezimCuvanja />}
    {active === 'jm' && <JedinicaMjere />} 

 </div>}


      
    </div>
  )
}
