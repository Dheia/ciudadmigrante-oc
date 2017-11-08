<?php namespace Fencus\GoogleMapsWidgets\formwidgets;

use Backend\Classes\FormWidgetBase;
use ApplicationException;
use Lang;

class AddressLocator extends FormWidgetBase
{

	protected $defaultAlias = 'address-locator';
	
    public function widgetDetails()
    {
        return [
            'name'        => 'Address Locator',
            'description' => 'Address Locator'
        ];
    }
	
    public function init()
    {
    	$this->fillFromConfig([
    	]);
    }
    
    protected function loadAssets()
    {
    	
    }
    
    
    public function render()
    {
   		$this->vars['name'] = $this->formField->getName();
   		$this->vars['value'] = $this->getLoadValue();
		if(!$this->previewMode)
		{
			$this->addJs('js/addresslocator.js');
		}
    	return $this->makePartial('addresslocator');
    }
}
