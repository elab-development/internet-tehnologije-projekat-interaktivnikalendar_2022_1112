
# Interaktivni kalendar - Seminarski rad

# Korisnički zahtev
Projekat Interaktivni kalendar ima za cilj pružanje rešenja za efikasno upravljanje vremenom i organizaciju događaja.

Na osnovu zahteva korisnika, razvijen je sistem koji omogućava precizno planiranje i praćenje događaja tokom godine. Pored glavnih funkcionalnosti, kao što su kreiranje naloga, prijava, promena lozinke, kreiranje, prikazivanje, brisanje i izmena događaja, kao i prikaz korisnika i eksport fajlova u .ics formatu, u saradnji sa korisnicima otkriveni su i dodatni slučajevi korišćenja. Ovi dodaci uključuju slanje notifikacija na e-mail adrese korisnika i povezivanje sa Google Calendarom. Detalji o svim funkcionalnostima i dodatnim slučajevima korišćenja su opisani u nastavku rada.

## Opis slučajeva korišćenja

1.  ### Prijavljivanje nalogom na aplikaciju
Klikom na “Login” u navigacionom meniju otvara se forma za prijavljivanje korisnika. Korisnik na toj strani može uneti svoje podatke. Kada unese podatke i pritisne “Uloguj se” korisnik postaje prijavljen na aplikaciji ukoliko je autorizacija uspešno izvršena.

2.  ### Registrovanje naloga na aplikaciji
Ukoliko ne poseduje podatke u sistemu o njemu, korisnik se prvo mora registrovati kako bi se kasnije prijavio na sistem. To radi time što u navigacionom meniju pritisne na Login“, pa zatim pritisne opciju “Registruj se”. U tom momentu izlazi pomoćni ekran koji omogućava unos neophodnih podataka za registraciju. Ispravnim unošenjem svih neophodnih podataka i klikom na dugme “Registruj se“ korisnik uspešno pravi sebi nalog na koji se kasnije putem Login strane može prijaviti.

3.  ### Resetovanje zaboravljene šifre naloga
Ukoliko je korisnik zaboravio šifru svog naloga, može je na stranici za „Login“ resetovati. To radi tako što na toj strani klikne na link „Zaboravljena lozinka?“ gde u pomoćnom meniju može uneti svoj mejl i novu šifru. Nakon toga se šifra zaista i menja za korisnika, pa je odmah može koristiti prilikom naredne sesije prijavljivanja.

4.  ### Odjavljivanje nalogom sa aplikacije
Kada je korisnik već prijavljen na sistem, može se odjaviti sa sistema klikom na “Odjavi se” u navigacionom meniju.

5.  ### Dodavanje novog događaja u interaktivni kalendar
Korisnik obavlja funkcionalnost dodavanja novog događaja u interaktivni kalendar na istoimenoj stranici. U okviru nje je potrebno da izabere datum događaja klikom na polje u kalendaru koje odgovara tom datumu. Nakon toga, korisniku se prikazuje pomoćni ekran na kome se mogu uneti dodatne informacije o događaju koji se unosi. Popunjavanjem svih neophodnih informacija o događaju i klikom na dugme “Sačuvaj”, događaj se pamti u bazi podataka.

6.  ### Prikazivanje svih već zakazanih događaja
Korisnik može prikazati sve događaje prethodno zakazane u interaktivnom kalendaru na posebnoj stranici za to. U okviru te stranice imaće mogućnost da izmeni događaj ili ga obriše ukoliko ga je on i kreirao.

7.  ### Izmenjivanje svih već zakazanih događaja
Korisnik ima mogućnost da izmeni sve prethodno zakazane događaje u interaktivnom kalendaru. Na posebnoj stranici posvećenoj prikazu događaja, korisnik može odabrati određeni događaj i ažurirati njegove detalje prema svojim potrebama, ukoliko je on kreator tog događaja.

8.  ### Brisanje svih već zakazanih događaja
Korisnik može obrisati sve prethodno zakazane događaje koje je kreirao u interaktivnom kalendaru. Na stranici za prikaz događaja, dostupna je opcija za brisanje, koja omogućava korisniku da trajno ukloni određeni događaj iz kalendara.

