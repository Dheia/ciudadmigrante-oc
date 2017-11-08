<?php namespace Fencus\GoogleMapsWidgets;

use Backend;
use System\Classes\PluginBase;
use System\Classes\SettingsManager;

/**
 * GoogleMapsWidgets Plugin Information File
 */
class Plugin extends PluginBase
{

    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'fencus.googlemapswidgets::lang.plugin.name',
            'description' => 'fencus.googlemapswidgets::lang.plugin.description',
            'author'      => 'Elias M. Mariani, Ariel M. Carrettoni',
            'icon'        => 'icon-map',
        	'homepage'    => 'http://www.fencus.com'
        ];
    }


    public function registerComponents()
    {
        return [
        		'Fencus\GoogleMapsWidgets\Components\ApiLoader' => 'apiLoader',
        		'Fencus\GoogleMapsWidgets\Components\Geolocation' => 'geolocation',
        ];
    }

    public function registerPermissions()
    {
        return 
        [
            'fencus.googlemapswidgets.access' => ['tab' => 'fencus.googlemapswidgets::lang.plugin.name', 'label' => 'fencus.googlemapswidgets::lang.plugin.access'],
        ];
    }

    public function registerNavigation()
    {
        return [];
    }
    
    public function registerSettings()
    {
    	return [
    			'settings' => [
    					'label'       => 'fencus.googlemapswidgets::lang.settings.menu_label',
    					'description' => 'fencus.googlemapswidgets::lang.settings.menu_description',
    					'category'    => SettingsManager::CATEGORY_CMS,
    					'icon'        => 'icon-map',
    					'permissions' => ['fencus.googlemapswidgets.access'],
    					'class'       => 'Fencus\GoogleMapsWidgets\Models\Settings',
    			]
    	];
    }
    
    public function registerFormWidgets()
    {
    	return [
    			'Fencus\GoogleMapsWidgets\FormWidgets\LocationSelector' => [
    					'label' => 'Location Selector',
    					'code'  => 'location-selector'
    			],
    			'Fencus\GoogleMapsWidgets\FormWidgets\AddressLocator' => [
    					'label' => 'Address Locator',
    					'code'  => 'address-locator'
    			],
    			'Fencus\GoogleMapsWidgets\FormWidgets\MapOptions' => [
    					'label' => 'Map Options',
    					'code'  => 'map-options'
    			],
    			'Fencus\GoogleMapsWidgets\FormWidgets\AddressFinder' => [
    					'label' => 'Address Finder',
    					'code'  => 'address-finder'
    			]
    	];
    }

}
