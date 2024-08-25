# Interaktivni kalendar - Laravel domaći

Aplikacija je kreirana na temu interaktivnog kalendara unutar Laravel framework-a. Glavni akteri unutar same aplikacije jesu događaji koje je potrebno kreirati na budućoj platformi, lokacije gde će se događaji održavati i sami korisnici.

Jedan korisnik može imati definisano više različitih događaja na svom nalogu. Jedan događaj može imati samo jednu lokaciju gde će se održavati, dok jedna lokacija može da se koristi na više događaja paralelno.

Pored ove strukture na Laravel zadatku je implementirana autentifikacija koja omogućava diferencijaciju između običnih korisnika i administratora, kako bi se razdvojile uloge koji korisnici mogu imati unutar finalne full-stack aplikacije koja će se izgraditi za potrebe seminarskog rada. Neautorizovanim korisnicima je dozvoljen pristup korisnicima, kao i prijavljivanje, registrovanje i resetovanje zaboravljene šifre. Korisnicima koji se prijavljuju na platformu radi njenog korišćenja je dozvoljeno upravljanje događajima koje zakazuju, dok je samo administratorskoj strani dozvoljena implementacija lokacija koje obični korisnici mogu kasnije koristiti. Autentifikacija je omogućena uz pomoć Laravel Sanctum autentifikacionog sistema, koji omogućava jednostavan proces prijavljivanja korisnika i testiranja ruta korišćenjem Bearer tokena.

Radi ispunjavanja zahteva viših ocena implementirana je kompletna izrada seeder-a, factory-ja i resource-a za sve postojeće modele unutar Laravel aplikacije. Takođe kako bi se ispunili dodatni zahtevi u skladu sa temom zadatka, dodatno je primenjeno eksportovanje .ics fajlova za kalendare kojima se pristupa unutar Blade template fajlova u Laravel-u. U okviru tog fajla se koristi i primena paginacije radi prikazivanja svih događaja koji se nalaze unutar baze podataka.

## Pokretanje projekta

### Inicijalno podešavanje
```
cd laraveldomaci
composer global require laravel/installer
composer install
php artisan migrate:fresh --seed
php artisan serve
```
