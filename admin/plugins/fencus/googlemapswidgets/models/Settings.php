<?php namespace Fencus\GoogleMapsWidgets\Models;

use Lang;
use Model;

/**
 * Settings Model
 */
class Settings extends Model
{
	public $implement = ['System.Behaviors.SettingsModel'];
	
	public $settingsCode = 'googlemapswidgets_settings';
	public $settingsFields = 'fields.yaml';
	
	public function initSettingsData()
	{
		$this->api_key = '';
		$this->location = '{"lat":25.7616798,"lng":-80.19179020000001}';
	}
	
}