const assert = require("power-assert");
import Utils from "../src/Utils";
import ElectronFlickr from "../src/ElectronFlickr";
import request from 'superagent';
import mlog from 'mocha-logger';
require('dotenv').config();

it ("init", () => {
    const options = {
        "api_key": "api_key",
        "secret": "secret",
    };
    const flickr = new ElectronFlickr(options);
    assert(flickr.options.api_key === "api_key");
    assert(flickr.options.secret === "secret");
});

it ("getRequestTokenURL", () => {
    const options = {
        api_key:     process.env.API_KEY,
        secret:      process.env.SECRET,
        permissions: "write",
        callback: "http://localhost",
    };
    const flickr = new ElectronFlickr(options);
    const url = flickr.getRequestTokenURL();
    assert(url !== "");
});

it ("getAuthToken", (next) => {
    const utils = new Utils();
    const options = {
        api_key:     process.env.API_KEY,
        secret:      process.env.SECRET,
        permissions: "write",
        callback: "http://localhost",
    };
    const flickr = new ElectronFlickr(options);
    let url = "https://www.flickr.com/services/oauth/request_token?oauth_callback=http%3A%2F%2Flocalhost&oauth_consumer_key=d2818bf6581e4685530206b13d6ca4da&oauth_nonce=033a07f6da60f0379190c2485e876c4d&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1471661157977&oauth_version=1.0&oauth_signature=8djQntlHMkFVcCnYUIRDrox%2FLTM%3D";
    flickr.getAuthToken(url, (err, res) => {
        const result = utils.parseRestResponse(res.text);
        assert(result.oauth_token !== '');
        assert(result.oauth_token_secret !== '');
        assert(flickr.options.oauth_token !== '');
        assert(flickr.options.oauth_token_secret !== '');
        next();
    });
});

it ("getAuthTokenURL", (next) => {
    const utils = new Utils();
    const options = {
        api_key:     process.env.API_KEY,
        secret:      process.env.SECRET,
        permissions: "write",
        callback: "http://localhost",
    };

    const flickr = new ElectronFlickr(options);
    let url = "https://www.flickr.com/services/oauth/request_token?oauth_callback=http%3A%2F%2Flocalhost&oauth_consumer_key=d2818bf6581e4685530206b13d6ca4da&oauth_nonce=033a07f6da60f0379190c2485e876c4d&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1471661157977&oauth_version=1.0&oauth_signature=8djQntlHMkFVcCnYUIRDrox%2FLTM%3D";
    flickr.getAuthToken(url, (err, res) => {
        const result = utils.parseRestResponse(res.text);
        assert(result.oauth_token !== '');
        assert(result.oauth_token_secret !== '');
        assert(flickr.options.oauth_token !== '');
        assert(flickr.options.oauth_token_secret !== '');
        const authURL = flickr.getAuthURL();
        assert(authURL !== '');
        console.log(authURL);
        next();
    });
});


it ("setAccessToken", () => {
    const options = {
        api_key:     process.env.API_KEY,
        secret:      process.env.SECRET,
        permissions: "write",
        callback: "http://localhost",
    };
    const flickr = new ElectronFlickr(options);
    flickr.setAccessToken("accesstoken", "accesstokensecret");
    assert(flickr.options.access_token = "accesstoken");
    assert(flickr.options.access_token_secret = "accesstokensecret");
});
