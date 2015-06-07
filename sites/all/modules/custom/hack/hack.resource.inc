<?php

function hack_get_user_count() {
  return db_query("SELECT COUNT(uid) FROM {users}")->fetchField();
}