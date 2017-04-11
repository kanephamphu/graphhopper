var GHRequest = requireFile('./graphhopper/GHRequest.js');

describe("GHRequest", function () {

    it("ghrequest should init correctly from params", function () {
        var ghRequest = new GHRequest("http://test.de");
        var params = {};
        params.do_zoom = true;
        ghRequest.init(params);
        expect(ghRequest.do_zoom).toEqual(params.do_zoom);

        params.do_zoom = false;
        ghRequest.init(params);
        expect(ghRequest.do_zoom).toEqual(params.do_zoom);
    });

    it("features should work", function () {
        var ghRequest = new GHRequest("http://test.de");
        var params = {};
        params.elevation = true;
        ghRequest.features = {"car": {}};
        ghRequest.init(params);
        expect(ghRequest.api_params.elevation).toEqual(false);

        // overwrite
        ghRequest.features = {"car": {elevation: true}};
        ghRequest.init(params);
        expect(ghRequest.api_params.elevation).toEqual(true);

        var params = {};
        ghRequest.features = {"car": {elevation: true}};
        ghRequest.init(params);
        expect(ghRequest.api_params.elevation).toEqual(true);

        var params = {};
        params.elevation = false;
        ghRequest.features = {"car": {elevation: true}};
        ghRequest.init(params);
        expect(ghRequest.api_params.elevation).toEqual(false);

        var params = {};
        params.elevation = true;
        ghRequest.features = {"car": {elevation: false}};
        ghRequest.init(params);
        expect(ghRequest.api_params.elevation).toEqual(false);

        ghRequest = new GHRequest("http://test.de");
        var params = {point: [[4, 3], [2, 3]], test: "x", test_array: [1, 2]};
        ghRequest.init(params);

        // skip point, layer etc
        expect(ghRequest.api_params.point).toEqual(undefined);

        // include all other parameters
        expect(ghRequest.api_params.test).toEqual("x");
        expect(ghRequest.api_params.test_array).toEqual([1, 2]);
    });

    it("create URL from object 'dot' notation should work", function () {
        var ghRequest = new GHRequest("http://test.de?");
        var params = { pt: { earliest_departure_time : 123}};
        ghRequest.init(params);
        expect(ghRequest.api_params.pt).toBeDefined();
        expect(ghRequest.api_params.pt.earliest_departure_time).toEqual(123);
    });

    it("createPath should work", function () {
        var ghRequest = new GHRequest("http://test.de?");
        var params = { pt: { earliest_departure_time : 123}, key: "" };
        ghRequest.init(params);
        expect(ghRequest.createPath("")).toEqual("&locale=en&vehicle=car&weighting=fastest&elevation=false&key="
                    +"&pt.earliest_departure_time=123");
    });
});

