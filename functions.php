<?php
    function add_to_table($connection,$arguments){ //add new item to the db

        $name = $arguments["name"];
        $backgroundColor = $arguments["backgroundColor"];
        $logo = $arguments["logo"];
        if($arguments["video"]["wantVideo"]){
            $video = $arguments["video"]["link"];
        }else{
            $video = "";
        }

        if($arguments["description"]["wantDescription"]){
            $description = $arguments["description"]["text"];
        }else{
            $description = "";
        }

        $contacts = $arguments["contactsField"]["wantContacts"] ? $arguments["contactsField"]["contacts"]: [];

        $contactsString = "";
        foreach($contacts as $contact){
            $contactsString = $contactsString.implode("-",$contact);
            if(next($contacts)){
             $contactsString = $contactsString.";";
            }
        }
        $pageLink = $arguments["pageLink"];
        $comments = $arguments["comments"];
        $templateID = $arguments["template"];

        $add = "INSERT INTO pages(template,backgroundColor,name, logoURL, video,contacts,description,pageLink,comments) VALUES('$templateID','$backgroundColor','$name','$logo','$video','$contactsString','$description','$pageLink','$comments')";
        $query = $connection->query($add) or die("<h2>failed inserting new item!</h2>");

     }

?>