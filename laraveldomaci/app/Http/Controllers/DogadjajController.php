<?php

namespace App\Http\Controllers;

use App\Models\Dogadjaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\DogadjajResource;

class DogadjajController extends Controller
{
    // Prikaz svih dogadjaja
    public function index()
    {
        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze prikazati sve dogadjaje!'], 403);
        }
        $dogadjaji = Dogadjaj::all();
        return DogadjajResource::collection($dogadjaji);
    }

    // Prikazivanje pojedinacnog dogadjaja
    public function show($id)
    {
        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze prikazati dogadjaj na osnovu ID-ija!'], 403);
        }
        $dogadjaj = Dogadjaj::findOrFail($id);
        return new DogadjajResource($dogadjaj);
    }

    // Unos dogadjaja
    public function store(Request $request)
    {
    $user_id = Auth::user()->id;
    $validator = Validator::make($request->all(), [
            'naziv' => 'required',
            'opis' => 'required',
            'datum' => 'required',
            'lokacija_id' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze kreirati dogadjaje!'], 403);
        }

        $dogadjaj = new Dogadjaj();
        $dogadjaj->naziv = $request->naziv;
        $dogadjaj->opis = $request->opis;
        $dogadjaj->datum = $request->datum;
        $dogadjaj->lokacija_id = $request->lokacija_id;
        $dogadjaj->user_id = $user_id;


        $dogadjaj->save();

        return response()->json(['Uspešno kreiran novi dogadjaj!', new DogadjajResource($dogadjaj)]);
    }

    // Azuriranje informacija o dogadjaju
    public function update(Request $request, $id)
    {
        $user_id = Auth::user()->id;
        $validator = Validator::make($request->all(), [
            'naziv' => 'required',
            'opis' => 'required',
            'datum' => 'required',
        
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze menjati dogadjaje!'], 403);
        }

        $dogadjaj_user_id = Dogadjaj::where('id', $id)->value('user_id');

        if($user_id != $dogadjaj_user_id){
            return response()->json(['error' => 'Vi niste korisnik koji je kreirao ovaj dogadjaj!'], 403);
        }

        $dogadjaj = Dogadjaj::findOrFail($id);

        $dogadjaj->naziv = $request->naziv;
        $dogadjaj->opis = $request->opis;
        $dogadjaj->datum = $request->datum;
        

        $dogadjaj->save();

        return response()->json(['Uspešno ažuriran dogadjaj!', new DogadjajResource($dogadjaj)]);
    }

    // Azuriranje samo opisa u dogadjaju
    public function updateOpis(Request $request, $id)
    {
        $user_id = Auth::user()->id;
        $request->validate([
            'opis' => 'required'
        ]);

        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze menjati dogadjaje!'], 403);
        }

        $dogadjaj_user_id = Dogadjaj::where('id', $id)->value('user_id');

    if($user_id != $dogadjaj_user_id){
        return response()->json(['error' => 'Vi niste korisnik koji je kreirao ovaj dogadjaj!'], 403);
    }


        $dogadjaj = Dogadjaj::findOrFail($id);
    
        $dogadjaj->update(['opis' => $request->input('opis')]);
    
        return response()->json(['message' => 'Opis datog dogadjaja je uspesno izmenjen!', new DogadjajResource($dogadjaj)]);
    }

    // Brisanje dogadjaja
    public function destroy($id)
    {
        $user_id = Auth::user()->id;
        $dogadjaj_user_id = Dogadjaj::where('id', $id)->value('user_id');

        if(Auth::user()->isAdmin){
            return response()->json(['error' => 'Admin ne moze menjati dogadjaje!'], 403);
        }

        if($user_id != $dogadjaj_user_id){
            return response()->json(['error' => 'Vi niste korisnik koji je kreirao ovaj dogadjaj!'], 403);
        }

        $dogadjaj = Dogadjaj::findOrFail($id);
        $dogadjaj->delete();
        return response()->json('Uspešno obrisan dogadjaj!');
    }
}
