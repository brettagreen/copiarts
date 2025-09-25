update_env() {
  local key="$1"
  local value="$2"
  
  if grep -q "^$key=" ./.env; then
    sed -i "s/^$key=.*/$key=$value/" ./.env
  
  else
    echo "$key=$value" >> ./.env
  fi
}

fetch_token() {
    echo $(curl -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=$old_token") |  json access_token
}

source ./.env
old_token=$INSTA_TOKEN
echo $old_token
new_token=$(fetch_token)
echo $new_token
update_env "INSTA_TOKEN" $new_token
