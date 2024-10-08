<?php

namespace App\Http\Controllers;

use App\Models\Dogadjaj;
use DateTime;

use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;
class IcsController extends Controller
{
    //Exportovanje ICS fajla
    public function export(){
        
        $dogadjaji = Dogadjaj::all();

        // Kreiranje kalendara radi pakovanja u ICS fajl
        $calendar = Calendar::create('My Events');

        // Prolazak kroz sve dogadjaje i ubacivanje u kreirani kalendar
        foreach ($dogadjaji as $dogadjaj) {
            $event = Event::create()
                ->name($dogadjaj->naziv)
                ->description($dogadjaj->opis)
                ->startsAt(DateTime::createFromFormat('Y-m-d H:i:s', $dogadjaj->datum));

            $calendar->event($event);
        }

        // Vracanje ICS fajla kao izlaz
        return response($calendar->get())
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET')
            ->header('Access-Control-Allow-Headers', 'Content-Type')
            ->header('Content-Type', 'text/calendar')
            ->header('Content-Disposition', 'attachment; filename="exportDogadjaja.ics"');
    }

    // Exportovanje pojedinacnih dogadjaja
    public function exportSingle($id)
    {
        $dogadjaj = Dogadjaj::findOrFail($id);

        $event = Event::create()
            ->name($dogadjaj->naziv)
            ->description($dogadjaj->opis)
            ->startsAt(DateTime::createFromFormat('Y-m-d H:i:s', $dogadjaj->datum));

        $calendar = Calendar::create('My Event')->event($event);

        return response($calendar->get())
            ->header('Content-Type', 'text/calendar')
            ->header('Content-Disposition', 'attachment; filename="event_' . $id . '.ics"');
    }
}