9.  ### Dodavanje već zakazanog događaja u Google Calendar
Korisnik ima mogućnost da doda prethodno zakazani događaj iz interaktivnog kalendara u svoj Google Calendar. Ova funkcionalnost omogućava jednostavno sinhronizovanje događaja između platformi, osiguravajući da korisnik bude uvek obavešten o svojim obavezama na različitim uređajima putem svog Google naloga.

10.  ### Slanje notifikacije o događaju na email adresu
Korisnik može primati notifikacije o zakazanim događajima putem emaila. Klikom na dugme “Pošalji notifikaciju na email”, sistem automatski šalje obaveštenje na email adresu korisnika. Zarad ove funkcionalnosti koristi se Mailpit koji se pokreće na Dockeru.

11.  ### Eksportovanje .ics datoteke sa svim događajima
Klikom na dugme “Eksportuj .ics” korisniku se upakuju svi događaji koji su učitani iz baze podataka i omogućava mu se da zapamti .ics datoteku bilo gde na računaru.

12.  ### Prikazivanje svih registrovanih korisnika
Klikom na izbor “Korisnici” u navigacionom meniju, korisniku se prikazuju svi korisnici koji imaju nalog na aplikaciji.

13.  ### Prikazivanje detaljnih informacija o profilu korisnika
Klikom na izbor “Korisnici” u navigacionom meniju, korisniku se prikazuju svi korisnici koji imaju nalog na aplikaciji. Klikom na “Prikaži detalje” nekog od profila korisnika, prikazuje se zatim detaljan prikaz o tom korisniku sa svim dostupnim informacijama o njemu.

14.  ### Prikazivanje svih lokacija za zakazivanje događaja
Klikom na izbor “Lokacije” u navigacionom meniju, korisniku se prikazuju sve lokacije koje postoje u aplikaciji.

15.  ### Dodavanje novih lokacija za zakazivanje događaja
Kako bi korisnik mogao da dodaje nove lokacije, mora biti prijavljen kao administrator. Klikom na izbor “Lokacije” u navigacionom meniju, na samom vrhu stranice administrator može uneti nove podatke o lokaciji koju želi da unese. Klikom na dugme “Dodaj”, administrator uspešno dodaje novu lokaciju u bazu podataka.

16.  ### Izmenjivanje postojećih lokacija za zakazivanje događaja
Kako bi korisnik mogao da menja informacije o postojećim lokacijama, mora biti prijavljen kao administrator. Klikom na izbor “Lokacije” u navigacionom meniju, u prikazu svih dostupnih lokacija, administrator treba da klikne da dugme “Izmeni” unutar lokacije koju bi promenio. U tom momentu se otvara pomoćni prozor za menjanje informacija unutar koga administrator menja informacije o lokaciji i klikne da dugme “Sačuvaj izmene” radi uspešnog pamćenja u bazi podataka.

17.  ### Brisanje postojećih lokacija za zakazivanje događaja
Kako bi korisnik mogao da briše postojeće lokacije, mora biti prijavljen kao administrator. Klikom na izbor “Lokacije” u navigacionom meniju, u prikazu svih dostupnih lokacija, administrator treba da klikne da dugme “Izbriši” unutar lokacije koju bi obrisao. U tom momentu lokacija nestaje iz prikaza i to označava uspešno brisanje unosa u bazi podataka.

## Pokretanje projekta nakon kloniranja repozitorijuma

### Inicijalno podešavanje Laravela
```
cd seminarskirad
cd backendLaravel
composer install
php artisan migrate:fresh --seed
php artisan serve
```
### Inicijalno podešavanje Reacta
```
cd seminarskirad
cd frontreact
npm install
npm start
```
### Inicijalno podešavanje Dockera
```
cd seminarskirad
cd backendLaravel
docker run -d --name mailpit -p 8025:8025 -p 1025:1025 axllent/mailpit
```
