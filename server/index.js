const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const mysql = require("mysql2");

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
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

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "sistem",
    resave: false,
    saveUninitialized: false,
    /* cookie: {
      expires: 60 * 60 * 24,
    }, */
  })
);

app.post("/logout", (req, res) => {
  res.clearCookie(req.body.name, { path: "/" });
  res.send({ message: "Cookie cleared successfully" });
});

app.post("/register", (req, res) => {
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const username = req.body.username;
  const password = req.body.password;
  const telefon = req.body.telefon;
  const pol = req.body.pol;
  const email = req.body.email;
  const jmbg = req.body.jmbg;
  const datum = req.body.datum;
  const role = req.body.role;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO studij_users (username, password, role, ime, prezime, pol, kontakt_telefon, email, jmbg, datum_rođenja) values (?, ?, ?, ?, ?, ?, ? ,? ,? ,?)",
      [username, hash, role, ime, prezime, pol, telefon, email, jmbg, datum],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.put("/usersUpdate", (req, res) => {
  const id = req.body.id;
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const telefon = req.body.telefon;
  const pol = req.body.pol;
  const email = req.body.email;
  const jmbg = req.body.jmbg;

  db.query(
    "UPDATE studij_users SET ime=?, prezime=?, kontakt_telefon=?, pol=?, email=?, jmbg=? WHERE id=? ",
    [ime, prezime, telefon, pol, email, jmbg, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM studij_users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result[0];
            console.log(req.session.user);
            res.send({
              loggedIn: true,
              user: result[0],
              message: "Prijavljen si",
            });
          } else {
            res.send({
              message: "Pogrešna kombinacija korisničkog imena i lozinke!",
            });
          }
        });
      } else {
        res.send({ message: "Korisnik ne postoji" });
      }
    }
  );
});

app.put("/updateUserPassword", (req, res) => {
  const id = req.body.id_korisnika;
  const newPassword = req.body.newPassword;

  bcrypt.hash(newPassword, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "UPDATE studij_users SET password=? WHERE id=? ",
      [hash, id],

      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

app.put("/updateUserData", (req, res) => {
  const id = req.body.id_korisnika;
  const ime = req.body.ime;
  const prezime = req.body.prezime;

  db.query(
    "UPDATE studij_users SET ime=?, prezime=? WHERE id=? ",
    [ime, prezime, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM studij_users", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
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

app.post("/dokumentiDetaljiDodaj", (req, res) => {
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

app.put("/studijStatusUpdate", (req, res) => {
  const id = req.body.id;
  const id_status = req.body.id_status;

  db.query(
    "UPDATE studij_opis SET id_statusa=? WHERE id=? ",
    [id_status, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/porukaDodaj", (req, res) => {
  const id_korisnika = req.body.id_korisnika;
  const poruka = req.body.poruka;

  db.query(
    "INSERT INTO studij_chat_poruke (id_korisnika, poruka) values (?, ?)",
    [id_korisnika, poruka],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/poruke", (req, res) => {
  db.query("SELECT * FROM studij_chat_poruke", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.post("/dokumentTrebovanjeDodaj", (req, res) => {
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
    "INSERT INTO studij_dokumenti_trebovanje (vrsta, datum, oznaka, id_studijskog_centra,broj_dostavnice, id_veze, storno, napomena, id_status) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

app.get("/dokumentiTrebovanje", (req, res) => {
  db.query("SELECT * FROM studij_dokumenti_trebovanje", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/dokumentTrebovanjeUpdate", (req, res) => {
  const id = req.body.id;
  const oznaka = req.body.oznaka;
  const napomena = req.body.napomena;
  const id_status = req.body.id_statusa;

  db.query(
    "UPDATE studij_dokumenti_trebovanje SET oznaka=?, napomena=?, id_status=? WHERE id=? ",
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

app.put("/serijeTrebovanjeUpdate", (req, res) => {
  const id = req.body.id;
  const kizlaz = req.body.kizlaz;
  const id_dokumenta_trebovanje = req.body.id_dokumenta_trebovanje;

  db.query(
    "UPDATE studij_dokumenti_detalji SET kizlaz=?, id_dokumenta_trebovanje=? WHERE id=? ",
    [kizlaz, id_dokumenta_trebovanje, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/dokumentIzlazDodaj", (req, res) => {
  const vrsta = req.body.vrsta;
  const datum = req.body.datum;
  const oznaka = req.body.oznaka;
  const id_dokumenta_trebovanje = req.body.id_dokumenta_trebovanje;
  const napomena = req.body.napomena;
  const id_statusa = req.body.id_statusa

  db.query(
    "INSERT INTO studij_dokumenti_izlaz (vrsta, datum, oznaka, id_dokumenta_trebovanje, napomena, id_statusa) values (?, ?, ?, ?, ?, ?)",
    [
      vrsta,
      datum,
      oznaka,
      id_dokumenta_trebovanje,
      napomena,
      id_statusa
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/dokumentiIzlaz", (req, res) => {
  db.query("SELECT * FROM studij_dokumenti_izlaz", (error, results) => {
    if (error) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.put("/serijeIzlazUpdate", (req, res) => {
  const id = req.body.id;
  const knarudzba = req.body.knarudzba;
  const id_dokumenta_izlaz = req.body.id_dokumenta_izlaz;

  db.query(
    "UPDATE studij_dokumenti_detalji SET knarudzba=?, id_dokumenta_izlaz=? WHERE id=? ",
    [knarudzba, id_dokumenta_izlaz, id],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/dokumentIzlazUpdate", (req, res) => {
  const id = req.body.id;
  const oznaka = req.body.oznaka;
  const napomena = req.body.napomena;
  const id_status = req.body.id_statusa;

  db.query(
    "UPDATE studij_dokumenti_izlaz SET oznaka=?, napomena=?, id_statusa=? WHERE id=? ",
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

app.listen(3001, () => {
  console.log("Server je pokrenut");
});
