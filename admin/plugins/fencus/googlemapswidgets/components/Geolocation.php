<?php namespace Fencus\GoogleMapsWidgets\Components;

use Cms\Classes\ComponentBase;
use Fencus\GoogleMapsWidgets\Models\Settings as MapsSettings;
use Session;
use October\Rain\Exception\ApplicationException;
use Lang;

class Geolocation extends ComponentBase
{

	public $hasGeolocation;
	public $api_key;
	public $useHTML5;
	public $geolocation;
	public $geolocationType;
	public $geolocationAccuracy;
	
    public function componentDetails()
    {
        return [
            'name'        => 'fencus.googlemapswidgets::lang.geolocation.component_name',
            'description' => 'fencus.googlemapswidgets::lang.geolocation.component_description'
        ];
    }

    public function defineProperties()
    {
        return [
        		'useHTML5' => [
        				'title'       => 'fencus.googlemapswidgets::lang.geolocation.use_html5',
        				'description' => 'fencus.googlemapswidgets::lang.geolocation.use_html5_description',
        				'type'        => 'checkbox',
        				'default'     => '0'
        		],
        		'refresh' => [
        				'title'       => 'fencus.googlemapswidgets::lang.geolocation.refresh',
        				'description' => 'fencus.googlemapswidgets::lang.geolocation.refresh_description',
        				'type'        => 'checkbox',
        				'default'     => '0'
        		],
        ];
    }
    
    public function onRun()
    {
    	$this->hasGeolocation = Session::has('geolocation');
    	if($this->property('refresh', false))
    	{
    		$this->hasGeolocation = false;
    	}
    	if(!$this->hasGeolocation)
    	{
    		$this->api_key = MapsSettings::get('api_key');
    		if(!$this->api_key)
    		{
    			throw new ApplicationException(Lang::get('fencus.googlemapswidgets::lang.settings.key_not_defined'));
    		}
    		$this->useHTML5 = $this->property('useHTML5', false);
    		if(Session::has('geolocationType') && Session::get('geolocationType') == 'IP')
    		{
    			$this->useHTML5 = false;
    		}
    	}
    }
    
    public function onGetGeolocation()
    {
    	$geolocation = post('geolocation');
    	$geolocationType = post('geolocationType');
    	$geolocationAccuracy = post('geolocationAccuracy');
    	if($geolocation && $geolocationType && $geolocationAccuracy)
    	{
    		Session::put('geolocation', $geolocation);
    		Session::put('geolocationType', $geolocationType);
    		Session::put('geolocationAccuracy', $geolocationAccuracy);
    	}
    }

}