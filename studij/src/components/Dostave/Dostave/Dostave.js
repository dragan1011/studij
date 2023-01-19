import React, {useState, useEffect} from 'react'

import DostavaKartica from './DostavaKartica'

import classes from './Dostave.module.css'



function Dostave(props) {

  const [data, setData] = useState([])
  const [centri, setCentri] = useState([])

 

  // fetch data
  const dataFetch = async () => {
    const data = await (
      await fetch(
        "http://localhost:3001/studij"
      )
    ).json();

    // set state when the data received
    setData(data);
  };

    // fetch data centri
    const centriFetch = async () => {
      const data = await (
        await fetch(
          "http://localhost:3001/centri"
        )
      ).json();

      // set state when the data received
      setCentri(data);
    };
    
  useEffect(() => {
    dataFetch();
    centriFetch();
  }, []);




  return (
    <div className={classes.dostave}>

    <DostavaKartica centri={centri} data={data}  />
  
    </div>
  )
}

export default Dostave