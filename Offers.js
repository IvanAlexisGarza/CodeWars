Offers.loadSearchOffersExample = function () {

    var parentNode = document.getElementById("hb-search");

    if (typeof parentNode === 'undefined' || parentNode === null) {
        return;
    }
    
    var offerNode = document.createElement("div");

    offerNode.className = "dynamic-offer";
    offerNode.id = "fs-search-1";
    parentNode.appendChild(offerNode);
    console.log("Div for SEARCH Offer created.");

    Offers.getIps();
    Offers.loadSearchOffers({'placementType': 'search', 'focusArea':'all', 'searchTerm': 'searchTerm-value'});
}

Offers.loadSearchOffersExample();

//-----------

loadSearchOffersExample = function () {

    var parentNode = document.getElementById("hb-search");

    if (typeof parentNode === 'undefined' || parentNode === null) {
        return;
    }
    
    var offerNode = document.createElement("div");

    offerNode.className = "dynamic-offer";
    offerNode.id = "fs-search-1";
    parentNode.appendChild(offerNode);
    console.log("Div for SEARCH Offer created.");
}

loadSearchOffersExample();

$("#hb-search").prepend('<div class="dynamic-offer" id="fs-headerfooter-hbr"></div>');
<div class="dynamic-offer" id="fs-search-csl"></div>


Eshnuk

Jerimiah Rosser

BeakerSeekers 