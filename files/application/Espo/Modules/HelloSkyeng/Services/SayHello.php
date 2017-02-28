<?php

namespace Espo\Modules\HelloSkyeng\Services;

use \Espo\Core\Exceptions\Forbidden;
use \Espo\Core\Exceptions\BadRequest;
use \Espo\Core\Exceptions\NotFound;

use \Espo\ORM\Entity;

class SayHello extends \Espo\Services\Record
{
    protected function init()
    {
        parent::init();
        $this->addDependencyList([
            'container',
            'preferences',
            'fileManager',
            'crypt',
            'serviceFactory'
        ]);
    }

    protected function getMailSender()
    {
        return $this->getInjection('container')->get('mailSender');
    }

    public function sendEmail($data) {

        $email = $this->getEntityManager()->getEntity('Email');

        $email->set(array(
            'subject' => 'Hello Skyeng',
            'isHtml' => false,
            'to' => $data['emailAddress']
        ));

        $emailSender = $this->getMailSender();
        $emailSender->useSmtp($data)->send($email);

        return true;
    }
}
