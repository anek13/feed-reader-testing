/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in the application.
    */
    describe('RSS Feeds', function() {
        /* This first test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty. =
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
         it('have URLs defined', function() {
           for(let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });
        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names defined', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });

    /* Test suites regarding "The menu" */
    describe('The menu', function() {
      /* This test ensures that the menu element is
      * hidden by default.
      */
      it('is hidden by default', function() {
        //expect menu to be invisible (having class menu-hidden) at start
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

      /* This test ensures  that the menu changes
      * visibility when the menu icon is clicked. It has
      * two expectations: to display the menu  when
      * clicked and hide it when clicked again.
      */
      it('changes visibility when clicked', function() {
        const menuIcon = document.querySelector('.menu-icon-link');
        //expect visible menu on the click on the icon
        menuIcon.click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        //and on another click to be invisible again
        menuIcon.click();
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });

    /* Test suite regarding the "Initial Entries" */
    describe('Initial Entries', function() {
      /* This test ensures that when the loadFeed function is called
      * and completes its work, there is at least
      * a single .entry element within the .feed container.
      * As loadFeed() is asynchronous it require the use of Jasmine's beforeEach
      * and asynchronous done() function.
      */
      beforeEach(function(done) {
        loadFeed(0, done);
      });
      it('should have at least a single entry when completed', function() {
        expect($('.feed .entry').length).toBeGreaterThan(0);
      })
    });

    /* Test suite regarding "New Feed Selection" */
    describe('New Feed Selection', function() {
      /* This test ensures that when a new feed is loaded
      * by the loadFeed function the content actually changes.
      */
      let oldFeed, newFeed;
      beforeEach(function(done) {
        loadFeed(0,  function() {
          oldFeed = $('.feed').html();
          loadFeed(1, function() {
            newFeed = $('.feed').html();
            done();
          });
        });
      });
      it('has different content', function() {
        expect(newFeed).not.toEqual(oldFeed);
      })
    });

}());
