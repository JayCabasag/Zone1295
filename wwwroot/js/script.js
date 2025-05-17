$(document).ready(function () {
  // Category Filter
  $(".category-btn").click(function () {
    $(".category-btn").removeClass("active");
    $(this).addClass("active");

    const filter = $(this).data("filter");

    if (filter === "all") {
      $(".product-card").show();
    } else {
      $(".product-card").hide();
      $('.product-card[data-category*="' + filter + '"]').show();
    }
  });

  // Quick View Modal
  $(".quick-view").click(function (e) {
    e.preventDefault();

    // Get product details from the parent card
    const card = $(this).closest(".product-card");
    const title = card.find("h3").text();
    const group = card.find(".product-group").text();
    const price = card.find(".product-price").text();
    const imgSrc = card.find(".product-img img").attr("src");

    // Update modal with product details
    $("#quickViewModal .modal-product-title").text(title);
    $("#quickViewModal .modal-product-group").text(group);
    $("#quickViewModal .modal-product-price").text(price);
    $("#quickViewModal .product-quick-img img").attr("src", imgSrc);

    // Show modal and overlay
    $("#quickViewModal").fadeIn(300);
    $(".overlay").fadeIn(300);

    // Prevent body scrolling
    $("body").css("overflow", "hidden");
  });

  // Close Modal
  $(".close-modal, .overlay").click(function () {
    $("#quickViewModal").fadeOut(300);
    $(".overlay").fadeOut(300);
    $("body").css("overflow", "auto");
  });

  // Quantity Selector
  $(".quantity-btn.plus").click(function () {
    let input = $(this).siblings("input");
    let value = parseInt(input.val());
    input.val(value + 1);
  });

  $(".quantity-btn.minus").click(function () {
    let input = $(this).siblings("input");
    let value = parseInt(input.val());
    if (value > 1) {
      input.val(value - 1);
    }
  });

  // Wishlist Toggle
  $(".add-to-wishlist, .btn-wishlist").click(function (e) {
    e.preventDefault();

    // Toggle heart icon
    const heartIcon = $(this).find("i");

    if (heartIcon.hasClass("far")) {
      heartIcon.removeClass("far").addClass("fas");

      // Get product details for wishlist
      let card;
      let title;
      let price;
      let imgSrc;

      if ($(this).hasClass("btn-wishlist")) {
        // From modal
        card = $("#quickViewModal");
        title = card.find(".modal-product-title").text();
        price = card.find(".modal-product-price").text();
        imgSrc = card.find(".product-quick-img img").attr("src");
      } else {
        // From product card
        card = $(this).closest(".product-card");
        title = card.find("h3").text();
        price = card.find(".product-price").text();
        imgSrc = card.find(".product-img img").attr("src");
      }

      // Add to wishlist
      addToWishlist(title, price, imgSrc);

      // Update wishlist count
      updateWishlistCount(1);

      // Show success message
      showNotification("Product added to wishlist!");
    } else {
      heartIcon.removeClass("fas").addClass("far");

      // Update wishlist count
      updateWishlistCount(-1);

      // Show message
      showNotification("Product removed from wishlist!");
    }
  });

  // Wishlist Sidebar Toggle
  $(".wishlist-icon").click(function (e) {
    e.preventDefault();
    $(".wishlist-sidebar").addClass("active");
    $(".overlay").fadeIn(300);
  });

  $(".close-wishlist, .overlay").click(function () {
    $(".wishlist-sidebar").removeClass("active");
    $(".overlay").fadeOut(300);
  });

  // Add to Cart
  $(".add-to-cart, .add-to-cart-btn").click(function (e) {
    e.preventDefault();

    // Update cart count
    const currentCount = parseInt($(".cart-count").text());
    $(".cart-count").text(currentCount + 1);

    // Show success message
    showNotification("Product added to cart!");
  });

  // Helper Functions
  function addToWishlist(title, price, imgSrc) {
    // Remove empty wishlist message if present
    $(".empty-wishlist").remove();

    // Create wishlist item HTML
    const wishlistItem = `
              <div class="wishlist-item">
                  <div class="wishlist-item-img">
                      <img src="${imgSrc}" alt="${title}">
                  </div>
                  <div class="wishlist-item-info">
                      <h4>${title}</h4>
                      <p>${price}</p>
                      <button class="remove-from-wishlist">Remove</button>
                  </div>
              </div>
          `;

    // Add to wishlist sidebar
    $(".wishlist-items").append(wishlistItem);

    // Style the wishlist item
    $(".wishlist-item").css({
      display: "flex",
      gap: "15px",
      "margin-bottom": "20px",
      "padding-bottom": "20px",
      "border-bottom": "1px solid #e0e0e0",
    });

    $(".wishlist-item-img").css({
      width: "80px",
      height: "80px",
    });

    $(".wishlist-item-img img").css({
      width: "100%",
      height: "100%",
      "object-fit": "cover",
      "border-radius": "4px",
    });

    $(".wishlist-item-info h4").css({
      margin: "0 0 5px 0",
      "font-size": "1rem",
    });

    $(".wishlist-item-info p").css({
      margin: "0 0 10px 0",
      color: "#9488de",
      "font-weight": "600",
    });

    $(".remove-from-wishlist").css({
      background: "none",
      border: "none",
      color: "#777",
      cursor: "pointer",
      padding: "0",
      "font-size": "0.9rem",
      "text-decoration": "underline",
    });

    // Add event listener to remove button
    $(".remove-from-wishlist").click(function () {
      $(this).closest(".wishlist-item").remove();

      // Update wishlist count
      updateWishlistCount(-1);

      // Show empty message if wishlist is empty
      if ($(".wishlist-item").length === 0) {
        $(".wishlist-items").html(`
                      <div class="empty-wishlist">
                          <i class="far fa-heart"></i>
                          <p>Your wishlist is empty</p>
                      </div>
                  `);
      }
    });
  }

  function updateWishlistCount(change) {
    const currentCount = parseInt($(".wishlist-count").text());
    const newCount = currentCount + change;
    $(".wishlist-count").text(newCount);
  }

  function showNotification(message) {
    // Create notification element if it doesn't exist
    if ($(".notification").length === 0) {
      $("body").append('<div class="notification"></div>');

      // Style the notification
      $(".notification").css({
        position: "fixed",
        bottom: "20px",
        right: "20px",
        "background-color": "#9488de",
        color: "white",
        padding: "10px 20px",
        "border-radius": "4px",
        "box-shadow": "0 2px 10px rgba(0,0,0,0.1)",
        "z-index": "1000",
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 0.3s ease",
      });
    }

    // Update message and show notification
    $(".notification").text(message);
    $(".notification").css({
      opacity: "1",
      transform: "translateY(0)",
    });

    // Hide notification after 3 seconds
    setTimeout(function () {
      $(".notification").css({
        opacity: "0",
        transform: "translateY(20px)",
      });
    }, 3000);
  }

  // Product Image Gallery
  $(".thumbnail").click(function () {
    // Update active thumbnail
    $(".thumbnail").removeClass("active");
    $(this).addClass("active");

    // Update main image
    const imgSrc = $(this).data("img");
    $("#main-product-image").attr("src", imgSrc);
  });

  // Product Tabs
  $(".tab-btn").click(function () {
    const tabId = $(this).data("tab");

    // Update active tab button
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    // Update active tab content
    $(".tab-pane").removeClass("active");
    $("#" + tabId).addClass("active");
  });

  // Review Rating Selection
  $(".rating-select i").click(function () {
    const rating = $(this).data("rating");

    // Reset all stars
    $(".rating-select i").removeClass("fas").addClass("far");

    // Fill stars up to selected rating
    $(".rating-select i").each(function () {
      if ($(this).data("rating") <= rating) {
        $(this).removeClass("far").addClass("fas");
      }
    });
  });

  // Add to Wishlist
  $("#add-to-wishlist").click(function () {
    const heartIcon = $(this).find("i");

    if (heartIcon.hasClass("far")) {
      heartIcon.removeClass("far").addClass("fas");
      showNotification("Product added to wishlist!");

      // Update wishlist count
      const currentCount = parseInt($(".wishlist-count").text());
      $(".wishlist-count").text(currentCount + 1);

      // Get product details
      const title = $(".product-title").text();
      const price = $(".product-price").text();
      const imgSrc = $("#main-product-image").attr("src");

      // Add to wishlist
      addToWishlist(title, price, imgSrc);
    } else {
      heartIcon.removeClass("fas").addClass("far");
      showNotification("Product removed from wishlist!");

      // Update wishlist count
      const currentCount = parseInt($(".wishlist-count").text());
      $(".wishlist-count").text(currentCount - 1);
    }
  });

  // Add to Favorites
  $("#add-to-favorites").click(function () {
    const starIcon = $(this).find("i");

    if (starIcon.hasClass("far")) {
      starIcon.removeClass("far").addClass("fas");
      showNotification("Product added to favorites!");
    } else {
      starIcon.removeClass("fas").addClass("far");
      showNotification("Product removed from favorites!");
    }
  });

  // Add to Cart
  $(".add-to-cart-btn").click(function () {
    const quantity = $("#product-quantity").val();

    // Update cart count
    const currentCount = parseInt($(".cart-count").text());
    $(".cart-count").text(currentCount + parseInt(quantity));

    // Show success message
    showNotification(`${quantity} item(s) added to cart!`);
  });

  // Helper function to show notification
  function showNotification(message) {
    // Create notification element if it doesn't exist
    if ($(".notification").length === 0) {
      $("body").append('<div class="notification"></div>');

      // Style the notification
      $(".notification").css({
        position: "fixed",
        bottom: "20px",
        right: "20px",
        "background-color": "#9488de",
        color: "white",
        padding: "10px 20px",
        "border-radius": "4px",
        "box-shadow": "0 2px 10px rgba(0,0,0,0.1)",
        "z-index": "1000",
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 0.3s ease",
      });
    }

    // Update message and show notification
    $(".notification").text(message);
    $(".notification").css({
      opacity: "1",
      transform: "translateY(0)",
    });

    // Hide notification after 3 seconds
    setTimeout(function () {
      $(".notification").css({
        opacity: "0",
        transform: "translateY(20px)",
      });
    }, 3000);
  }

  // Helper function to add to wishlist
  function addToWishlist(title, price, imgSrc) {
    // Remove empty wishlist message if present
    $(".empty-wishlist").remove();

    // Create wishlist item HTML
    const wishlistItem = `
              <div class="wishlist-item">
                  <div class="wishlist-item-img">
                      <img src="${imgSrc}" alt="${title}">
                  </div>
                  <div class="wishlist-item-info">
                      <h4>${title}</h4>
                      <p>${price}</p>
                      <button class="remove-from-wishlist">Remove</button>
                  </div>
              </div>
          `;

    // Add to wishlist sidebar
    $(".wishlist-items").append(wishlistItem);

    // Style the wishlist item
    $(".wishlist-item").css({
      display: "flex",
      gap: "15px",
      "margin-bottom": "20px",
      "padding-bottom": "20px",
      "border-bottom": "1px solid #e0e0e0",
    });

    $(".wishlist-item-img").css({
      width: "80px",
      height: "80px",
    });

    $(".wishlist-item-img img").css({
      width: "100%",
      height: "100%",
      "object-fit": "cover",
      "border-radius": "4px",
    });

    $(".wishlist-item-info h4").css({
      margin: "0 0 5px 0",
      "font-size": "1rem",
    });

    $(".wishlist-item-info p").css({
      margin: "0 0 10px 0",
      color: "#9488de",
      "font-weight": "600",
    });

    $(".remove-from-wishlist").css({
      background: "none",
      border: "none",
      color: "#777",
      cursor: "pointer",
      padding: "0",
      "font-size": "0.9rem",
      "text-decoration": "underline",
    });

    // Add event listener to remove button
    $(".remove-from-wishlist").click(function () {
      $(this).closest(".wishlist-item").remove();

      // Update wishlist count
      const currentCount = parseInt($(".wishlist-count").text());
      $(".wishlist-count").text(currentCount - 1);

      // Show empty message if wishlist is empty
      if ($(".wishlist-item").length === 0) {
        $(".wishlist-items").html(`
                      <div class="empty-wishlist">
                          <i class="far fa-heart"></i>
                          <p>Your wishlist is empty</p>
                      </div>
                  `);
      }
    });
  }

  // FAQ Toggle
  $(".faq-question").click(function () {
    // Toggle active class
    $(this).parent().toggleClass("active");

    // Toggle answer visibility
    $(this).next(".faq-answer").slideToggle(300);

    // Toggle plus/minus icon
    const icon = $(this).find(".faq-toggle i");
    if (icon.hasClass("fa-plus")) {
      icon.removeClass("fa-plus").addClass("fa-minus");
    } else {
      icon.removeClass("fa-minus").addClass("fa-plus");
    }
  });

  // Contact Form Submission
  $(".contact-form").submit(function (e) {
    e.preventDefault();

    // Get form values
    const name = $("#name").val();
    const email = $("#email").val();
    const subject = $("#subject").val();
    const message = $("#message").val();

    // Here you would typically send the form data to a server
    // For demonstration, we'll just show a success message

    // Clear form fields
    $("#name").val("");
    $("#email").val("");
    $("#subject").val("");
    $("#message").val("");

    // Show success message
    showNotification("Your message has been sent successfully!");
  });

  // Helper function to show notification
  function showNotification(message) {
    // Create notification element if it doesn't exist
    if ($(".notification").length === 0) {
      $("body").append('<div class="notification"></div>');

      // Style the notification
      $(".notification").css({
        position: "fixed",
        bottom: "20px",
        right: "20px",
        "background-color": "#9488de",
        color: "white",
        padding: "10px 20px",
        "border-radius": "4px",
        "box-shadow": "0 2px 10px rgba(0,0,0,0.1)",
        "z-index": "1000",
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 0.3s ease",
      });
    }

    // Update message and show notification
    $(".notification").text(message);
    $(".notification").css({
      opacity: "1",
      transform: "translateY(0)",
    });

    // Hide notification after 3 seconds
    setTimeout(function () {
      $(".notification").css({
        opacity: "0",
        transform: "translateY(20px)",
      });
    }, 3000);
  }

  // Testimonial Slider (in a real implementation, this would be a carousel)
  // For demonstration purposes, we'll just add hover effects

  $(".testimonial-card").hover(
    function () {
      $(this).css("transform", "translateY(-10px)");
    },
    function () {
      $(this).css("transform", "translateY(-5px)");
    }
  );

  // Partner Logo Hover Effect
  $(".partner-logo").hover(
    function () {
      $(this).css("transform", "scale(1.1)");
    },
    function () {
      $(this).css("transform", "scale(1.05)");
    }
  );

  // Team Member Social Links Hover Effect
  $(".team-social a").hover(
    function () {
      $(this).css({
        "background-color": "#9488de",
        color: "white",
      });
    },
    function () {
      $(this).css({
        "background-color": "#f5f5f5",
        color: "#333",
      });
    }
  );

  // Tab Switching
  $(".tab-btn").click(function () {
    const tabId = $(this).data("tab");

    // Update active tab button
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    // Update active tab content
    $(".tab-pane").removeClass("active");
    $("#" + tabId).addClass("active");
  });

  // Password Toggle
  $(".toggle-password").click(function () {
    const passwordField = $(this).siblings("input");
    const icon = $(this).find("i");

    if (passwordField.attr("type") === "password") {
      passwordField.attr("type", "text");
      icon.removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      passwordField.attr("type", "password");
      icon.removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });

  // Password Strength Meter
  $("#register-password").on("input", function () {
    const password = $(this).val();
    let strength = 0;

    // Check password length
    if (password.length >= 8) {
      strength += 1;
    }

    // Check for lowercase letters
    if (password.match(/[a-z]/)) {
      strength += 1;
    }

    // Check for uppercase letters
    if (password.match(/[A-Z]/)) {
      strength += 1;
    }

    // Check for numbers
    if (password.match(/[0-9]/)) {
      strength += 1;
    }

    // Check for special characters
    if (password.match(/[^a-zA-Z0-9]/)) {
      strength += 1;
    }

    // Update strength meter
    const strengthBar = $(".strength-bar");
    const strengthText = $(".strength-text span");

    switch (strength) {
      case 0:
      case 1:
        strengthBar.css("width", "20%").css("background-color", "#ff4d4d");
        strengthText.text("Weak").css("color", "#ff4d4d");
        break;
      case 2:
        strengthBar.css("width", "40%").css("background-color", "#ffa64d");
        strengthText.text("Fair").css("color", "#ffa64d");
        break;
      case 3:
        strengthBar.css("width", "60%").css("background-color", "#ffcc4d");
        strengthText.text("Good").css("color", "#ffcc4d");
        break;
      case 4:
        strengthBar.css("width", "80%").css("background-color", "#4dff4d");
        strengthText.text("Strong").css("color", "#4dff4d");
        break;
      case 5:
        strengthBar.css("width", "100%").css("background-color", "#4dff4d");
        strengthText.text("Very Strong").css("color", "#4dff4d");
        break;
    }
  });

  // Dashboard Navigation
  $(".dashboard-nav a").click(function (e) {
    if (!$(this).parent().hasClass("logout")) {
      e.preventDefault();

      // Get the panel ID from the href
      const panelId = $(this).attr("href").replace("#", "") + "-panel";

      // Update active nav item
      $(".dashboard-nav li").removeClass("active");
      $(this).parent().addClass("active");

      // Update active panel
      $(".dashboard-panel").removeClass("active");
      $("#" + panelId).addClass("active");
    }
  });

  // Edit Avatar
  $(".edit-avatar").click(function () {
    // In a real implementation, this would open a file picker
    alert("This would open a file picker to change your profile picture.");
  });

  // Order View Button
  $(".btn-text").click(function (e) {
    e.preventDefault();

    // In a real implementation, this would navigate to the order details page
    alert("This would show the details for this order.");
  });

  // Search Form Submission
  $(".search-form").submit(function (e) {
    e.preventDefault();

    const searchTerm = $("#search-input").val().trim();

    if (searchTerm) {
      // In a real implementation, this would perform a search and update results
      // For demonstration, we'll just update the search term display
      $(".search-term").text(searchTerm);

      // Scroll to results
      $("html, body").animate(
        {
          scrollTop: $(".search-results-section").offset().top - 100,
        },
        500
      );
    }
  });

  // Search Tags Click
  $(".search-tag").click(function (e) {
    e.preventDefault();

    const tagText = $(this).text();

    // Update search input
    $("#search-input").val(tagText);

    // Update search term display
    $(".search-term").text(tagText);

    // Scroll to results
    $("html, body").animate(
      {
        scrollTop: $(".search-results-section").offset().top - 100,
      },
      500
    );
  });

  // Filter Checkboxes
  $('.filter-options input[type="checkbox"]').change(function () {
    // In a real implementation, this would filter the results
    // For demonstration, we'll just log the change
    console.log("Filter changed:", $(this).parent().text().trim());
  });

  // Price Range Slider
  // This is a simplified version; in a real implementation, you would use a library like noUiSlider
  $(".price-input input").change(function () {
    const minPrice = parseInt($(".min-price").val());
    const maxPrice = parseInt($(".max-price").val());

    // Update the range bar width and position
    const percentage = (maxPrice / 500) * 100;
    $(".price-range-bar").css("width", percentage + "%");
    $(".price-range-handle.right").css("left", percentage + "%");

    // In a real implementation, this would filter the results
    console.log("Price range changed:", minPrice, maxPrice);
  });

  // Sort By Change
  $("#sort-by").change(function () {
    const sortValue = $(this).val();

    // In a real implementation, this would sort the results
    console.log("Sort changed:", sortValue);
  });

  // View Options
  $(".view-btn").click(function () {
    $(".view-btn").removeClass("active");
    $(this).addClass("active");

    const viewType = $(this).hasClass("grid") ? "grid" : "list";

    if (viewType === "grid") {
      $(".products-grid").removeClass("list-view");
    } else {
      $(".products-grid").addClass("list-view");
    }
  });

  // Pagination
  $(".page-link").click(function (e) {
    e.preventDefault();

    $(".page-link").removeClass("active");
    $(this).addClass("active");

    // In a real implementation, this would load the next page of results
    console.log("Page changed:", $(this).text());
  });

  // Product Actions
  $(".action-btn").click(function () {
    const action = $(this).attr("class").split(" ")[1];
    const productTitle = $(this)
      .closest(".product-card")
      .find(".product-title a")
      .text();

    switch (action) {
      case "quick-view":
        // In a real implementation, this would open a quick view modal
        alert("Quick view for: " + productTitle);
        break;
      case "add-to-wishlist":
        // Toggle wishlist icon
        const wishlistIcon = $(this).find("i");
        if (wishlistIcon.hasClass("far")) {
          wishlistIcon.removeClass("far").addClass("fas");
          showNotification(productTitle + " added to wishlist!");
        } else {
          wishlistIcon.removeClass("fas").addClass("far");
          showNotification(productTitle + " removed from wishlist!");
        }
        break;
      case "add-to-cart":
        // In a real implementation, this would add the product to cart
        showNotification(productTitle + " added to cart!");
        break;
    }
  });

  // Mobile Menu Toggle
  $(".mobile-menu-toggle").click(function () {
    $(".mobile-nav").slideToggle();
    // $(".overlay").fadeToggle();
    console.log("Toggle Open");
  });

  // Wishlist Sidebar Toggle
  $(".wishlist-icon").click(function (e) {
    e.preventDefault();
    $(".wishlist-sidebar").addClass("active");
    $(".overlay").fadeIn();
    $("body").css("overflow", "hidden");
  });

  // Close Wishlist Sidebar
  $(".close-wishlist, .overlay").click(function () {
    $(".wishlist-sidebar").removeClass("active");
    $(".overlay").fadeOut();
    $("body").css("overflow", "auto");
  });

  // Cart Sidebar Toggle
  $(".cart-icon").click(function (e) {
    e.preventDefault();
    // console.log("Toggle");
    $(".cart-sidebar").addClass("active");
    $(".overlay").fadeIn();
    $("body").css("overflow", "hidden");
  });

  // Close Cart Sidebar
  $(".close-cart, .overlay").click(function () {
    console.log("Close");
    $(".cart-sidebar").removeClass("active");
    $(".overlay").fadeOut();
    $("body").css("overflow", "auto");
  });

  // Add to Cart Button (on product cards)
  $(".add-to-cart-btn").click(function () {
    const quantity = $("#product-quantity").val() || 1;

    // Update cart count
    const currentCount = parseInt($(".cart-count").text());
    $(".cart-count").text(currentCount + parseInt(quantity));

    // Get product details
    const title = $(this)
      .closest(".product-info")
      .find(".product-title")
      .text();
    const price = $(this)
      .closest(".product-info")
      .find(".product-price")
      .text();
    const imgSrc = $(this)
      .closest(".product-card")
      .find(".product-image img")
      .attr("src");

    // Add to cart
    addToCart(title, price, imgSrc, quantity);

    // Show success message
    showNotification(`${quantity} item(s) added to cart`);
  });

  // Product Quick Actions
  $(".action-btn.add-to-cart").click(function () {
    // Get product details
    const productCard = $(this).closest(".product-card");
    const title = productCard.find(".product-title").text();
    const price = productCard.find(".product-price").text();
    const imgSrc = productCard.find(".product-image img").attr("src");

    // Update cart count
    const currentCount = parseInt($(".cart-count").text());
    $(".cart-count").text(currentCount + 1);

    // Add to cart
    addToCart(title, price, imgSrc, 1);

    // Show success message
    showNotification("Item added to cart");
  });

  // Helper function to add item to cart
  function addToCart(title, price, imgSrc, quantity) {
    // Remove empty cart message if it exists
    $(".empty-cart").remove();

    // Create cart item HTML
    const cartItemHTML = `
          <div class="cart-item">
              <div class="cart-item-image">
                  <img src="${imgSrc}" alt="${title}">
              </div>
              <div class="cart-item-info">
                  <h4 class="cart-item-title">${title}</h4>
                  <div class="cart-item-price">${price}</div>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn decrease">-</button>
                      <input type="number" class="quantity-input" value="${quantity}" min="1" max="99">
                      <button class="quantity-btn increase">+</button>
                  </div>
                  <button class="cart-item-remove"><i class="fas fa-trash-alt"></i> Remove</button>
              </div>
          </div>
      `;

    // Add to cart items
    $(".cart-items").append(cartItemHTML);

    // Update cart subtotal
    updateCartSubtotal();

    // Bind events to new cart item
    bindCartItemEvents();
  }

  // Helper function to update cart subtotal
  function updateCartSubtotal() {
    let subtotal = 0;

    $(".cart-item").each(function () {
      const price = parseFloat(
        $(this).find(".cart-item-price").text().replace("$", "")
      );
      const quantity = parseInt($(this).find(".quantity-input").val());
      subtotal += price * quantity;
    });

    $(".cart-subtotal").text("$" + subtotal.toFixed(2));
  }

  // Helper function to bind events to cart items
  function bindCartItemEvents() {
    // Quantity increase button
    $(".quantity-btn.increase")
      .off("click")
      .on("click", function () {
        const input = $(this).siblings(".quantity-input");
        const currentValue = parseInt(input.val());
        input.val(currentValue + 1);
        updateCartSubtotal();
      });

    // Quantity decrease button
    $(".quantity-btn.decrease")
      .off("click")
      .on("click", function () {
        const input = $(this).siblings(".quantity-input");
        const currentValue = parseInt(input.val());
        if (currentValue > 1) {
          input.val(currentValue - 1);
          updateCartSubtotal();
        }
      });

    // Quantity input change
    $(".quantity-input")
      .off("change")
      .on("change", function () {
        updateCartSubtotal();
      });

    // Remove button
    $(".cart-item-remove")
      .off("click")
      .on("click", function () {
        $(this).closest(".cart-item").remove();

        // Update cart count
        const currentCount = parseInt($(".cart-count").text());
        const itemQuantity = parseInt(
          $(this).siblings(".cart-item-quantity").find(".quantity-input").val()
        );
        $(".cart-count").text(Math.max(0, currentCount - itemQuantity));

        // Update subtotal
        updateCartSubtotal();

        // Show empty cart message if no items left
        if ($(".cart-item").length === 0) {
          $(".cart-items").html(`
                  <div class="empty-cart">
                      <i class="fas fa-shopping-bag"></i>
                      <p>Your cart is empty</p>
                  </div>
              `);
        }

        // Show notification
        showNotification("Item removed from cart");
      });
  }

  // Helper function to show notification
  function showNotification(message) {
    // Create notification element if it doesn't exist
    if ($(".notification").length === 0) {
      $("body").append('<div class="notification"></div>');

      // Style the notification
      $(".notification").css({
        position: "fixed",
        bottom: "20px",
        right: "20px",
        "background-color": "#9488de",
        color: "white",
        padding: "10px 20px",
        "border-radius": "4px",
        "box-shadow": "0 2px 10px rgba(0,0,0,0.1)",
        "z-index": "1000",
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 0.3s ease",
      });
    }

    // Update message and show notification
    $(".notification").text(message);
    $(".notification").css({
      opacity: "1",
      transform: "translateY(0)",
    });

    // Hide notification after 3 seconds
    setTimeout(function () {
      $(".notification").css({
        opacity: "0",
        transform: "translateY(20px)",
      });
    }, 3000);
  }

  // Quantity Buttons
  $(".quantity-btn.decrease").click(function () {
    const input = $(this).siblings(".quantity-input");
    const currentValue = parseInt(input.val());
    if (currentValue > 1) {
      input.val(currentValue - 1);
      updateItemSubtotal($(this).closest(".cart-item"));
      updateCartTotal();
    }
  });

  $(".quantity-btn.increase").click(function () {
    const input = $(this).siblings(".quantity-input");
    const currentValue = parseInt(input.val());
    input.val(currentValue + 1);
    updateItemSubtotal($(this).closest(".cart-item"));
    updateCartTotal();
  });

  $(".quantity-input").change(function () {
    updateItemSubtotal($(this).closest(".cart-item"));
    updateCartTotal();
  });

  // Remove Item Button
  $(".remove-item").click(function () {
    $(this).closest("tr").remove();
    updateCartTotal();
    updateCartCount();

    // If no items left, redirect to shop
    if ($(".cart-table tbody tr").length === 0) {
      showEmptyCart();
    }
  });

  // Clear Cart Button
  $(".clear-cart").click(function () {
    if (confirm("Are you sure you want to clear your cart?")) {
      $(".cart-table tbody").empty();
      updateCartTotal();
      updateCartCount();
      showEmptyCart();
    }
  });

  // Update Cart Button
  $(".update-cart").click(function () {
    updateCartTotal();
    showNotification("Cart updated successfully");
  });

  // Apply Coupon Button
  $(".apply-coupon").click(function () {
    const couponCode = $(".coupon-input").val().trim();

    if (couponCode) {
      // In a real implementation, this would validate the coupon code
      // For demonstration, we'll just show a discount
      $(".discount-row").removeClass("hidden");
      $(".cart-discount").text("-$15.00");
      updateCartTotal(15);
      showNotification("Coupon applied successfully");
    } else {
      showNotification("Please enter a coupon code", "error");
    }
  });

  // Add to Cart Button (for recommended products)
  $(".recommended-item .add-to-cart").click(function () {
    const item = $(this).closest(".recommended-item");
    const title = item.find("h4").text();
    const price = item.find(".recommended-item-price").text();
    const imgSrc = item.find("img").attr("src");

    // Add to cart count
    const currentCount = parseInt($(".cart-count").text());
    $(".cart-count").text(currentCount + 1);

    // Show notification
    showNotification(title + " added to cart");
  });

  // Helper Functions
  function updateItemSubtotal(item) {
    const price = parseFloat(item.find(".price-col").text().replace("$", ""));
    const quantity = parseInt(item.find(".quantity-input").val());
    const subtotal = price * quantity;
    item.find(".subtotal-col").text("$" + subtotal.toFixed(2));
  }

  function updateCartTotal(discount = 0) {
    let subtotal = 0;

    // Calculate subtotal
    $(".cart-item").each(function () {
      const price = parseFloat(
        $(this).find(".price-col").text().replace("$", "")
      );
      const quantity = parseInt($(this).find(".quantity-input").val());
      subtotal += price * quantity;
    });

    // Update subtotal display
    $(".cart-subtotal").text("$" + subtotal.toFixed(2));

    // Calculate tax (10%)
    const tax = subtotal * 0.1;
    $(".cart-tax").text("$" + tax.toFixed(2));

    // Calculate shipping (flat rate or free if over $150)
    let shipping = subtotal >= 150 ? 0 : 12.99;
    $(".cart-shipping").text("$" + shipping.toFixed(2));

    // Calculate total
    const total = subtotal + tax + shipping - discount;
    $(".cart-total").text("$" + total.toFixed(2));
  }

  function updateCartCount() {
    let totalItems = 0;

    $(".cart-item").each(function () {
      const quantity = parseInt($(this).find(".quantity-input").val());
      totalItems += quantity;
    });

    $(".cart-count").text(totalItems);
  }

  function showEmptyCart() {
    $(".cart-items-container").html(`
          <div class="empty-cart-message">
              <div class="empty-cart-icon">
                  <i class="fas fa-shopping-bag"></i>
              </div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <a href="shop.html" class="btn-primary">Continue Shopping</a>
          </div>
      `);

    // Style the empty cart message
    $(".empty-cart-message").css({
      "text-align": "center",
      padding: "3rem 1rem",
    });

    $(".empty-cart-icon").css({
      "font-size": "4rem",
      color: "var(--gray)",
      "margin-bottom": "1.5rem",
    });

    $(".empty-cart-message h2").css({
      "margin-bottom": "1rem",
    });

    $(".empty-cart-message p").css({
      "margin-bottom": "2rem",
      color: "var(--light-text)",
    });
  }

  function showNotification(message, type = "success") {
    // Create notification element if it doesn't exist
    if ($(".notification").length === 0) {
      $("body").append('<div class="notification"></div>');

      // Style the notification
      $(".notification").css({
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 20px",
        "border-radius": "4px",
        "box-shadow": "0 2px 10px rgba(0,0,0,0.1)",
        "z-index": "1000",
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 0.3s ease",
      });
    }

    // Set notification color based on type
    if (type === "success") {
      $(".notification")
        .css("background-color", "#9488de")
        .css("color", "white");
    } else if (type === "error") {
      $(".notification")
        .css("background-color", "#dc3545")
        .css("color", "white");
    }

    // Update message and show notification
    $(".notification").text(message);
    $(".notification").css({
      opacity: "1",
      transform: "translateY(0)",
    });

    // Hide notification after 3 seconds
    setTimeout(function () {
      $(".notification").css({
        opacity: "0",
        transform: "translateY(20px)",
      });
    }, 3000);
  }

  // Initialize
  updateCartTotal();

  // Checkout Steps Navigation
  $("#shipping-form").submit(function (e) {
    e.preventDefault();

    // In a real implementation, this would validate the form
    // For demonstration, we'll just proceed to the next step
    $(".progress-step").removeClass("active").eq(1).addClass("active");
    $(".progress-step").eq(0).addClass("completed");
    $(".checkout-step").removeClass("active");
    $("#payment-step").addClass("active");

    // Scroll to top
    $("html, body").animate(
      {
        scrollTop: $(".checkout-section").offset().top - 100,
      },
      500
    );
  });

  $("#payment-form").submit(function (e) {
    e.preventDefault();

    // In a real implementation, this would validate the form
    // For demonstration, we'll just proceed to the next step
    $(".progress-step").removeClass("active").eq(2).addClass("active");
    $(".progress-step").eq(1).addClass("completed");
    $(".checkout-step").removeClass("active");
    $("#review-step").addClass("active");

    // Scroll to top
    $("html, body").animate(
      {
        scrollTop: $(".checkout-section").offset().top - 100,
      },
      500
    );
  });

  // Back Buttons
  $(".back-btn").click(function () {
    const currentStep = $(".checkout-step.active").attr("id");

    if (currentStep === "payment-step") {
      $(".progress-step").removeClass("active").eq(0).addClass("active");
      $(".progress-step").eq(0).removeClass("completed");
      $(".checkout-step").removeClass("active");
      $("#shipping-step").addClass("active");
    } else if (currentStep === "review-step") {
      $(".progress-step").removeClass("active").eq(1).addClass("active");
      $(".progress-step").eq(1).removeClass("completed");
      $(".checkout-step").removeClass("active");
      $("#payment-step").addClass("active");
    }

    // Scroll to top
    $("html, body").animate(
      {
        scrollTop: $(".checkout-section").offset().top - 100,
      },
      500
    );
  });

  // Edit Buttons in Review Step
  $(".edit-btn").click(function () {
    const step = $(this).data("step");

    if (step === "shipping") {
      $(".progress-step")
        .removeClass("active completed")
        .eq(0)
        .addClass("active");
      $(".checkout-step").removeClass("active");
      $("#shipping-step").addClass("active");
    } else if (step === "payment") {
      $(".progress-step")
        .removeClass("active completed")
        .eq(0)
        .addClass("completed");
      $(".progress-step").eq(1).addClass("active");
      $(".checkout-step").removeClass("active");
      $("#payment-step").addClass("active");
    }

    // Scroll to top
    $("html, body").animate(
      {
        scrollTop: $(".checkout-section").offset().top - 100,
      },
      500
    );
  });

  // Place Order Button
  $(".place-order-btn").click(function () {
    // Check if terms are accepted
    if ($("#terms").is(":checked")) {
      // In a real implementation, this would submit the order
      // For demonstration, we'll just redirect to the confirmation page
      window.location.href = "order-confirmation.html";
    } else {
      showNotification("Please accept the terms and conditions", "error");

      // Highlight the terms checkbox
      $(".terms-conditions").css("color", "#dc3545");
      setTimeout(function () {
        $(".terms-conditions").css("color", "");
      }, 2000);
    }
  });

  // Payment Method Selection
  $('input[name="payment"]').change(function () {
    const paymentMethod = $(this).val();

    if (paymentMethod === "credit-card") {
      $(".credit-card-form").show();
    } else {
      $(".credit-card-form").hide();
    }
  });

  // Billing Address Toggle
  $("#same-address").change(function () {
    if ($(this).is(":checked")) {
      // In a real implementation, this would hide billing address fields
      // For demonstration, we'll just show a message
      console.log("Using shipping address as billing address");
    } else {
      // In a real implementation, this would show billing address fields
      // For demonstration, we'll just show a message
      console.log("Using different billing address");
    }
  });

  // Promo Code Toggle
  $(".promo-toggle").click(function () {
    $(".promo-code-form").slideToggle();
  });

  // Apply Promo Button
  $(".apply-promo").click(function () {
    const promoCode = $(this).siblings("input").val().trim();

    if (promoCode) {
      // In a real implementation, this would validate the promo code
      // For demonstration, we'll just show a success message
      showNotification("Promo code applied successfully");

      // Update order summary
      const subtotal = parseFloat(
        $(".summary-totals .summary-row:first-child span:last-child")
          .text()
          .replace("$", "")
      );
      const discount = 15; // Example discount amount

      // Add discount row if it doesn't exist
      if ($(".summary-totals .discount-row").length === 0) {
        $(".summary-totals .summary-row:first-child").after(`
                  <div class="summary-row discount-row">
                      <span>Discount</span>
                      <span>-$${discount.toFixed(2)}</span>
                  </div>
              `);
      } else {
        $(".summary-totals .discount-row span:last-child").text(
          `-$${discount.toFixed(2)}`
        );
      }

      // Update total
      const shipping = parseFloat(
        $(".summary-totals .summary-row:nth-child(3) span:last-child")
          .text()
          .replace("$", "")
      );
      const tax = parseFloat(
        $(".summary-totals .summary-row:nth-child(4) span:last-child")
          .text()
          .replace("$", "")
      );
      const total = subtotal + shipping + tax - discount;

      $(".summary-totals .total-row span:last-child").text(
        `$${total.toFixed(2)}`
      );
    } else {
      showNotification("Please enter a promo code", "error");
    }
  });

  // Helper function to show notification
  function showNotification(message, type = "success") {
    // Create notification element if it doesn't exist
    if ($(".notification").length === 0) {
      $("body").append('<div class="notification"></div>');

      // Style the notification
      $(".notification").css({
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 20px",
        "border-radius": "4px",
        "box-shadow": "0 2px 10px rgba(0,0,0,0.1)",
        "z-index": "1000",
        opacity: "0",
        transform: "translateY(20px)",
        transition: "all 0.3s ease",
      });
    }

    // Set notification color based on type
    if (type === "success") {
      $(".notification")
        .css("background-color", "#9488de")
        .css("color", "white");
    } else if (type === "error") {
      $(".notification")
        .css("background-color", "#dc3545")
        .css("color", "white");
    }

    // Update message and show notification
    $(".notification").text(message);
    $(".notification").css({
      opacity: "1",
      transform: "translateY(0)",
    });

    // Hide notification after 3 seconds
    setTimeout(function () {
      $(".notification").css({
        opacity: "0",
        transform: "translateY(20px)",
      });
    }, 3000);
  }

  // Format credit card input
  $("#card-number").on("input", function () {
    let value = $(this).val().replace(/\D/g, "");
    let formattedValue = "";

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }

    $(this).val(formattedValue);
  });

  // Format expiry date input
  $("#expiry-date").on("input", function () {
    let value = $(this).val().replace(/\D/g, "");
    let formattedValue = "";

    if (value.length > 0) {
      formattedValue = value.substring(0, 2);
      if (value.length > 2) {
        formattedValue += "/" + value.substring(2, 4);
      }
    }

    $(this).val(formattedValue);
  });

  // Format CVV input
  $("#cvv").on("input", function () {
    let value = $(this).val().replace(/\D/g, "");
    $(this).val(value.substring(0, 4));
  });

  // Initialize
  updateCartTotal();

  // Toggle coupon form
  $(".coupon-toggle").click(function () {
    $(".coupon-form").slideToggle();
  });

  // Quantity Buttons
  $(".quantity-btn.decrease").click(function () {
    const input = $(this).siblings(".quantity-input");
    const currentValue = parseInt(input.val());
    if (currentValue > 1) {
      input.val(currentValue - 1);
      updateItemSubtotal($(this).closest(".cart-item"));
      updateCartTotal();
    }
  });

  $(".quantity-btn.increase").click(function () {
    const input = $(this).siblings(".quantity-input");
    const currentValue = parseInt(input.val());
    input.val(currentValue + 1);
    updateItemSubtotal($(this).closest(".cart-item"));
    updateCartTotal();
  });

  $(".quantity-input").change(function () {
    updateItemSubtotal($(this).closest(".cart-item"));
    updateCartTotal();
  });

  // Remove Item Button
  $(".remove-item").click(function () {
    $(this)
      .closest(".cart-item")
      .fadeOut(300, function () {
        $(this).remove();
        updateCartTotal();
        updateCartCount();

        // If no items left, show empty cart
        if ($(".cart-item").length === 0) {
          showEmptyCart();
        }
      });
  });

  // Clear Cart Button
  $(".clear-cart").click(function () {
    if (confirm("Are you sure you want to clear your cart?")) {
      $(".cart-item").fadeOut(300, function () {
        $(".cart-items").empty();
        updateCartTotal();
        updateCartCount();
        showEmptyCart();
      });
    }
  });

  // Apply Coupon Button
  $(".apply-coupon").click(function () {
    const couponCode = $(".coupon-input").val().trim();

    if (couponCode) {
      // In a real implementation, this would validate the coupon code
      // For demonstration, we'll just show a discount
      $(".discount-row").removeClass("hidden");
      $(".cart-discount").text("-$15.00");
      updateCartTotal(15);
      showNotification("Coupon applied successfully");
    } else {
      showNotification("Please enter a coupon code", "error");
    }
  });

  // Add to Cart Button (for recommended products)
  $(".action-btn.add-to-cart").click(function () {
    const productCard = $(this).closest(".product-card");
    const title = productCard.find(".product-title").text();
    const price = productCard.find(".product-price").text();
    const imgSrc = productCard.find("img").attr("src");

    // Add to cart count
    const currentCount = parseInt($(".cart-count").text());
    $(".cart-count").text(currentCount + 1);

    // Show notification
    showNotification(title + " added to cart");
  });

  // Helper Functions
  function updateItemSubtotal(item) {
    const price = parseFloat(item.find(".item-price").text().replace("$", ""));
    const quantity = parseInt(item.find(".quantity-input").val());
    const subtotal = price * quantity;
    item.find(".subtotal-value").text("$" + subtotal.toFixed(2));
  }

  function updateCartTotal(discount = 0) {
    let subtotal = 0;

    // Calculate subtotal
    $(".cart-item").each(function () {
      const price = parseFloat(
        $(this).find(".item-price").text().replace("$", "")
      );
      const quantity = parseInt($(this).find(".quantity-input").val());
      subtotal += price * quantity;
    });

    // Update subtotal display
    $(".cart-subtotal").text("$" + subtotal.toFixed(2));

    // Calculate tax (10%)
    const tax = subtotal * 0.1;
    $(".cart-tax").text("$" + tax.toFixed(2));

    // Calculate shipping (flat rate or free if over $150)
    let shipping = subtotal >= 150 ? 0 : 12.99;
    $(".cart-shipping").text(
      shipping === 0 ? "FREE" : "$" + shipping.toFixed(2)
    );

    // Calculate total
    const total = subtotal + tax + shipping - discount;
    $(".cart-total").text("$" + total.toFixed(2));

    // Update cart header
    const totalItems = getTotalItems();
    $(".cart-header h2").text(
      `Your Cart (${totalItems} item${totalItems !== 1 ? "s" : ""})`
    );
  }

  function updateCartCount() {
    const totalItems = getTotalItems();
    $(".cart-count").text(totalItems);
  }

  function getTotalItems() {
    let totalItems = 0;

    $(".cart-item").each(function () {
      const quantity = parseInt($(this).find(".quantity-input").val());
      totalItems += quantity;
    });

    return totalItems;
  }

  function showEmptyCart() {
    // Get the empty cart template
    const emptyCartTemplate = document.getElementById("empty-cart-template");
    const emptyCartContent = document.importNode(
      emptyCartTemplate.content,
      true
    );

    // Replace cart content with empty cart message
    $(".cart-items").html(emptyCartContent);

    // Hide cart sidebar
    $(".cart-sidebar").hide();
  }

  function showNotification(message, type = "success") {
    // Create notification element if it doesn't exist
    if ($(".notification").length === 0) {
      $("body").append('<div class="notification"></div>');
    }

    // Set notification color based on type
    if (type === "success") {
      $(".notification").css("background-color", "#9488de");
    } else if (type === "error") {
      $(".notification").css("background-color", "#dc3545");
    }

    // Update message and show notification
    $(".notification").text(message);
    $(".notification").css({
      opacity: "1",
      transform: "translateY(0)",
    });

    // Hide notification after 3 seconds
    setTimeout(function () {
      $(".notification").css({
        opacity: "0",
        transform: "translateY(20px)",
      });
    }, 3000);
  }
});
