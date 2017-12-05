<?php namespace CiudadMigrante\CiudadMigrante\Models;

use Model;

class Settings extends Model
{
    public $implement = ['System.Behaviors.SettingsModel'];

    // A unique code
    public $settingsCode = 'ciudad_migrante_settings';

    // Reference to field configuration
    public $settingsFields = 'fields.yaml';

}