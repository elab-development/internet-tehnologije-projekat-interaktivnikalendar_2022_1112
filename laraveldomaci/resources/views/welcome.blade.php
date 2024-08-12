<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dogadjaji</title>
    <!-- Bootstrap CSS importovanje -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Dogadjaji</h1>

        <!--  Dugme koje eksportuje sve dostupne dogadjaje u .ics datoteku -->
        <div class="text-center mb-4">
            <a href="{{ route('ics-export-all') }}" class="btn btn-primary">
                <i class="bi bi-download"></i> Eksportuj sve dogadjaje u .ics datoteku!
            </a>
        </div>

        <!-- Ispisivanje svih dogadjaja iz baze podataka, koriscenjem paginacije -->

        @if ($dogadjaji->count())
            <div class="list-group">
                @foreach ($dogadjaji as $dogadjaj)
                    <div class="list-group-item">
                        <h5 class="mb-1">{{ $dogadjaj->naziv }}</h5>
                        <p class="mb-1">Opis: {{ $dogadjaj->opis }}</p>
                        <small>Datum: {{ $dogadjaj->datum }}</small><br>
                        <small>Lokacija: {{ $dogadjaj->lokacija->naziv ?? 'N/A' }}</small>
                        <div class="mt-2">
                            <a href="{{ route('ics-export', $dogadjaj->id) }}" class="btn btn-outline-secondary btn-sm">
                                <i class="bi bi-calendar2-event"></i> Eksportuj u .ics datoteku!
                            </a>
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Renderovanje linkova za paginaciju -->
            <div class="mt-4">
                {{ $dogadjaji->links('pagination::bootstrap-5') }}
            </div>
        @else
            <div class="alert alert-warning text-center">
                Nisu pronadjeni nijedni dogadjaji.
            </div>
        @endif
    </div>

    <!-- Bootstrap JS importovanje-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
