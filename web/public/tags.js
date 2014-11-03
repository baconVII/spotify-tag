$(document).ready(
    function() {
        var stateKey = 'spotify_auth_state';
        var spotifyApi = new SpotifyWebApi();

        var args = getHashParams();

        var access_token = args.access_token;
        var state = args.state;
        var storedState = localStorage.getItem(stateKey);

        if (access_token && (state == null || state !== storedState)) {
             alert('There was an error during the authentication');
        } else {
            $("#login").hide();

            localStorage.removeItem(stateKey);

            spotifyApi.setAccessToken(access_token);

            if(access_token){
                spotifyApi.getMySavedTracks()
                    .then(function(data){
                        console.log(data);
                    }, function(err){
                        console.error(err);
                    });
            } else{
                $("#login").show();
                $("#login").on('click', function() {
                    loginSpotify();
                });
            }
        }
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
}

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}
