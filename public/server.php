<?php
header('Access-Control-Allow-Origin: *'); 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "beta_survey_control" ;

function new_user_id()
{
    $qry_string = "SELECT id FROM user";
    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);
    $ret = 1;
    foreach( $qry as $key => $value ) {
        $ret = max ($ret , $value['id']+1);    
    }
    return $ret;
}

function new_form_id()
{
    $qry_string = "SELECT id FROM form";
    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);
    $ret = 1;
    foreach( $qry as $key => $value ) {
        $ret = max ($ret , $value['id']+1);    
    }
    return $ret;
}

$ajax = json_decode( $_REQUEST["phpCall"] );



if( $ajax->callType == "insert user" ) 
{   
    $new_user = new_user_id();
    $qry_string = "INSERT INTO user VALUES( {$new_user} , '{$ajax->name}' , '{$ajax->password}' , '{$ajax->email}' , '{$ajax->gender}' , '{$ajax->userRole}' )";

    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);
    echo $qry_string;
}

if( $ajax->callType == "login user" )
{
    $qry_string = "Select * FROM user where email='{$ajax->email}'";
    
    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);
    
    $q = '"';
    foreach( $qry as $key => $value ) {
        if( $value['email'] == $ajax->email && $value['pass'] == $ajax->password ) {
            echo "{";
            echo '"loginStatus":"success"';
            echo ",";    
            echo "{$q}id{$q}:{$value['id']}";
            echo ",";
            echo "{$q}name{$q}:{$q}{$value['name']}{$q}";
            echo ",";
            echo "{$q}email{$q}:{$q}{$value['email']}{$q}";
            echo ",";
            echo "{$q}gender{$q}:{$q}{$value['gender']}{$q}";
            echo ",";
            echo "{$q}userRole{$q}:{$q}{$value['role']}{$q}";
            echo "}";
            return;
        }    
    }
    echo "{";
    echo '"loginStatus":"failed to login"';
    echo "}";    
}

if( $ajax->callType == "get forms of designer") {
    $qry_string = "Select * FROM form where DesignerID='{$ajax->designerID}'";

    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);
    
    $q = '"';
    $found = 0;
    echo "[";
    foreach( $qry as $key => $value ) {
        if( $found ) echo ",";
        echo "{";
        echo "{$q}name{$q}:{$q}{$value['name']}{$q},";
        echo "{$q}id{$q}:{$q}{$value['id']}{$q},";
        echo "{$q}columns{$q}:{$value['formatJSON']},";
        echo "{$q}designerId{$q}:{$q}{$value['DesignerID']}{$q}";
        echo "}";
        $found = 1;
    }
    echo "]";
}

if ( $ajax->callType == "add new form" )
{
    $get_id = new_form_id();;
    $q = '"';

    $qry_string = "INSERT INTO form VALUES({$get_id},{$q}{$ajax->formName}{$q},'{$ajax->formColumnsString}',{$q}{$ajax->designerID}{$q})";

    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);
    
    $qry_string = "CREATE TABLE form_{$get_id} ( ";
    for( $i = 0 ; $i < count($ajax->formColumns) ; $i ++ ) {
        if( $i != 0 ) $qry_string.= ",";
        $qry_string .= $ajax->formColumns[$i]->name . " ";
        $qry_string .= $ajax->formColumns[$i]->type . " ";
    }
    $qry_string .= ")";

    echo "{$get_id}";

    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);
}

if ( $ajax->callType == "get data of a form")
{
    $q = '"';
    $d = "$";

    $qry_string = "SELECT * FROM {$ajax->tableName}";
    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);

    echo "[";
    $found = false;
    foreach( $qry as $key => $value ) {
        if( $found ) echo ",";
        echo "[";
        $fff = false;
        foreach ($value as $k => $val ) {
            if( $fff ) echo ",";
            echo "{$q}{$val}{$q}";
            $fff = true;
        }
        echo "]";
        $found = true;
    }
    echo "]";
}


if( $ajax->callType == "get forms of employee") {
    $qry_string = "Select * FROM form";

    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);
    
    $q = '"';
    $found = 0;
    echo "[";
    foreach( $qry as $key => $value ) {
        if( $found ) echo ",";
        echo "{";
        echo "{$q}name{$q}:{$q}{$value['name']}{$q},";
        echo "{$q}id{$q}:{$q}{$value['id']}{$q},";
        echo "{$q}columns{$q}:{$value['formatJSON']},";
        echo "{$q}designerId{$q}:{$q}{$value['DesignerID']}{$q}";
        echo "}";
        $found = 1;
    }
    echo "]";
}

if( $ajax->callType == "data entry") {
    $qry_string = "INSERT INTO {$ajax->tableName} VALUES(";
    $q = '"';
    for( $i = 0 ; $i < count($ajax->row) ; $i ++ ) {
        if( $i != 0 ) $qry_string.=",";
        $qry_string .= "{$q}{$ajax->row[$i]}{$q}";
    }
    $qry_string .= ")";
    echo $qry_string;
    $Connection = mysqli_connect($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'],$GLOBALS['dbname']);
    $qry = $Connection->query($qry_string);
}

?>
