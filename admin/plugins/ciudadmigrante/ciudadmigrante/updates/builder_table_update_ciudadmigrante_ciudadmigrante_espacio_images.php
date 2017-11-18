<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigranteEspacioImages extends Migration
{
    public function up()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacio_images', function($table)
        {
            $table->integer('marco_x1');
            $table->integer('marco_y1');
            $table->integer('marco_x2');
            $table->integer('marco_y2');
        });
    }
    
    public function down()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacio_images', function($table)
        {
            $table->dropColumn('marco_x1');
            $table->dropColumn('marco_y1');
            $table->dropColumn('marco_x2');
            $table->dropColumn('marco_y2');
        });
    }
}
