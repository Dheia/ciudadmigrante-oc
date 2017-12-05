<?php namespace CiudadMigrante\CiudadMigrante;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
    }

    public function registerSettings()
    {
        return [
            'settings' => [
                'label'       => 'Configuración',
                'description' => '',
                'category'    => 'Configuración',
                'icon'        => 'icon-cog',
                'class'       => 'CiudadMigrante\CiudadMigrante\Models\Settings',
                'order'       => 0,
                'keywords'    => 'security location'
            ]
        ];
    }
}
