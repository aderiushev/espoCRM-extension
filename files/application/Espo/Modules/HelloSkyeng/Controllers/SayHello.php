<?php

namespace Espo\Modules\HelloSkyeng\Controllers;

use \Espo\Core\Exceptions\Forbidden;
use \Espo\Core\Exceptions\BadRequest;
use \Espo\Core\Exceptions\NotFound;

class SayHello extends \Espo\Core\Controllers\Record
{
    public function actionSendEmail($params, $data, $request)
    {
        if (!$request->isPost()) {
            throw new BadRequest();
        }

        if (!$this->getAcl()->checkScope('Email')) {
            throw new Forbidden();
        }

        if (is_null($data['password'])) {
            $data['password'] = $this->getConfig()->get('smtpPassword');
        }

        return $this->getRecordService()->sendEmail($data);
    }
}
