<?php namespace CiudadMigrante\CiudadMigrante\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateCiudadmigranteCiudadmigrantePuntosDeAcogida3 extends Migration
{
    public function up()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_puntos_de_acogida', function($table)
        {
            $table->string('usuario_nombre', 255);
            $table->string('usuario_email', 255);
            $table->renameColumn('enviado_por_web', 'enviado_por_usuario');
            $table->dropColumn('enviado_por_nombre');
            $table->dropColumn('enviado_por_email');
        });
    }
    
    public function down()
    {
        Schema::table('ciudadmigrante_ciudadmigrante_puntos_de_acogida', function($table)
        {
            $table->dropColumn('usuario_nombre');
            $table->dropColumn('usuario_email');
            $table->renameColumn('enviado_por_usuario', 'enviado_por_web');
            $table->string('enviado_por_nombre', 255);
            $table->string('enviado_por_email', 255);
        });
    }
}
