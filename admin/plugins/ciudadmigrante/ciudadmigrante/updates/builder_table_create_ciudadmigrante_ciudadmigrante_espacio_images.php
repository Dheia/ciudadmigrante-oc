<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateCiudadmigranteCiudadmigranteEspacioImages extends Migration
{
    public function up()
    {
        Schema::create('ciudadmigrante_ciudadmigrante_espacio_images', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('espacio_id');
            $table->integer('sort_order');
            $table->integer('rotate_y')->nullable();
            $table->integer('translate_y')->nullable();
            $table->integer('z_index')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('ciudadmigrante_ciudadmigrante_espacio_images');
    }
}
