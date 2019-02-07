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
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed in the allFeeds object and ensures it has a
         * URL defined and that the URL is not empty.
         */
         it('url defined', function() {
             allFeeds.forEach(function(feed) {
               const feedUrl = feed.url;
               expect(feedUrl).toBeDefined();
               expect(feedUrl.length).not.toBe(0);
             });
         });


        /* loops through each feed in the allFeeds object and ensures it has a
         * name defined and that the name is not empty.
         */
         it('name defined', function() {
             allFeeds.forEach(function(feed) {
               const feedName = feed.name;
               expect(feedName).toBeDefined();
               expect(feedName.length).not.toBe(0);
             });
         });
    });


    /* Menu test suite */
    describe('The menu', function() {
        /* ensures the menu element is hidden by default. */
         const body = document.querySelectorAll('body');

         /* checks the body tag has the correct class to hide it */
         it('menu is hidden initially', function() {
             expect(body[0]).toHaveClass('menu-hidden');
         });

         /* ensures the menu's visbility toggles when clicked */
          it('menu toggles when prompted', function() {
              const menuIcon = document.querySelector('.menu-icon-link');
              expect(body[0]).toHaveClass('menu-hidden');
              menuIcon.click();
              expect(body[0]).not.toHaveClass('menu-hidden');
              menuIcon.click();
              expect(body[0]).toHaveClass('menu-hidden');
          });
    });

    /* Initial Entries suite - ensures loadFeed function works */
    describe('Intial Entries', function() {
        /* loadFeed prior to running tests w/done callback */
         beforeEach(function(done) {
             loadFeed(0, done);
         });

         it('feed has an entry', function(done) {
             const newsEntry = document.querySelector('.feed .entry');
             /* checks to see if feed has entries after loading */
             expect(newsEntry.length).not.toBe(0);
             done();
         });
    });

    /* New Feed Selection - ensures when a new feed is loaded */
    describe('New Feed Selection', function() {
         /* setting variables to be used for both tests */
         const newsList = document.querySelector('.feed');
         let feedA;
         let feedB;

         /* load multiple feeds and set to variables prior to testing */
         beforeEach(function(done) {
             loadFeed(0, function() {
               feedA = newsList.innerHTML;
               loadFeed(1, function() {
                 feedB = newsList.innerHTML;
               });
               done();
             });
         });

         /* compare feeds to see if they are the different */
         it('changes content when news feed is loaded', function(done) {
             expect(feedA).not.toEqual(feedB);
             done();
         });
    });
}());
