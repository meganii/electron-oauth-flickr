const assert = require("power-assert");
import Utils from "../src/Utils";
const utils = new Utils();

let author = "hoo";
it ("is power-assert", () => {
    const data = "test";
    const key = "api_key";
    const secret = "api_secret";
    const signeture = utils.sign(data, key, secret);
    assert(signeture === 'yQsGMkSDGUd7gHazuO6fy30%2BZhw%3D');
});

it ("sort query strings", () => {
    const queryArguments = {
        "B": "b",
        "C": "c",
        "A": "a",
    }
    const res = utils.formQueryString(queryArguments);
    assert(res === "A=a&B=b&C=c");
});

it ("formBaseString", () => {
    const utils = new Utils();
    const verb = "GET";
    const url = "https://www.flickr.com/services/oauth/request_token";
    const queryString = "A=a&B=b&C=c";
    const res = utils.formBaseString(verb, url, queryString);
    assert(res === "GET&https%3A%2F%2Fwww.flickr.com%2Fservices%2Foauth%2Frequest_token&A%3Da%26B%3Db%26C%3Dc");
});

it ("setAuthVals", () => {
    let options = {
        "api_key": "api_key",
        "api_secret": "api_secret",
    }
    const res = utils.setAuthVals(options);
    assert(res.api_key === "api_key");
    assert(res.api_secret === "api_secret");
    assert(res.oauth_timestamp !== "");
    assert(res.oauth_nonce !== "");
});

it ("parseRestResponse", () => {
    const body = "oauth_callback_confirmed=true&oauth_token=oauthtoken&oauth_token_secret=secret";
    const response = utils.parseRestResponse(body);
    assert(response.oauth_token === "oauthtoken");
    assert(response.oauth_token_secret === "secret");
});

it ("parseXMLResponse", (next) => {
    const xml = '<?xml version="1.0" encoding="utf-8" ?>'
                + '<rsp stat="ok">' 
                +   '<photoid>28822141220</photoid>' 
                + '</rsp>';
    const json = utils.parseXMLResponse(xml, (err, data) => {
        console.log(data.rsp.photoid);
        assert(data.rsp.photoid === '28822141220');
        next();
    });
});

it ("parseXMLResponse2", (next) => {
    const xml = '<?xml version="1.0" encoding="utf-8" ?>'
                    + '<rsp stat="ok">'
                    + '<count>315</count>'
                    + '<prevphoto id="29109233745" owner="35571855@N06" secret="0e8cd6f695" server="8292" farm="9" title="Screen Shot 2016-04-10 at 21.12.27" url="/photos/35571855@N06/29109233745/in/photostream/" thumb="https://farm9.staticflickr.com/8292/29109233745_0e8cd6f695_s.jpg" license="0" media="photo" />'
                    + '<nextphoto id="0" />'
                    + '</rsp>';
    const json = utils.parseXMLResponse(xml, (err, data) => {
        console.log(data);
        assert(data.rsp.prevphoto.$.thumb === "https://farm9.staticflickr.com/8292/29109233745_0e8cd6f695_s.jpg");
        next();
    });
    
});