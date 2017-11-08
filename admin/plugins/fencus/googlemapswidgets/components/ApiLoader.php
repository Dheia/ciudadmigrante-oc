<?php namespace Fencus\GoogleMapsWidgets\Components;

use Cms\Classes\ComponentBase;
use Fencus\GoogleMapsWidgets\Models\Settings as MapsSettings;
use Lang;

class ApiLoader extends ComponentBase
{

	public $api_key;
	public $libraries;
	public $message;
	
    public function componentDetails()
    {
        return [
            'name'        => 'fencus.googlemapswidgets::lang.apiloader.name',
            'description' => 'fencus.googlemapswidgets::lang.apiloader.description'
        ];
    }

    public function defineProperties()
    {
        return [
        		'drawing' => [
        				'title'       => 'fencus.googlemapswidgets::lang.apiloader.drawing',
        				'description' => 'fencus.googlemapswidgets::lang.apiloader.drawing_description',
        				'type'        => 'checkbox',
        				'default'     => '0'
        		],
        		'geometry' => [
        				'title'       => 'fencus.googlemapswidgets::lang.apiloader.geometry',
        				'description' => 'fencus.googlemapswidgets::lang.apiloader.geometry_description',
        				'type'        => 'checkbox',
        				'default'     => '0'
        		],
        		'places' => [
        				'title'       => 'fencus.googlemapswidgets::lang.apiloader.places',
        				'description' => 'fencus.googlemapswidgets::lang.apiloader.places_description',
        				'type'        => 'checkbox',
        				'default'     => '0'
        		],
        		'visualization' => [
        				'title'       => 'fencus.googlemapswidgets::lang.apiloader.visualization',
        				'description' => 'fencus.googlemapswidgets::lang.apiloader.visualization_description',
        				'type'        => 'checkbox',
        				'default'     => '0'
        		],
        ];
    }
    
    public function onRun()
    {
    	
    	$this->api_key = $api_key = MapsSettings::get('api_key');
    	if(!$api_key)
    	{
    		$this->message ='APILoader: '.Lang::get('fencus.googlemapswidgets::lang.settings.key_not_defined');
    	}
    	$this->libraries = '';
    	$drawing = $this->property('drawing',false);
    	$geometry = $this->property('geometry',false);
    	$places = $this->property('places',false);
    	$visualization = $this->property('visualization',false);
    	if($drawing || $geometry || $places || $visualization)
    	{
    		$array = array();
    		if($drawing)
    		{
    			$array[] = 'drawing';
    		}
    		if($geometry)
    		{
    			$array[] ='geometry';
    		}
    		if($places)
    		{
    			$array[] ='places';
    		}
    		if($visualization)
    		{
    			$array[] ='visualization';
    		}
    		$this->libraries = '&libraries='.implode(',',$array);
    	}
    	
    	
    }

}