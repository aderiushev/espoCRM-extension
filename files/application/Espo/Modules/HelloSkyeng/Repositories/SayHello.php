<?php

namespace Espo\Modules\HelloSkyeng\Repositories;

use \Espo\ORM\Entity;

class SayHello extends \Espo\Core\Templates\Repositories\Base
{
    public function beforeSave(Entity $entity, array $options = array())
    {
        return parent::beforeSave($entity, $options);
    }

    public function afterSave(Entity $entity, array $options = array())
    {
        return parent::afterSave($entity, $options);
    }
}
