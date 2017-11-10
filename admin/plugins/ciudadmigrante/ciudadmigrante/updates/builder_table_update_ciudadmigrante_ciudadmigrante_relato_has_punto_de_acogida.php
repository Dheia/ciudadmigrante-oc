<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigranteRelatoHasPuntoDeAcogida extends Migration
{
    public function up()
    {
        Schema::rename('ciudadmigrante_ciudadmigrante_relato_has_relato', 'ciudadmigrante_ciudadmigrante_relato_has_punto_de_acogida');
        Schema::table('ciudadmigrante_ciudadmigrante_relato_has_punto_de_acogida', function($table)
        {
            $table->renameColumn('relato2_id', 'punto_de_acogida_id');
        });
    }
    
    public function down()
    {
        Schema::rename('ciudadmigrante_ciudadmigrante_relato_has_punto_de_acogida', 'ciudadmigrante_ciudadmigrante_relato_has_relato');
        Schema::table('ciudadmigrante_ciudadmigrante_relato_has_relato', function($table)
        {
            $table->renameColumn('punto_de_acogida_id', 'relato2_id');
        });
    }
}
