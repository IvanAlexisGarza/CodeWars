function Offers() {

    // Main data values
    this.sessionData = {
      sessionId: null,
      ips: [],
      referrerDomain: "",
      searchTerm: "NULL",
      isNewVisitor: false,
      cid: "NULL",
      iCount: 0,
      marketingPageId: "",
      marketingRegion: "",
      pagePath: "",
      userType: "",
      channel: ""
    };
  
    this.debugOffers = false;
    this.ips_detail = [];
    this.payload = false;
    this.waitForPayload = false;
    this.executed = false;
  
    // Initialization Management
    this.initComplete = false;
  
    // not used
    this.initStart = new Date().getTime();
    this.initEnd = 0;
    this.initDuration = 0;
  
    // Cookie Management
    this.getCookie = function (cookieName) {
      var nameEQ = cookieName + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
          var value = c.substring(nameEQ.length, c.length);
          value = unescape(value);
          return value;
        }
      }
  
      return null;
    };
  
    this.monitorCookie = function () {
  
      var cookieValue = this.getCookie('s_vi');
  
      if (this.debugOffers) {
        console.log("cookieValue = " + cookieValue);
      }
  
      if (this.sessionData.sessionId !== cookieValue) {
        window.clearInterval(this.monitorCookieInterval);
        this.sessionData.sessionId = cookieValue;
      }
  
      this.monitorCookieIntervalCount++;
  
      if (this.monitorCookieIntervalCount === 25) {
        window.clearInterval(this.monitorCookieInterval);
        this.sessionData.sessionId = 'cookies-disabled';
      }
    };
  
    // Get this ASAP during page load so that we can react to the state and any modification
    this.sessionData.sessionId = this.getCookie('s_vi');
    this.monitorCookieInterval = null;
    this.monitorCookieIntervalCount = 0;
    if (this.sessionData.sessionId == null) {
      this.monitorCookieInterval = window.setInterval("Offers.monitorCookie()", 100);
    }
  
    //set referrerDomain
    if (typeof document.referrer !== 'undefined' && document.referrer.length > 0) {
      var refReg = document.referrer;
      var domain = refReg.match(/:\/\/([^/]+)\//)[1];
      if (domain.indexOf("thermofisher.com") == -1) {
        this.sessionData.referrerDomain = domain;
  
      }
    }
  
    this.monitorjQuery = function (callback) {
      if (typeof $ !== 'undefined') {
        callback();
      } else {
        window.setTimeout(function () {
          Offers.monitorjQuery(callback);
        }, 100);
      }
    };
  
    // Request Parameter Management
    this.getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i,
        result = false;
  
      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] === sParam) {
          result = sParameterName[1] === undefined ? true : sParameterName[1];
          break;
        }
      }
  
      return result;
    };
  
    this.setPostParameters = function () {
  
      this.executed = true;
  
      this.sessionData.isNewVisitor = this.getIsNewVisitor("s_days_since");
  
      var cidParam = this.getQueryParam('CID');
  
      if (cidParam.length !== 0) {
        this.sessionData.cid = cidParam;
      }
  
      this.sessionData.iCount = this.sessionData.ips.length;
      this.sessionData.channel = this.getChannel();
      this.setUserType();
      this.setMarketingRegion();
      this.setMarketingPageId();
      this.getIps();
      this.sessionData.pagePath = this.processPagePath(window.location.pathname, window.location.search);
  
      if (this.payload) {
  
        if (this.payload.hasOwnProperty("skus")) {
          this.payload.pdpSkus = this.payload.skus;
          delete this.payload.skus;
        }
  
        if (this.payload.hasOwnProperty("cartTotal")) {
          this.payload.cartTotal = this.payload.cartTotal.replace(/[$,]+/g, "");
        }
  
        if (this.payload.hasOwnProperty("cartSkus")) {
          this.payload.cartSkus = this.createCartSkusObj(this.payload.cartSkus);
        }
  
        $.extend(this.sessionData, this.payload);
      }
  
      // Printing the request payload in debug mode
      if (this.debugOffers) {
        console.log("offers.js - Offers Request Payload: " + JSON.stringify(this.sessionData));
      }
    };
  
    this.getIps = function () {
      // interaction points for offers -> ips
      // detailed information about interaction points -> ips_detail
      this.sessionData.ips = [];
      this.ips_detail = [];
  
      $(".dynamic-offer[id]").each(function () {
        var _id = $(this).attr('id');
        Offers.sessionData.ips.push(_id);
        Offers.ips_detail.push({
          "name": _id,
          "type": "id"
        });
      });
  
      $(".dynamic-offer:not([id])").each(function () {
        var classes = $(this).attr("class").split(" ");
        for (var i = 0; i < classes.length; i++) {
          var _class = classes[i];
          if (_class.indexOf(Offers.sessionData.channel+"-") > -1 && Offers.arrayIndexOf(Offers.sessionData.ips, _class) == -1) {
            // select classes having both "dynamic-offer" and "tf"
            // avoid duplicates
            Offers.sessionData.ips.push(_class);
            Offers.ips_detail.push({
              "name": _class,
              "type": "class"
            });
          }
        }
      });
    };
  
    this.init = function () {
      // Finish fast if state indicates completion
      if (this.initComplete) {
        return;
      }
  
      // Wait until jQuery is loaded on the page
      if (typeof $ == 'undefined') {
        this.monitorjQuery(function () {
          Offers.init();
        });
  
        return;
      }
  
      // request parameters
      debugOffers = this.getUrlParameter('debug_offers');
  
      if (typeof debugOffers !== 'undefined') {
        this.debugOffers = debugOffers;
      }
      console.log("offers.js - debugOffers flag = " + this.debugOffers);
  
      // do not monitor cookies if cookies are disabled
      if (!navigator.cookieEnabled) {
        this.sessionData.sessionId = 'cookies-disabled';
      }
  
      // update state to indicate the init method is complete
      this.initComplete = true;
  
    }; //init complete
  
    this.loadOffers = function (payload) {
  
      if (payload) {
        this.payload = payload;
      }
  
      // document must be ready and sessionID must have value
      if (document.readyState !== "complete" && document.readyState !== "interactive") {
        $(function () {
          Offers.loadOffers();
        });
        return;
      }
  
      if (!this.minimalVersion()) {
        return;
      }
  
      if (!this.sessionData.sessionId) {
        window.setTimeout(function () {
          Offers.loadOffers();
        }, 100);
        return;
      }
  
      this.offersRequired();
  
      if (this.execute()) {
  
        this.setPostParameters();
        this.invokeOfferSnippetAjax();
      }
    };
  
    this.execute = function () {
      return (((!this.payload && !this.waitForPayload) || (this.waitForPayload && this.payload)) && !this.executed)
    }
    
    this.validatePayload = function (payload, placement) {
      var isValid = false;
      if (placement === 'search') {
        var searchData = payload;  
        if (searchData === null || typeof searchData === 'undefined') {
          console.log("Empty payload to request dynamic offer for search result page.");
        }
        else if (!searchData.hasOwnProperty("searchTerm")) {
          console.log("Missing parameter searchTerm in the payload.");
        }
        else if (!searchData.hasOwnProperty("focusArea")) {
          console.log("Missing parameter focusArea in the payload.");
        }
        else {
          isValid = true;
          if (searchData["searchTerm"] === null || searchData["searchTerm"].trim().length === 0) {
            console.warn("WARN: empty search term.");
            isValid = true; // TO-DO: change to false if requires non-empty search term.
          }
          if (searchData["focusArea"] === null || searchData["focusArea"].trim().length === 0) {
            console.warn("WARN: Empty focus area.");
            isValid = true; // TO-DO: change to false if requires non-empty focus area.
          }
        }
      }
      // TO-DO: validation for other placements.
      return isValid;
    }
  
    this.loadSearchOffers = function (searchData) {
      // velidate searchData
      // fields: searchTerm, focusArea
      this.validatePayload(searchData, 'search');
      console.log("Loading search offer with payload: " + JSON.stringify(searchData));
      this.loadOffers(searchData);
    };
  
    this.loadPdpOffers = function (pdpData) {
      this.loadOffers(pdpData);
    };
  
    this.loadCartOffers = function (cartData) {
      this.loadOffers(cartData);
    };
  
    this.createCartSkusObj = function (cartSkuObj) {
      var cartSkus = {};
      if (cartSkuObj) {
        for (var _obj = 0; _obj < cartSkuObj.length; _obj++) {
  
          var sku = cartSkuObj[_obj].sku;
          var qty = cartSkuObj[_obj].quantity;
          if (cartSkus.hasOwnProperty(sku)) {
            var currentQty = cartSkus[sku];
            cartSkus[sku] = currentQty + qty;
          } else {
            cartSkus[sku] = qty;
          }
  
        }
      }
      return cartSkus;
    };
  
    this.invokeOfferSnippetAjax = function () {
      $.ajax({
        url: "/event/offer/load",
        type: "POST",
        data: JSON.stringify(this.sessionData),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        timeout: 8000,
        success: function (data, textStatus, jqXHR) {
  
          if (jqXHR && jqXHR.hasOwnProperty("responseText")) {
  
            var dynamicOffers = JSON.parse(jqXHR.responseText);
  
            Offers.setInteractValues(dynamicOffers);
  
            if (Offers.debugOffers) {
              console.log("offers.js - Starting loading offers for session:::: " +
              dynamicOffers.hasOwnProperty("statusCode") ? "status code : " + dynamicOffers.statusCode : "no status code");
            }
  
            if (dynamicOffers.hasOwnProperty("statusCode") && dynamicOffers.statusCode == 200) {
              //Load all offer Snippets on Page
              Offers.loadOfferSnippetHTML(dynamicOffers.offerPlacementMap);
  
            } else {
              console.log("offers.js - Status Code: Not defined or not 200. Showing default contents.");
              Offers.showDefaultContent();
            }
  
          } else {
            console.log("offers.js - No jqXHR.hasOwnProperty - responseText");
            Offers.showDefaultContent();
          }
        },
        error: function (qHRX, exception) {
          console.log("offers.js - Load call did not complete correctly");
          Offers.showDefaultContent();
        }
      }); //ajax
    };
  
    this.setInteractValues = function (values) {
  
      if (typeof Interact !== 'undefined') {
  
        var sessionId = (values.hasOwnProperty("sessionId") ? values.sessionId : "");
        var s_vi_low = (values.hasOwnProperty("s_vi_low") ? values.s_vi_low : "");
        var s_vi_high = (values.hasOwnProperty("s_vi_high") ? values.s_vi_high : "");
        var timeStamp = (values.hasOwnProperty("timeStamp") ? values.timeStamp : new Date());
  
        Interact.sessionId = sessionId;
        Interact.s_vi_low = s_vi_low;
        Interact.s_vi_high = s_vi_high;
        Interact.timeStamp = timeStamp;
        Interact.localTimeStamp = new Date();
  
        this.cid = this.getCookie('s_cmp_tc');
  
        // Flag startSessionComplete as resolved promise
        Interact.startSessionComplete.resolve();
  
        if (this.debugOffers) {
          console.log("offers.js - Interact sessionId = " + Interact.sessionId);
          console.log("offers.js - Interact s_vi_low = " + Interact.s_vi_low);
          console.log("offers.js - Interact s_vi_high = " + Interact.s_vi_high);
          console.log("offers.js - Interact timeStamp = " + Interact.timeStamp);
          console.log("offers.js - Interact startSessionComplete  as resolved");
        }
  
      } else if (this.debugOffers) {
        console.log("offers.js - Interact object not defined!!!");
      }
    };
  
    this.showDefaultContent = function (value) {
      var $loadingWheelBlock;
      var $loadingWheel;
  
      if (value) {
        var selector = $("#" + value).length > 0 ? "#" : ".";
        $loadingWheelBlock = $(selector + value).children(".loading-wheel-block");
        $loadingWheel = $loadingWheelBlock.children(".loading-wheel");
        console.log("offers.js - Showing default content for: " + selector + value);
      } else {
        console.log("offers.js - Showing default content");
        $loadingWheelBlock = $(".loading-wheel-block");
        $loadingWheel = $(".loading-wheel");
      }
  
      var $defaultOffer = $loadingWheelBlock.children(".defaultOffer");
      $loadingWheelBlock.css("padding-top", "0px");
      $defaultOffer.css("visibility", "visible");
      $loadingWheel.remove();
  
      if (this.sessionData.channel === "fs") {
          $defaultOffer.find(".parsys.content-par-main").removeAttr("style");
      }
    };
  
    this.loadOfferSnippetHTML = function (offerPlacementMap) {
      //Get the divs need to render on page;
      var ips = this.ips_detail;
      var requestedOffer = 0;
  
      if (!ips) {
        return;
      }
  
      if (!offerPlacementMap) {
        this.showDefaultContent();
        return;
      }
  
      for (var key = 0; key < ips.length; key++) {
        var divId = ips[key].name; // The divId means div identifier, including id & class.
        var divType = ips[key].type; // The type can be id & class
  
        if (!offerPlacementMap.hasOwnProperty(divId)) {
          this.showDefaultContent(divId);
        } else {
          var offerObj = offerPlacementMap[divId];
          var snippetPath = offerObj.hasOwnProperty("snippetPath") ? offerObj.snippetPath : "";
  
          this.loadIndividualOffer(divId, offerObj, snippetPath, key, divType);
          requestedOffer++;
  
          if (this.debugOffers) {
            console.log("offers.js - Offer for div " + divType + ": " + divId + " -> " + JSON.stringify(offerObj));
  
            var landingUrl = offerObj.hasOwnProperty("offerUrl") ? offerObj["offerUrl"] : "";
            var offerUrl = offerObj.hasOwnProperty("offerUrl") ? offerObj["offerUrl"] : "";
            var treatmentCode = offerObj.hasOwnProperty("treatmentCode") ? offerObj["treatmentCode"] : "";
            var interactPoint = offerObj.hasOwnProperty("interactPoint") ? offerObj["interactPoint"] : "";
            var offerIcid = offerObj.hasOwnProperty("offerIcid") ? offerObj["offerIcid"] : "";
            var debug = this.buildDebugDetails(this.sessionData.sessionId, interactPoint, offerUrl, treatmentCode, landingUrl, offerIcid, snippetPath);
            var divToLoadOfferObj = $((divType === "id" ? "#" : ".") + divId);
            divToLoadOfferObj.after(debug);
          } // debug finish
        } // if else loop finishes
      } //for loop finishes
  
      if (this.debugOffers) {
        console.log("offers.js - loadOfferSnippetHTML: Total Offer to execute = " + requestedOffer);
      }
    }; //loadOfferSnippetHTML - finishes
  
    /**
     * Takes a snippet path and append the jcr syntax at the end
     * @param path - Snippet path URL in the form of /us/en/offers/common/2018/q1/of-18-00000/wb-18-00000s/hro.html
     * @return {string} - The formatted snippet path
     *                    /us/en/Offers/common/2018/q1/of-18-00000/wb-18-00000s/HRO/jcr:content/content-par-main.html
     */
    this.jcrContentFormat = function (path) {
      var JCR_CONTENT = "/jcr:content/content-par-main.html"; // Fishersci jcr:content syntax
      return path.split(".html")[0] + JCR_CONTENT;
    };
  
    this.loadIndividualOffer = function (divId, offerObj, snippetPath, key, divType) {
  
      var currOfferObj = offerObj;
      var currentSnippetPath = snippetPath;
      var currentDivId = divId;
      var divToLoadOfferObj = $((divType === "id" ? "#" : ".") + currentDivId);
      var currentOfferURL = currOfferObj.offerUrl;
      var offerType = {};
      offerType.isCartOffer = (divId.indexOf(this.sessionData.channel + "-cart") > -1);
      offerType.isCQOffer = (divId.indexOf(this.sessionData.channel + "-cq") > -1);
      offerType.isPdpOffer = (divId.indexOf(this.sessionData.channel + "-pdp") > -1);
      offerType.isSearchOffer = (divId.indexOf(this.sessionData.channel + "-search") > -1);
  
      if (this.sessionData.channel === "fs") {
        currentSnippetPath = this.jcrContentFormat( currentSnippetPath );
      }
  
      if (this.debugOffers) {
        console.log("offers.js - snippetPath for divId : " + currentDivId + "= " + currentSnippetPath);
      }
  
      $.ajax({
        url: currentSnippetPath,
        success: function (htmlSnippet) {
  
          // Initiate the Interact "contact" post event
          Offers.postEvent(currOfferObj.sessionId, currOfferObj.treatmentCode, 'contact');
  
          // Add icid param if given
          var currentOfferURLwithIcid = currentOfferURL;
          var icid = "";
          
          if (currOfferObj.hasOwnProperty("offerIcid")) {
            icid = currOfferObj.offerIcid;
          }
  
          if (typeof currentOfferURL !== 'undefined' && typeof icid !== 'undefined' && icid.length > 0) {
            icid = icid.replace(/\s+/g, ''); // Remove spaces
            currentOfferURLwithIcid = Offers.addParameter(currentOfferURL, 'icid', icid);
          }
          
          // If an offer is received and is not a full HTML page
          if (Offers.isValidHtmlOfferStructure(htmlSnippet)) {
          
            divToLoadOfferObj.html(htmlSnippet);
            divToLoadOfferObj.removeClass("hide");
  
            Offers.ctaAction(offerType, divToLoadOfferObj, currOfferObj, currentOfferURLwithIcid, key);
          } else {
            Offers.showDefaultContent(divId);
          }
  
        },
        error: function () {
          Offers.showDefaultContent(divId);
        }
      });
    };
  
  
    this.ctaAction = function (offerType, divToLoadOfferObj, currOfferObj, currentOfferURLwithIcid, key) {
  
      if (offerType.isCartOffer) {
        this.initCartCtaActions(divToLoadOfferObj, currentOfferURLwithIcid, key, currOfferObj);
  
      } else if (offerType.isPdpOffer) {
        this.initPdpCtaActions(divToLoadOfferObj, currentOfferURLwithIcid, currOfferObj);
  
      } else if (offerType.isCQOffer) {
        // offer url for FS CQ can be from either Interact or CQ component.
        this.initCqCtaActions(divToLoadOfferObj, currOfferObj);
  
      } else if (offerType.isSearchOffer) {
        this.initSearchCtaActions(divToLoadOfferObj, currentOfferURLwithIcid, currOfferObj);
  
      } else {
        this.initHeaderFooterCtaActions(divToLoadOfferObj, currentOfferURLwithIcid, currOfferObj);
      }
  
    };
  
    /**
     * @method validateOfferHeadTag
     *
     * Determines if the received offer doesn't have a <head> HTML tag
     * or if it's present that at least it's empty, i.e, "<head></head>"
     *
     * @return {boolean} True if the description above is fulfilled
     */
    this.isValidHtmlOfferStructure = function (data) {
      var isValid = false;
  
      // If HTML data string received has index of <head> then is not valid offer
      if (typeof data !== "undefined" && data.length > 0) {
        if (data.indexOf("<head>") == -1) {
          isValid = true;
        } else {
          var doc = new DOMParser().parseFromString(data, "text/html"); // Having an HTML parsed doc for xbrowser compatibility
          var $head = $(doc).find("head"); // Find the <head> tag inside the offer HTML
  
          // If the <head> tag exist check if it's empty, i.e. <head></head>
          if (typeof $head !== "undefined" && $head.length > 0) {
            var headHtml = $head.html(); // Get the <head> html information
            // If there is any information inside the <head> tag that means is not an offer HTML
            if (typeof headHtml !== "undefined" && headHtml.trim().length == 0) {
              isValid = true;
            }
          }
        }
      }
  
      return isValid;
    };
  
    /**
     * Sends information to Adobe Analytics
     * @param action - The application type, i.e, pdp, search, cq...
     * @param clickObject - The object that has been clicked
     * @param offer - The offers returned from Interact
     * @param key - Only used by search
     */
    this.sendAnalytics = function (action, clickObject, offer, key) {
      switch (this.sessionData.channel) {
        case "tf":
          this.tfAnalytics(action, clickObject, offer, key);
          break;
  
        case "fs":
          this.fsAnalytics(action, clickObject, offer);
          break;
      }
    };
  
    /**
     * Sends information to Adobe Analytics for CQ Fishersci
     * @param action - The application type, i.e, cq
     * @param clickObject - The object that has been clicked
     * @param offer - The offers returned from Interact
     */
    this.fsAnalytics = function (action, clickObject, offer) {
      if (typeof s !== 'undefined') {
        s.linkTrackVars = "eVar80";
  
        switch (action) {
          case "cq":
          case "search":
            s.eVar80 = offer.offerIcid;
            console.log("CQ Adobe Analytics - s.eVar80 = " + offer.offerIcid);
            break;
        }
  
        s.tl(clickObject, "o", "", null, null);
      }
      else {
        console.log("Object s not defined.");
      }
    };
  
    /**
     * Sends information to Adobe Analytics for Thermofisher
     * @param action - The application type, i.e, pdp, search, cart...
     * @param clickObject - The object that has been clicked
     * @param offer - The offers returned from Interact
     * @param key - Only used by cart
     */
    this.tfAnalytics = function (action, clickObject, offer, key) {
      if (typeof s !== 'undefined') {
        var promo = '';
        var promoType = '';
  
        s.linkTrackVars = "prop66,eVar66,prop67,eVar67";
  
        switch (action) {
          case "pdp":
            // Get the SKU from the url
            var sku = location.pathname.replace(/^(\/[a-z]+)(\/[a-z]+)(\/[a-z]+)(\/)/g, '');
            var originalPageUrl = s.pageURL;
  
            promoType = "PDP Offers";
            promo = "View PDP (" + sku + "): UpSell Promotion- 0";
  
            this.pdpAnalytics(offer.offerIcid);
  
            break;
  
          case "search":
            promoType = "Search Offers";
            promo = "View Search Page: Promotion- 0";
  
            this.searchAnalytics(offer.offerIcid);
  
            break;
  
          case "cart":
            promo = "View Cart: UpSell Promotion- " + key;
            promoType = "Cart Offers";
  
            break;
        }
  
        s.prop66 = promo;
        s.eVar66 = promo;
        s.prop67 = promo;
        s.eVar67 = promo;
  
        s.tl(clickObject, "o", promoType, null, null);
  
        if (action === 'pdp') {
          s.pageURL = originalPageUrl;
        }
      }
    };
  
    this.pdpAnalytics = function (icid) {
      if (typeof icid !== 'undefined' && icid.length > 0) {
        s.linkTrackVars += ",eVar21";
        s.eVar21 = icid;
        s.pageURL = this.addParameter(s.pageURL, 'icid', icid);
  
        var currentDate = new Date();
        currentDate.setTime(currentDate.getTime());
        this.setCookie('s_ev21_tc', '', currentDate);
      }
    };
  
    this.searchAnalytics = function (icid) {
  
      var promo2 = "AEM|S earch Results";
      var keyWord = '';
  
      if (this.isValidValue(search.main.params.autoCorrectedKeyword)) {
        keyWord = search.main.params.autoCorrectedKeyword;
      } else {
        keyWord = this.sessionData.searchTerm.toLowerCase();
      }
  
      s.linkTrackVars += ",prop14,eVar14";
      s.prop14 = promo2;
      s.eVar14 = promo2;
  
      if (this.isValidValue(keyWord)) {
        s.linkTrackVars += ",prop44,eVar44";
        var promo3 = "AEM|" + keyWord;
        s.prop44 = promo3;
        s.eVar44 = promo3;
  
        // 34 values
        if (this.isValidValue(icid)) {
          s.linkTrackVars += ",prop34,eVar34";
          var promo4 = "AEM|PROMO-CODE|" + icid + "|" + keyWord;
          s.prop34 = promo4;
          s.eVar34 = promo4;
        }
      }
    };
  
    this.initPdpCtaActions = function (divToLoadOfferObj, currentOfferURL, offers) {
  
      var btnClass = divToLoadOfferObj.find("button").attr("class");
      var detailLink = divToLoadOfferObj.find('button' + '.' + btnClass).first();
      var modalTarget = detailLink.data('target');
  
      // ensure valid modal div ID for jquery
      var originalId = modalTarget.substring(1);
      var validId = originalId.replace(/[^A-Za-z0-9\-\_]+/g, ""); // get rid of characters that bother jquery
      document.getElementById(originalId).id = validId;
      modalTarget = '#' + validId;
      detailLink.attr('data-target', modalTarget); // keep data-target consistent
  
      detailLink.attr('data-url', currentOfferURL);
      detailLink.unbind("click");
      detailLink.attr('data-toggle', 'hide');
  
      detailLink.click(function () {
        Offers.postEvent(offers.sessionId, offers.treatmentCode, 'accept');
        var $modalBody = $(modalTarget).find('div.modal-body');
        $modalBody.load(currentOfferURL + " .MainParsys", function (response, status, http) {
          if (status === "success") {
            detailLink.attr('data-toggle', 'modal');
            $(modalTarget).modal('show');
            console.log("Load offer url success: " + currentOfferURL);
          }
          if (status === "error") {
            console.log("Error " + http.status + ": " + http.statusText);
          }
        });
  
        Offers.sendAnalytics("pdp", this, offers);
  
      });
    };
  
    this.initCqCtaActions = function (divToLoadOfferObj, offers) {
      /*
       * CQ offers don't have a defined structure for the CTA so by finding
       * the CTA <a> is possible to trigger the click function
       */
  
      var $detailLink = divToLoadOfferObj.find("a");
      
      if (typeof $detailLink === "undefined") {
        console.log("offers.js - The CQ offer is not having an HTML a tag so the Accept event can't be added.");
        return;
      }
      
      var cqURL = $detailLink.attr("href"); 
      var interactURL = offers.offerUrl;
      var icid = offers.offerIcid;
       
      // Check if offer URL is contained in Interact response     
      var currentOfferURL = this.isValidInteractOfferUrl(interactURL) ? interactURL : cqURL;
   
      // Append icid
      currentOfferURL = Offers.addParameter(currentOfferURL, 'icid', icid);
  
      // Add hyperlink to <a>
      $detailLink.attr("href", currentOfferURL);
       
      // Add hyperlink to <img> 
      var emailId = Offers.getUrlParameter('emid');
      if (typeof emailId !== 'undefined' && emailId.length > 0) {
        currentOfferURL = Offers.addParameter(currentOfferURL, 'emid', emailId);
      }
      divToLoadOfferObj.find('img').each(function () {
        $(this).wrap($("<a/>").attr("href", currentOfferURL));
      });
   
      // CTA
      $detailLink.click(function () {
        // Initiate the Interact "accept" post event
        Offers.postEvent(offers.sessionId, offers.treatmentCode, 'accept');
  
        if (Offers.sessionData.channel === "fs") {
          // sent to AA in evar 80
          Offers.sendAnalytics("cq", this, offers);
        }
      }); 
    };
  
    /**
     * @method initSearchCtaActions - Called when the CTA on a Search offer is clicked
     *
     * @param {object} divToLoadOfferObj - .dynamic-offer JS Object
     * @param {String} currentOfferURL - Offer URL set by Interact
     * @param {JSON Object} offers - Interact Offer Response
     */
    this.initSearchCtaActions = function (divToLoadOfferObj, currentOfferURL, offers) {
  
      var $detailLink = divToLoadOfferObj.find("a");
  
      $detailLink.attr("href", currentOfferURL);
      $detailLink.click(function () {
        // Initiate the Interact "accept" post event
        Offers.postEvent(offers.sessionId, offers.treatmentCode, 'accept');
  
        Offers.sendAnalytics("search", this, offers);
  
      });
    };
  
    this.initHeaderFooterCtaActions = function (divToLoadOfferObj, currentOfferURL, offers) {
      /*
       *  HeaderFooter offers don't have the href setup when they're initialized on the page
       *  for the click to work the href must be set
       */
      var $detailLink;
      var index;
      var headerFooterId = divToLoadOfferObj.attr("id");
      var snippetClass = (headerFooterId.indexOf("hb") > -1) ? ".promo-bar-snippet" : ".landscape-banner-snippet";
  
      $detailLink = divToLoadOfferObj.find(snippetClass);
      $detailLink.attr("href", currentOfferURL);
  
      $detailLink.click(function () {
        // Initiate the Interact "accept" post event
        Offers.postEvent(offers.sessionId, offers.treatmentCode, 'accept');
      });
  
      // footer close button
      if (snippetClass === '.landscape-banner-snippet') {
        var renderOffers = $('#tf-headerfooter-lb');
  
        // find button in div
        renderOffers.find('button.landscape-banner-button').each(function () {
          $(this).click(function () {
            Offers.postEvent(offers.sessionId, offers.treatmentCode, 'reject');
          });
        });
      }
    };
  
    this.initCartCtaActions = function (divToLoadOfferObj, currentOfferURL, key, offers) {
  
      // Get the class of the element button that triggers the modal window
      var btnClass = divToLoadOfferObj.find('button').attr("class");
  
      // Bind link to open modal window
      var detailLink = divToLoadOfferObj.find('button' + '.' + btnClass);
      detailLink.attr('data-url', currentOfferURL);
      detailLink.unbind("click");
      detailLink.attr('data-toggle', 'hide');
  
      var modalTarget = detailLink.data('target');
  
      // Click on the CTA
      detailLink.click(function () {
  
        // Cart use case: Display a modal
        var $modalBody = $(modalTarget).find('div.modal-body');
  
        $modalBody.load(currentOfferURL + " .MainParsys", function () {
          detailLink.attr('data-toggle', 'modal');
          $(modalTarget).modal('show');
        });
  
        // Initiate the Interact "accept" post event
        Offers.postEvent(offers.sessionId, offers.treatmentCode, 'accept');
  
        Offers.sendAnalytics("cart", this, offers, key);
  
      });
    };
    
    this.isValidInteractOfferUrl = function (url) {
      return url !== null && typeof url !== "undefined" && url !== "." && url !== "_";
    }
  
    this.isValidValue = function (stringValue) {
      return (typeof stringValue !== 'undefined' && stringValue.length > 0);
    };
  
    this.buildDebugDetails = function (sessionId, interactPoint, offerUrl, treatmentCode, landingUrl, icid, snippetPath) {
  
      var debugDetails = "";
      debugDetails = "<div id='offerSnippetDebug'><div class='alert text-left' style='font-size: 10px; overflow-wrap: break-word;'>";
      debugDetails += "SessionId: " + sessionId + "<br>";
      debugDetails += "Interaction Point: " + interactPoint + "<br>";
      debugDetails += "OfferUrl: " + offerUrl + "<br>";
      debugDetails += "TreatmentCode: " + treatmentCode + "<br>";
      debugDetails += "Landing Url: " + landingUrl + "<br>";
      debugDetails += "ICID: " + icid + "<br>";
      debugDetails += "Snippet Path: " + snippetPath + "<br>";
      debugDetails += "</div></div>";
      console.log("debug=" + debugDetails);
      return debugDetails;
  
    };
  
    // Offer Acceptance Management
    this.postEvent = function (sessionId, treatmentCode, eventType) {
  
      if (this.debugOffers) {
        console.log("postEvent sessionId = " + sessionId);
        console.log("postEvent treatmentCode = " + treatmentCode);
        console.log("postEvent eventType = " + eventType);
      }
  
      if (typeof treatmentCode == 'undefined' || treatmentCode == '') {
        return true;
      }
  
      var postData = {};
      postData.sessionId = sessionId;
      postData.treatmentCode = treatmentCode;
      postData.eventType = eventType;
      postData.channel = this.sessionData.channel;
      postData.action = 'pageview';
  
      if (this.internal) {
        postData.internal = true;
      }
  
      $.ajax({
        url: "/event/offer/postevent",
        type: "POST",
        data: JSON.stringify(postData),
        contentType: "application/json; charset=utf-8",
        dataType: 'json'
      });
  
    }; //postEvent
  
    //cookie
    this.getIsNewVisitor = function (cookieName) {
      return Offers.getDaysSinceLastVisit(cookieName + '_new') === 'First Visit' ? true : false;
    };
  
    // cookie
    this.getDaysSinceLastVisit = function (cookieName) {
  
      var e = new Date();
      var es = new Date();
      var cval;
      var cval_s;
      var cval_ss;
      var ct = e.getTime();
      var day = 24 * 60 * 60 * 1000;
      var f0 = 'Cookies Not Supported';
      var f1 = 'First Visit';
      var f2 = 'More than 30 days';
      var f3 = 'More than 7 days';
      var f4 = 'Less than 7 days';
      var f5 = 'Less than 1 day';
  
      e.setTime(ct + 3 * 365 * day);
      es.setTime(ct + 30 * 60 * 1000);
      cval = Offers.getCookie(cookieName);
  
      if (cval === null || cval.length === 0) {
        Offers.setCookie(cookieName, ct, e);
        Offers.setCookie(cookieName + '_s', f1, es);
      } else {
        var d = ct - cval;
        if (d > 30 * 60 * 1000) {
          if (d > 30 * day) {
            Offers.setCookie(cookieName, ct, e);
            Offers.setCookie(cookieName + '_s', f2, es);
          } else if (d < 30 * day + 1 && d > 7 * day) {
            Offers.setCookie(cookieName, ct, e);
            Offers.setCookie(cookieName + '_s', f3, es);
          } else if (d < 7 * day + 1 && d > day) {
            Offers.setCookie(cookieName, ct, e);
            Offers.setCookie(cookieName + '_s', f4, es);
          } else if (d < day + 1) {
            Offers.setCookie(cookieName, ct, e);
            Offers.setCookie(cookieName + '_s', f5, es);
          }
        } else {
          Offers.setCookie(cookieName, ct, e);
          cval_ss = Offers.getCookie(cookieName + '_s');
          Offers.setCookie(cookieName + '_s', cval_ss, es);
        }
      }
  
      cval_s = Offers.getCookie(cookieName + '_s');
  
      if (!cval_s || cval_s.length === 0) {
        return f0;
      } else if (cval_s != f1 && cval_s != f2 && cval_s != f3 && cval_s != f4 && cval_s != f5) {
        return '';
      } else {
        return cval_s;
      }
    };
  
    this.setCookie = function (name, value, time) {
      document.cookie = name + "=" + value + ";path=/;expires=" + time.toGMTString() + "; domain=" + location.hostname.substring(location.hostname.lastIndexOf(".", location.hostname.lastIndexOf(".") - 1));
    };
  
    /* setting the marketingRegion from the ltCountryInfo object
     * If something is not defined it defaults to the US information (NA region)
     */
    this.setMarketingRegion = function () {
      if (typeof ltCountryInfo !== "undefined") {
        var isoCookie = (this.getCookie('CK_ISO_CODE') !== null) ? this.getCookie('CK_ISO_CODE') : "us";
        this.sessionData.marketingRegion = window.ltCountryInfo[isoCookie].regionMapping;
      } else {
        this.sessionData.marketingRegion = "NA";
      }
    };
  
    /**
     * Getting the marketing Page Id using the Interact Context Object
     * It defaults to HP if any object if undefined or empty
     * This is used to send data to the Offers Hub be able to build the Interaction Point
     */
    this.setMarketingPageId = function () {
  
      this.sessionData.marketingPageId = "HP";
  
      if (typeof interactClientContext !== "undefined" &&
        typeof interactClientContext.marketingPageId !== "undefined" &&
        interactClientContext.marketingPageId !== "") {
  
        this.sessionData.marketingPageId = interactClientContext.marketingPageId;
      }
    };
  
    // cookie
    // get CK_DISPLAY_TYPE(UserType) from cookie value
    this.setUserType = function () {
      if(this.sessionData.channel === "fs") {
        this.sessionData.userType = this.getCookie("estore");
  
        var punchoutCookie = this.getCookie("punchout");
        if(punchoutCookie && this.sessionData.userType) {
          this.sessionData.userType = this.sessionData.userType + "|" +  punchoutCookie;
        }
      } else if (this.sessionData.channel === "tf") {
        this.sessionData.userType = this.getCookie('CK_DISPLAY_TYPE');
      }
  
      if (!this.sessionData.userType) {
        this.sessionData.userType = 'anonymous';
      }
    };
  
    this.getQueryParam = function (param) {
      var index, key, value, hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (index = 0; index < hashes.length; index++) {
        hash = hashes[index].split('=');
        key = hash[0];
        value = hash[1];
        if (key.toUpperCase() === param.toUpperCase())
          return value;
      }
      return '';
    };
  
    this.addParameter = function (url, parameter, value) {
      // remove the parameter if it exists
      url = this.removeParameter(url, parameter);
  
      if (typeof url !== "undefined") {
        // add a question mark to url if not already present
        if (url.indexOf('?') == -1) {
          url = url + '?';
        }
  
        if (url.indexOf('?') != url.length - 1) {
          url = url + '&';
        }
  
        // add the parameter value
        url = url + parameter + '=' + value;
      }
  
      return url;
    };
  
    this.removeParameter = function (url, parameter) {
      var urlParts = (typeof url !== "undefined") ? url.split('?') : "";
  
      if (urlParts.length >= 2) {
        var urlBase = urlParts.shift(); //get first part, and remove from array
        var queryString = urlParts.join("?"); //join it back up
  
        var prefix = encodeURIComponent(parameter) + '=';
        var pars = queryString.split(/[&;]/g);
        for (var i = pars.length; i-- > 0;) //reverse iteration as may be destructive
          if (pars[i].lastIndexOf(prefix, 0) !== -1) //idiom for string.startsWith
            pars.splice(i, 1);
        url = urlBase + '?' + pars.join('&');
      }
  
      return url;
    };
  
    this.offersRequired = function () {
  
      if (this.sessionData.ips.length === 0) {
        this.getIps();
      }
  
      for (var key = 0; key < this.sessionData.ips.length; key++) {
        if (this.sessionData.ips[key].indexOf(this.sessionData.channel + "-cq") > -1) {
          break;
        }
        if (this.sessionData.ips[key].indexOf(this.sessionData.channel + "-headerfooter") == -1) {
          this.waitForPayload = true;
          break;
        }
      }
    };
  
    /**
     * Evaluates the JQuery minimal version of the current site
     * @return {boolean} True if the JQuery version is bigger or equals than 1.5
     */
    this.minimalVersion = function () {
      var MIN_VERSION_INT = 1;
      var MIN_VERSION_DECIMAL = 5;
      var currentVersion = $.fn.jquery.split(".");
      var currentVersionInt = parseInt(currentVersion[0]);
      var currentVersionDecimal = parseInt(currentVersion[1]);
  
      return ((currentVersionInt >= MIN_VERSION_INT) && (currentVersionDecimal >= MIN_VERSION_DECIMAL));
    };
  
    this.arrayIndexOf = function (array, obj, start) {
      for (var i = (start || 0), j = array.length; i < j; i++) {
        if (array[i] === obj) {
          return i;
        }
      }
      return -1;
    };
  
    /**
     * By using the URL hostname determines the current channel representing the website
     * @return {String} tf for ThermoFisher or fs for Fishersci, empty string otherwise
     */
    this.getChannel = function () {
      var THERMO_FISHER = "thermofisher.com";
      var FISHERSCI = "fishersci.com";
      var CHANNEL_TF = "tf";
      var CHANNEL_FS = "fs";
      var hostname = window.location.hostname;
      var isThermoFisher = (hostname.indexOf(THERMO_FISHER) > 0);
      var isFishersci = (hostname.indexOf(FISHERSCI) > 0);
      var channel = "";
  
      if (isThermoFisher) {
        channel = CHANNEL_TF;
      }
      if (isFishersci) {
        channel = CHANNEL_FS;
      }
  
      return channel;
    };
  
    /**
     * Removes 'debug_offers=true' from the URL
     * @param pathName - The URL without the host and query params. E.G /us/en/home.html
     * @param search - The query parameters. E.G ?debug_offers=true
     * @return {String} - The URL without debug-offers=true
     */
    this.processPagePath = function (pathName, search) {
      search = search.replace(/&?debug_offers=true&?/g, ""); // Removes 'debug_offers=true'
      search = search.replace(/\?$/g, ""); // Removes '?' if it's the last character
  
      return pathName + search;
    }
  }
  
  var Offers = new Offers();
  (function () {
    Offers.init();
  })();
  
  $(function () {
  
    Offers.loadOffers();
  
    window.setTimeout(function () {
      Offers.showDefaultContent();
    }, 5000);
  });