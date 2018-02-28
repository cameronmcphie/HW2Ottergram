var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";
var NAV_LINK_SELECTOR = "[data-image-role=\"nav-trigger\"]";

function setDetails(imageURL, titleText) {
  "use strict";

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageURL);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function setDetailsFromNav(navArrow) {
  var direction = navArrow.getAttribute("data-image-direction");
  var images = getThumbnailsArray();
  var currentImage = document.querySelector(DETAIL_IMAGE_SELECTOR);

  if (direction == "left") {
    for (var i = 0; i < images.length; i++) {
      if (currentImage.src == images[i].href) {
        if (i == 0) {
          var previousImage = images[images.length];
        } else {
          previousImage = images[i - 1];
        }
      }
    }
    setDetails(previousImage.pathname, previousImage.getAttributeNode("data-image-title").value);
  } else if (direction == "right") {
    for (i = 0; i < images.length; i++) {
      if (currentImage.src == images[i].href) {
        if (i == 9) {
          var nextImage = images[0];
        } else {
          nextImage = images[i + 1];
        }
      }
    }
    setDetails(nextImage.pathname, nextImage.getAttributeNode("data-image-title").value);
  } else {
    setDetails(images[0].pathname, images[0].getAttributeNode("data-image-title").value);
  }
}

function addNavClickHandler(navArrow) {
  "use strict";
  navArrow.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromNav(navArrow);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function getNavArray() {
  "use strict";
  var navArrows = document.querySelectorAll(NAV_LINK_SELECTOR);
  var navArrowsArray = [].slice.call(navArrows);
  return navArrowsArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);

  var navArrows = getNavArray();
  navArrows.forEach(addNavClickHandler);
}

initializeEvents();
