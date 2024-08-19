<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('lokacijas', function (Blueprint $table) {
            $table->string('naziv',400)->change(); 
            $table->string('adresa',400)->change(); 
            $table->string('grad',400)->change(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lokacijas', function (Blueprint $table) {
            $table->string('naziv',5)->change(); 
            $table->string('adresa',5)->change(); 
            $table->string('grad',5)->change(); 
        });
    }
};
