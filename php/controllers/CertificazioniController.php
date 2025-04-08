<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CertificazioniController
{
  public function index(Request $request, Response $response, $args){
    $mysqli_connection = db::getInstance();
    $result = $mysqli_connection->query("SELECT * FROM certificazioni where alunno_id = '". $args['id'] ."'");
    $results = $result->fetch_all(MYSQLI_ASSOC);
    if(empty($results)){
        $response->getBody()->write(json_encode(["msg" => "utente non trovato"]));
        return $response->withHeader("Content-type", "application/json")->withStatus(200);
    }
    else{
        $response->getBody()->write(json_encode($results));
        return $response->withHeader("Content-type", "application/json")->withStatus(200);
    } 
  }

  public function search(Request $request, Response $response, $args){
    $mysqli_connection = db::getInstance();
    $result = $mysqli_connection->query("SELECT * FROM certificazioni where alunno_id = '". $args['id'] ."' and id = '". $args['id_cert'] ."'");
    $results = $result->fetch_all(MYSQLI_ASSOC);
    if(empty($results)){
        $response->getBody()->write(json_encode(["msg" => "certificazione non trovata"]));
        return $response->withHeader("Content-type", "application/json")->withStatus(200);
    }
    else{
        $response->getBody()->write(json_encode($results));
        return $response->withHeader("Content-type", "application/json")->withStatus(200);
    }
  }

  public function add(Request $request, Response $response, $args){
    $mysqli_connection = db::getInstance();
    $columns = $mysqli_connection->query("describe alunni");
    $arrCol = $columns->fetch_all(MYSQLI_ASSOC);
    $trovato = false;
    foreach($arrCol as $colu){
      if($colu['Field'] == $args['col']){
        $trovato = true;
        break;
      }
    }
    if($trovato){
      $result = $mysqli_connection->query("SELECT * FROM alunni order by ".$args['col']."");
      $results = $result->fetch_all(MYSQLI_ASSOC);

      $response->getBody()->write(json_encode($results));
      return $response->withHeader("Content-type", "application/json")->withStatus(200);
    }
    else{
      $response->getBody()->write(json_encode(["msg" => "colonna non trovata"]));
      return $response->withHeader("Content-type", "application/json")->withStatus(200);
    }
      
  }
}