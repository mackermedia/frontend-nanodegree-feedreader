/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all contain a URL that is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* This test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all contain a name that is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /*
    * The second test suite -- all about the menu.
    */
    describe('The menu', function() {

        /* This test asserts that the body contains the class 'menu-hidden' by default.
        * This is the menu's hidden class.
        */
        it('is hidden by default', function() {
            expect($('body').attr("class")).toBe('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggles visibility when clicked', function() {
            $(".icon-list").click();
            expect($('body').attr("class")).not.toBe('menu-hidden');

            $(".icon-list").click();
            expect($('body').attr("class")).toBe('menu-hidden');
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0);
                done();
            }, 300);
        });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('- loadFeed function appends entries to the feed container', function() {
            var feed = $(".feed");
            expect(feed.find(".entry").length).toBeGreaterThan(0);
        });
    });

    /* Test suite -- all about new feeds */
    describe('New Feed Selection', function() {
        var initialText = '';

        // first load the initial feed
        beforeEach(function (done) {
            loadFeed(0);

            // give it a bit of time to run before moving on
            setTimeout(function() {
                done();
            }, 300);
        });

        // second get the result of the initial load and load the next feed
        beforeEach(function (done) {
            // store the result of the initial feed load 1st entry
            initialText = $($(".feed").find(".entry")[0]).text();

            // load the next feed
            loadFeed(1);

            // give it a bit of time to run before moving on
            setTimeout(function() {
                done();
            }, 300);
        });

        // finally check that the text has changed from the initial state
        it('changes the content of the feed list', function (done) {
            expect($($(".feed").find(".entry")[0]).text()).not.toBe(initialText);
            done();
        });
    });
}());
