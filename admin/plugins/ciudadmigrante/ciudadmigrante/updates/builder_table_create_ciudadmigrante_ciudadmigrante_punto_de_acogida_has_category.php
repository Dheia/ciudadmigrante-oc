<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateCiudadmigranteCiudadmigrantePuntoDeAcogidaHasCategory extends Migration
{
    public function up()
    {
        Schema::create('ciudadmigrante_ciudadmigrante_punto_de_acogida_has_category', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('puntos_de_acogida_id');
            $table->integer('category_id');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('ciudadmigrante_ciudadmigrante_punto_de_acogida_has_category');
    }
}
