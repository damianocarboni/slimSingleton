<?php

class Db extends MySQLi {
    static protected $instance = null;

    public function __construct($host, $user, $password, $schema){
        parent::__construct($host, $user, $password, $schema);
    }

    static function getInstance(){
        if(self::$instance == null)
            self::$instance = new Db('my_mariadb', 'root', 'ciccio', 'scuola');
        return self::$instance;
    }
}
?>