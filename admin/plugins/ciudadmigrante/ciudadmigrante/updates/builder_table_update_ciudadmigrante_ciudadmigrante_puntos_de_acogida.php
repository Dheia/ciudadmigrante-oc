<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigrantePuntosDeAcogida extends Migration
{
    public function up()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_puntos_de_acogida', function($table)
        {
            $table->string('latlng', 255);
            $table->dropColumn('latitude');
            $table->dropColumn('longitude');
        });
    }
    
    public function down()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_puntos_de_acogida', function($table)
        {
            $table->dropColumn('latlng');
            $table->string('latitude', 50);
            $table->string('longitude', 50);
        });
    }
}
