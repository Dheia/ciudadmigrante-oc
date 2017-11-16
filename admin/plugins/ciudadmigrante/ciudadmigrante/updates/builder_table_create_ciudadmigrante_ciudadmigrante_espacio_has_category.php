<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateCiudadmigranteCiudadmigranteEspacioHasCategory extends Migration
{
    public function up()
    {
        Schema::create('ciudadmigrante_ciudadmigrante_espacio_has_category', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('espacio_id');
            $table->integer('category_id');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('ciudadmigrante_ciudadmigrante_espacio_has_category');
    }
}
