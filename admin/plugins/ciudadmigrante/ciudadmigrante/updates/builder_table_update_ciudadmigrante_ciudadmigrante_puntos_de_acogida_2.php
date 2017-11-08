<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigrantePuntosDeAcogida2 extends Migration
{
    public function up()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_puntos_de_acogida', function($table)
        {
            $table->string('geolocalization', 255);
        });
    }
    
    public function down()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_puntos_de_acogida', function($table)
        {
            $table->dropColumn('geolocalization');
        });
    }
}
