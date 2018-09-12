<?php namespace KubaMarkiewicz\Api\Models;

use System\Models\File as FileBase;
use Str;

class File extends FileBase 
{
    
    /**
     * Generates a SEO friendly disk name from the supplied file name. 
     */
    protected function getDiskName()
    {
        if ($this->disk_name !== null)
            return $this->disk_name;

        $ext = strtolower(pathinfo($this->file_name, PATHINFO_EXTENSION));
        $name = str_slug(pathinfo($this->file_name, PATHINFO_FILENAME), '-');

        return $this->disk_name = $ext !== null ? $name.'.'.$ext : $name;
    }


	/**
    * Generates a partition for the file.
    */
    protected function getPartitionDirectory()
    {
        return implode('/', array_slice(str_split(md5($this->disk_name), 3), 0, 3)) . '/';
    }

}