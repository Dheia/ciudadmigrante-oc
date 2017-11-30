<?php namespace KubaMarkiewicz\Translations;

use System\Classes\PluginBase;
use Event;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
    }

    public function registerSettings()
    {
    }

    public function boot()
	{
	    Event::listen('backend.menu.extendItems', function($manager) {
	        $manager->removeMainMenuItem('October.Cms', 'cms');
	        $manager->removeMainMenuItem('October.Backend', 'media');
	        $manager->removeMainMenuItem('October.Backend', 'dashboard');
	    });
	}
}
