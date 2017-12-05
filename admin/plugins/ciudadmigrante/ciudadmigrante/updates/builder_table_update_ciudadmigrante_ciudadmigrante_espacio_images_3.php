<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigranteEspacioImages3 extends Migration
{
    public function up()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacio_images', function($table)
        {
            $table->integer('translate_x')->default(0);
            $table->integer('scale_x')->default(100);
            $table->integer('scale_y')->default(100);
            $table->integer('rotate_y')->nullable(false)->default(0)->change();
            $table->integer('translate_y')->nullable(false)->default(0)->change();
            $table->string('marco_url', 255)->nullable()->unsigned(false)->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_espacio_images', function($table)
        {
            $table->dropColumn('translate_x');
            $table->dropColumn('scale_x');
            $table->dropColumn('scale_y');
            $table->integer('rotate_y')->nullable()->default(null)->change();
            $table->integer('translate_y')->nullable()->default(null)->change();
            $table->text('marco_url')->nullable()->unsigned(false)->default(null)->change();
        });
    }
}
