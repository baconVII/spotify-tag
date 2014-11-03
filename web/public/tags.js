$(document).ready(
    function() {
        $("#login").on('click', function() {
            loginSpotify();
        });
    }
);

function loginSpotify() {
    var stateKey = 'spotify_auth_state';

    var client_id = '1f13c1985f394ce0b969daed6cdab60a';
    var redirect_uri = 'http://localhost:8888/';
    var scopes = 'playlist-read-private playlist-modify-private user-library-read ';

    var state = generateRandomString(16);
    localStorage.setItem(stateKey, state);

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scopes);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
};

function generateRandomString(length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
};

