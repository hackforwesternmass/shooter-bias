<?php

function my_module_get_user_count() {
  return db_query("SELECT COUNT(uid) FROM {users}")->fetchField();
}
