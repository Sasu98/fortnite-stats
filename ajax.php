<?php
  require("ftapi/Autoloader.php");

  $api = new FortniteClient;
  $api->setKey("YOURAPIKEYFROM FORTNITEAPIKEY.COM");

  if ($_GET["request"] == "news"){
    echo json_encode($api->news->get("br", "en")->entries);
  }
  //echo $api->user->id("Ninja")->username;

  //echo "<br><br>";
  //echo "User data:<br>";
  //echo json_encode($api->user->stats("pc", "season5"));

/*
  echo "<br><br>";
  echo "News:<br>";
  $data = $api->news->get("br", "en");
  foreach($data->entries as $news) {
    echo $news->title;
    echo $news->body;
    echo $news->image;
    echo $news->time;
  }

  echo "<br><br>";
  echo "Challenges:<br>";
  $data = $api->challenges->get('season5', 'en');
  echo json_encode($data);

  echo "<br><br>";
  echo "Status:<br>";
  $data = $api->status->fetch();
  echo $data->status . "<br>";
  echo $data->message . "<br>";
  echo $data->version . "<br>";

  echo "<br><br>";
  echo "Top 10:<br>";
  $values = $api->leaderboard->kills()->entries[0];
  //foreach($data->entries as $values) {
       echo $values->uid . "<br>";
       echo $values->username . "<br>";
       echo $values->kills . "<br>";
       echo $values->wins . "<br>";
       echo $values->matches . "<br>";
       echo $values->minutes . "<br>";
       echo $values->score . "<br>";
       echo $values->kd . "<br>";
       echo $values->platform . "<br>";
       echo $values->rank . "<br>";
  //}
  */
?>
