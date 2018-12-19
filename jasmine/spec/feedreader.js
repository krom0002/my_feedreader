/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

      it("URL defined and Not Empty", function() {
        // LOOP
        for (let feed of allFeeds) {
          // TESTS IF URLS CONTAIN 'HTTP' TO DEFINE
          expect(feed.url).toContain("http");
          // TESTS IF URL IS NOT NULL
          expect(feed.url).not.toBeNull();
        }
      });

      /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

      it("Name defined and Not Empty", function() {
        // LOOP
        for (let feed of allFeeds) {
          // TESTS IF FEED NAME IS DEFINED
          expect(feed.name).toBeDefined();
          // TESTS IF FEED NAME IS NOT NULL
          expect(feed.name).not.toBeNull();
          // TESTS IF FEED NAME LENGTH IS GREATER THAN 0
          expect(feed.name.length).toBeGreaterThan(0);
        }
      });
    });

    /* DONE: Write a new test suite named "The menu" */
    describe("The Menu", function() {
      /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

      it("hidden by default", function() {
        // STORES BODY ELEMENT IN A VARIBLE
        const body = document.querySelector("body");
        // TESTS IF BODY HAS A CLASS AND MATCHES TO TRUE
        expect($(body).hasClass("menu-hidden")).toMatch(true);
      });

      /* DONE: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

      it("menu changes visibility", function() {
        // STORES BODY ELEMENT IN A VARIBLE
        const body = document.querySelector("body");
        // STORES MENU ELEMENT IN A VARIBLE
        const menu = document.querySelector(".menu-icon-link");
        // SIMULATES CLICK
        menu.click();
        // TESTS IF BODY HAS A CLASS AND MATCHES TO FALSE WHEN CLICKED
        expect($(body).hasClass("menu-hidden")).toMatch(false);
        // SIMULATES CLICK
        menu.click();
        // TESTS IF BODY HAS A CLASS AND MATCHES TO TRUE WHEN CLICKED
        expect($(body).hasClass("menu-hidden")).toMatch(true);
      });
    });
    /* DONE: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
      /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

      // DOES BEFORE
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it("loadFeed completes work with one entry", function() {
        // CHECKS TO SEE IF ENTRY IS NOT EMPTY
        let entry = document.querySelectorAll(".feed .entry");
        expect(entry.length).toBeGreaterThan(0);
      });
    });

    /* DONE: Write a new test suite named "New Feed Selection" */
    // was feeling very confident untill this last part,
    // had help from https://www.youtube.com/watch?v=7kOBXPbDmyw&feature=youtu.be
    describe("New Feed Selection", function() {
      /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
      //DECLARE FEED VARIABLES HERE FOR USABLE SCOPE
      let feed_one;
      let feed_two;

      // DOES BEFORE
      // LOADS FEED AND ASSIGNS .FEED TO VARIABLE, DONE WHEN LOADED
      beforeEach(function(done) {
        loadFeed(0, () => {
          feed_one = $(".feed")[0].innerText;
          // LOADS FEED AND ASSIGNS .FEED TO VARIABLE, DONE WHEN LOADED
          loadFeed(1, () => {
            feed_two = $(".feed")[0].innerText;
            done();
          });
        });
      });

      it("new feed content changes", function(done) {
        // COMPARE THE TWO FEEDS FOR CHANGE
        expect(feed_one).not.toEqual(feed_two);
        done();
      });
    });
  })()
);
