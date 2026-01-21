function MainModule(listingsID = "#listings") {
  const me = {};

  me.listings = [];

  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    const amenitiesArray = JSON.parse(listing.amenities || "[]");
    let amenitiesList = "";
    for (let i = 0; i < Math.min(amenitiesArray.length, 5); i++) {
      amenitiesList += `<li>${amenitiesArray[i]}</li>`;
    }

    const superhostBadge =
      listing.host_is_superhost === "t"
        ? `<span class="badge bg-success">Superhost</span>`
        : "";

    return `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
          <img
            src="${listing.picture_url}"
            class="card-img-top"
            alt="Listing Image"
            style="height: 250px; object-fit: cover;"
          />
          
          <div class="card-body">
            <div class="mb-2">${superhostBadge}</div>
            <h5 class="card-title">${listing.name}</h5>
            <p class="text-muted fw-bold">${listing.price}</p>
            
            <p class="card-text small overflow-auto" style="height: 120px;">
              ${listing.description}
            </p>

            <hr>
            
            <h6>Amenities:</h6>
            <ul class="small">
              ${amenitiesList}
            </ul>

            <hr>

            <div class="row">
              <div class="col-3">
                <img 
                  src="${listing.host_thumbnail_url}" 
                  class="img-fluid rounded-circle border" 
                  alt="Host"
                />
              </div>
              <div class="col-9">
                <p class="mb-0"><strong>${listing.host_name}</strong></p>
                <p class="text-muted small">Member since ${listing.host_since.split("-")[0]}</p>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <a href="${listing.listing_url}" class="btn btn-primary w-100">View Details</a>
          </div>
        </div>
      </div>
    `;
  }

  function sortByPriceLowToHigh() {
    me.listings.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[$,]/g, ""));
      const priceB = parseFloat(b.price.replace(/[$,]/g, ""));
      return priceA - priceB;
    });

    // 2. Redraw with the newly ordered list
    me.redraw(me.listings);
  }

  function sortByPriceHighToLow() {
    me.listings.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[$,]/g, ""));
      const priceB = parseFloat(b.price.replace(/[$,]/g, ""));
      return priceB - priceA;
    });

    // 2. Redraw with the newly ordered list
    me.redraw(me.listings);
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();

    me.listings = listings.slice(0, 50);
    me.redraw(me.listings);
  }

  me.redraw = redraw;
  me.loadData = loadData;
  me.sortByPriceLowToHigh = sortByPriceLowToHigh;
  me.sortByPriceHighToLow = sortByPriceHighToLow;

  return me;
}

const main = MainModule();

main.loadData();
document.querySelector("#sortLowToHigh").addEventListener("click", () => {
  main.sortByPriceLowToHigh();
});
document.querySelector("#sortHighToLow").addEventListener("click", () => {
  main.sortByPriceHighToLow();
});
