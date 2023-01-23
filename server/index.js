const express = require("express");
const app = express();

const mysql = require("mysql2");

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const db = mysql.createConnection({
  host: "172.18.2.42",
  port: 3306,
  user: "dragan",
  password: "",
  database: "klinicki_studij",
});

app.post("/statusDodaj", (req, res) => {
  const nazivStatus = req.body.nazivStatus;
  const opisStatus = req.body.opisStatus;

  db.query(
    "INSERT INTO studij_status (naziv, opis) values (?, ?)",
    [nazivStatus, opisStatus],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/status", (req, res) => {
  db.query("SELECT * FROM studij_status", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/statusUpdate", (req, res) => {
  const id = req.body.id;
  const naziv = req.body.naziv;
  const opis = req.body.opis;

  db.query(
    "UPDATE studij_status SET naziv=?, opis=? WHERE id=? ",
    [naziv, opis, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/ulogaDodaj", (req, res) => {
  const nazivUloga = req.body.nazivUloga;
  const opisUloga = req.body.opisUloga;

  db.query(
    "INSERT INTO studij_uloga (naziv, opis) values (?, ?)",
    [nazivUloga, opisUloga],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/uloga", (req, res) => {
  db.query("SELECT * FROM studij_uloga", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/ulogaUpdate", (req, res) => {
  const id = req.body.id;
  const naziv = req.body.naziv;
  const opis = req.body.opis;

  console.log(id, naziv, opis);

  db.query(
    "UPDATE studij_uloga SET naziv=?, opis=? WHERE id=? ",
    [naziv, opis, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/ulogaEODodaj", (req, res) => {
  const nazivUloga = req.body.nazivUloga;
  const opisUloga = req.body.opisUloga;

  db.query(
    "INSERT INTO studij_ulogaEO (naziv, opis) values (?, ?)",
    [nazivUloga, opisUloga],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/ulogaEO", (req, res) => {
  db.query("SELECT * FROM studij_ulogaEO", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/ulogaEOUpdate", (req, res) => {
  const id = req.body.id;
  const naziv = req.body.naziv;
  const opis = req.body.opis;

  console.log(id, naziv, opis);

  db.query(
    "UPDATE studij_ulogaEO SET naziv=?, opis=? WHERE id=? ",
    [naziv, opis, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/clanoviEO", (req, res) => {
  db.query("SELECT * FROM studij_clanoviEO", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.post("/clanEODodaj", (req, res) => {
  const ime = req.body.ime;
  const prezime = req.body.jmbg;
  const jmbg = req.body.jmbg;
  const id_uloga = req.body.id_uloga;
  const datum_od = req.body.datumOd;
  const datum_do = req.body.datumDo;

  db.query(
    "INSERT INTO studij_clanoviEO (ime, prezime, jmbg, id_uloga, datum_od, datum_do) values (?, ?, ?, ?, ?, ?)",
    [ime, prezime, jmbg, id_uloga, datum_od, datum_do],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.put("/clanEOUpdate", (req, res) => {
  const id = req.body.id;
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const jmbg = req.body.jmbg;
  const datum_od = req.body.datumOd;
  const datum_do = req.body.datumDo;

  db.query(
    "UPDATE studij_clanoviEO SET ime=?, prezime=?, jmbg=?, datum_od=?, datum_do=? WHERE id=? ",
    [ime, prezime, jmbg, datum_od, datum_do, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/sponzorDodaj", (req, res) => {
  const nazivDobavljac = req.body.nazivDobavljac;
  const adresa = req.body.adresa;
  const drzava = req.body.drzava;
  const jib = req.body.jib;
  const telefon = req.body.telefon;
  const napomena = req.body.napomena;

  db.query(
    "INSERT INTO studij_sponzori (naziv, adresa, drzava, jib, telefon, napomena) values (?, ?, ?, ?, ?, ?)",
    [nazivDobavljac, adresa, drzava, jib, telefon, napomena],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/sponzor", (req, res) => {
  db.query("SELECT * FROM studij_sponzori", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/sponzorUpdate", (req, res) => {
  const id = req.body.id;
  const naziv = req.body.naziv;
  const adresa = req.body.adresa;
  const drzava = req.body.drzava;
  const jib = req.body.jib;
  const telefon = req.body.telefon;
  const napomena = req.body.napomena;

  db.query(
    "UPDATE studij_sponzori SET naziv=?, adresa=?, drzava=?, jib=?, telefon=?, napomena=? WHERE id=? ",
    [naziv, adresa, drzava, jib, telefon, napomena, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/studijDodaj", (req, res) => {
  const broj = req.body.broj;
  const datumOd = req.body.datumOd;
  const datumDo = req.body.datumDo;
  const opis = req.body.opis;
  const sponzorId = req.body.sponzor;
  const statusId = req.body.status;

  db.query(
    "INSERT INTO studij_opis (broj, datum_od, datum_do, opis, id_sponzora, id_statusa) values (?, ?, ?, ?, ?, ?)",
    [broj, datumOd, datumDo, opis, sponzorId, statusId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/studij", (req, res) => {
  db.query("SELECT * FROM studij_opis", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/studijUpdate", (req, res) => {
  const id = req.body.id;
  const broj = req.body.broj;
  const datumOd = req.body.datumOd;
  const datumDo = req.body.datumDo;
  const opis = req.body.opis;
  const sponzorId = req.body.sponzor;
  const statusId = req.body.status;

  db.query(
    "UPDATE studij_opis SET broj=?, datum_od=?, datum_do=?, opis=? WHERE id=? ",
    [broj, datumOd, datumDo, opis, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/centarDodaj", (req, res) => {
  const nazivCentar = req.body.nazivCentar;
  const sifraCentar = req.body.sifraCentar;
  const id_studija = req.body.id_studija;

  db.query(
    "INSERT INTO studij_centri (naziv, sifra, id_studija) values (?, ?, ?)",
    [nazivCentar, sifraCentar, id_studija],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.put("/centarUpdate", (req, res) => {
  const id = req.body.id;
  const naziv = req.body.nazivCentar;
  const sifra = req.body.sifraCentar;

  db.query(
    "UPDATE studij_centri SET naziv=?, sifra=? WHERE id=? ",
    [naziv, sifra, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/centri", (req, res) => {
  db.query("SELECT * FROM studij_centri", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.post("/korisnikDodaj", (req, res) => {
  const korisnik = req.body.imePrezime;
  const id_centra = req.body.id_centra;
  const id_uloga = req.body.id_uloga;
  const datum_od = req.body.datumOd;
  const datum_do = req.body.datumDo;
  const aktivno = req.body.aktivno;

  db.query(
    "INSERT INTO studij_korisnici (imePrezime, id_studijskog_centra, id_uloga, datum_od, datum_do, aktivno) values (?, ?, ?, ?, ?, ?)",
    [korisnik, id_centra, id_uloga, datum_od, datum_do, aktivno],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/korisnici", (req, res) => {
  db.query("SELECT * FROM studij_korisnici", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/korisnikUpdate", (req, res) => {
  const id = req.body.id;
  const imePrezime = req.body.imePrezime;
  const datum_od = req.body.datumOd;
  const datum_do = req.body.datumDo;
  const aktivno = req.body.aktivno;

  db.query(
    "UPDATE studij_korisnici SET imePrezime=?, datum_od=?, datum_do=?, aktivno=? WHERE id=? ",
    [imePrezime, datum_od, datum_do, aktivno, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/JMDodaj", (req, res) => {
  const naziv = req.body.naziv;
  const opis = req.body.opis;

  db.query(
    "INSERT INTO studij_jm (naziv, opis) values (?, ?)",
    [naziv, opis],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/jm", (req, res) => {
  db.query("SELECT * FROM studij_jm", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/JMUpdate", (req, res) => {
  const id = req.body.id;
  const naziv = req.body.naziv;
  const opis = req.body.opis;

  db.query(
    "UPDATE studij_jm SET naziv=?, opis=? WHERE id=? ",
    [naziv, opis, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/rezimCuvanjaDodaj", (req, res) => {
  const naziv = req.body.naziv;
  const opis = req.body.opis;

  db.query(
    "INSERT INTO studij_rc (naziv, opis) values (?, ?)",
    [naziv, opis],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get("/rezimCuvanja", (req, res) => {
  db.query("SELECT * FROM studij_rc", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/rezimCuvanjaUpdate", (req, res) => {
  const id = req.body.id;
  const naziv = req.body.naziv;
  const opis = req.body.opis;

  db.query(
    "UPDATE studij_rc SET naziv=?, opis=? WHERE id=? ",
    [naziv, opis, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/lijekDodaj", (req, res) => {
  const naziv = req.body.naziv;
  const sifra = req.body.sifra;
  const jmId = req.body.jmId;
  const id_rezim = req.body.id_rezim;
  const studij_id = req.body.id_studija;

  db.query(
    "INSERT INTO studij_lijekovi (naziv, sifra, jm, id_rezim, studij_id) values (?, ?, ?, ?, ?)",
    [naziv, sifra, jmId, id_rezim, studij_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/lijekovi", (req, res) => {
  db.query("SELECT * FROM studij_lijekovi", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});
app.put("/lijekUpdate", (req, res) => {
  const id = req.body.id;
  const naziv = req.body.naziv;
  const sifra = req.body.sifra;

  db.query(
    "UPDATE studij_lijekovi SET naziv=?, sifra=? WHERE id=? ",
    [naziv, sifra, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/dokumentDodaj", (req, res) => {
  const vrsta = req.body.vrsta;
  const datum = req.body.datum;
  const oznaka = req.body.oznaka;
  const id_studijskog_centra = req.body.id_studijskog_centra;
  const broj_dostavnice = req.body.broj_dostavnice;
  const id_veze = req.body.id_veze;
  const storno = req.body.storno;
  const napomena = req.body.napomena;
  const id_statusa = req.body.id_statusa;

  db.query(
    "INSERT INTO studij_dokumenti (vrsta, datum, oznaka, id_studijskog_centra,broj_dostavnice, id_veze, storno, napomena, id_status) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      vrsta,
      datum,
      oznaka,
      id_studijskog_centra,
      broj_dostavnice,
      id_veze,
      storno,
      napomena,
      id_statusa,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/dokumenti", (req, res) => {
  db.query("SELECT * FROM studij_dokumenti", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/dokumentUpdate", (req, res) => {
  const id = req.body.id;
  const oznaka = req.body.oznaka;
  const napomena = req.body.napomena;
  const id_status = req.body.id_statusa;

  db.query(
    "UPDATE studij_dokumenti SET oznaka=?, napomena=?, id_status=? WHERE id=? ",
    [oznaka, napomena, id_status, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/dokumentDetaljiDodaj", (req, res) => {
  const id_dokumenta = req.body.id_dokumenta;
  const id_lijeka = req.body.id_lijeka;
  const serja = req.body.serja;
  const rok_trajanja = req.body.rok_trajanja;
  const kod_lijeka = req.body.jk_lijeka;
  const kizlaz = req.body.kizlaz;
  const kulaz = req.body.kulaz;
  const knarudzba = req.body.knarudzba;
  const pacijent = req.body.sifra_pacijenta;
  const id_studijskog_centra = req.body.id_studijskog_centra;

  db.query(
    "INSERT INTO studij_dokumenti_detalji (id_dokumenta, id_lijeka, serija, rok_trajanja, jedinstveni_kod_lijeka, kizlaz, kulaz, knarudzba, sifra_pacijenta, id_studijskog_centra) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id_dokumenta,
      id_lijeka,
      serja,
      rok_trajanja,
      kod_lijeka,
      kizlaz,
      kulaz,
      knarudzba,
      pacijent,
      id_studijskog_centra,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});
app.get("/dokumentiDetalji", (req, res) => {
  db.query("SELECT * FROM studij_dokumenti_detalji", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/dokumentDetaljiUpdate", (req, res) => {
  const id = req.body.id;
  const serija = req.body.serija;
  const kodLijeka = req.body.kodLijeka;
  const pacijent = req.body.pacijent;

  db.query(
    "UPDATE studij_dokumenti_detalji SET serija=?, jedinstveni_kod_lijeka=?, sifra_pacijenta=? WHERE id=? ",
    [serija, kodLijeka, pacijent, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server je pokrenut");
});
