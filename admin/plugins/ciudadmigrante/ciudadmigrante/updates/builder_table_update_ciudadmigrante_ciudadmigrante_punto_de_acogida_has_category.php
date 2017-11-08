<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigrantePuntoDeAcogidaHasCategory extends Migration
{
    public function up()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_punto_de_acogida_has_category', function($table)
        {
            $table->renameColumn('puntos_de_acogida_id', 'punto_de_acogida_id');
        });
    }
    
    public function down()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_punto_de_acogida_has_category', function($table)
        {
            $table->renameColumn('punto_de_acogida_id', 'puntos_de_acogida_id');
        });
    }
}
