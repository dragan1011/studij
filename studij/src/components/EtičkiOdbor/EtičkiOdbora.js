import React, {useState, useEffect} from 'react'

import TopMenuButton from '../UI/TopMenuButton/TopMenuButton'

import Studiji from './Studiji/Studij/Studiji'
/* import Statusi from './Statusi/Statusi/Statusi'
import Dobavljaci from './Dobavljaci/Dobavljaci/Dobavljaci'
import Uloge from './Uloge/Uloge/Uloge'
import Clanovi from './ČlanoviEO/Korisnici'
import UlogeEO from './UlogeEO/Uloge/Uloge'
 */
import classes from './EtičkiOdbor.module.css'

function Administracija() {

  const [active, setActive] = useState('Studiji')

  const setSelectedHandler = naziv => {
    setActive(naziv);
  }

 /*  useEffect(()=> {
    document.addEventListener('keydown', hideOnEscape, true)
  }, [])

  const hideOnEscape = (e) =>{
    if (e.key === "1") {
      setActive('Studiji')
    }else if (e.key === "2") {
      setActive('Statusi')
    }else if (e.key === "3") {
      setActive('Dobavljaci')
    }else if (e.key === "4") {
      setActive('Uloge')
    }
  } 

 */
  return (
    <div className={classes.component}>

<div className={classes.menuLook}>
    <TopMenuButton name={'Studiji'} activ={active} select={setSelectedHandler}><div className={classes.ispravljenje}>Studiji</div></TopMenuButton>
    {/* <TopMenuButton name={'Statusi'} activ={active} select={setSelectedHandler}><div className={classes.ispravljenje}>Statusi</div></TopMenuButton>
    <TopMenuButton name={'Dobavljaci'} activ={active} select={setSelectedHandler}><div className={classes.ispravljenje}>Sponzori</div></TopMenuButton>
    <TopMenuButton name={'Uloge'} activ={active} select={setSelectedHandler}><div className={classes.ispravljenje}>Uloge</div></TopMenuButton>
    <TopMenuButton name={'ClanoviEO'} activ={active} select={setSelectedHandler}><div className={classes.ispravljenje}>Članovi EO</div></TopMenuButton>
    <TopMenuButton name={'UlogeEO'} activ={active} select={setSelectedHandler}><div className={classes.ispravljenje}>Uloge EO</div></TopMenuButton> */}
</div>
    {active === 'Studiji' && <Studiji />}
{/*     {active === 'Statusi' && <Statusi />}
    {active === 'Dobavljaci' && <Dobavljaci />}
    {active === 'Uloge' && <Uloge />}
    {active === 'ClanoviEO' && <Clanovi />}
    {active === 'UlogeEO' && <UlogeEO />} */}

    </div>
  )
}

export default Administracija