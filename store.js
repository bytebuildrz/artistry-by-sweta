/* ARTISTRY BY SWETA J — shared localStorage store (demo, this browser only).
   Key: art_store_v2. No backend: changes persist in this browser only.
   A real backend is still needed for cross-device saving and real orders.
   Seed products carry img: null — the built-in sample photos stay embedded
   in the pages and are NEVER copied into localStorage. Only photos uploaded
   in admin (downscaled there) are stored here as data URLs. */
(function () {
  var KEY = "art_store_v2";
  function seedProducts() {
    var raw = [
      [1, "Serenity Glow Candle Holder", "decor", "Concrete Decor", "Bestseller", false, "Her photo: white seated figure holding a lit candle on a bubble-textured tray", "Her own words: a perfect blend of art, peace and light for your space. A white abstract figure holding a lit candle, on a bubble-textured concrete tray.", "Handmade concrete", "Candle holder on bubble tray", 699, 699, ["As shown"], 5],
      [2, "Owl & Lotus Oval Tray Set", "decor", "Concrete Decor", "Signature", false, "Her photo: white owl and lotus bowl on an oval concrete tray", "A white owl and a lotus bowl on her oval concrete tray, the tray shape she makes in bulk for return gifts and hampers.", "Handmade concrete", "Owl, lotus bowl and oval tray", 549, 549, ["As shown"], 8],
      [3, "Pastel Cupcake Candles, Set of 3", "candles", "Candles", "Bestseller", false, "Her photo: pastel cupcake candles in rows with oval trays and daisies", "Hand-poured cupcake candles in pastel shades, made in rows for gifting and return gifts. Sold as a set of 3.", "Hand-poured wax", "Set of 3 candles", 399, 399, ["Pastel mix"], 10],
      [4, "Maa Durga DIY Paint Kit", "kits", "DIY Kits", "Made to Order", false, "Her poster: Maa Durga DIY paint kit with idol, 6 colours, brush and box, Rs 149", "Her Navratri kit at her own price: Durga idol, 6 colours, brush and reference photo in a gift box. Made to order in 4 to 5 days, shipping extra.", "Idol, paints and brush", "Idol, 6 colours, brush, reference photo, box", 149, 149, ["Standard kit"], 12],
      [5, "Flower Preservation Resin Sphere", "keepsakes", "Keepsakes & Frames", "Custom", false, "Her photo: real pink orchids preserved in a resin sphere on a wooden light base", "Your wedding or special-day flowers, preserved in clear resin so they stay exactly as they were. This one holds real pink orchids in a sphere on a wooden light base.", "Resin, real preserved flowers", "Sphere on wooden light base", 1499, 1499, ["As shown"], 3],
      [6, "25th Anniversary Photo Frame", "keepsakes", "Keepsakes & Frames", "Bestseller", false, "Her photo: large 25 photo-collage frame with pearls and gold accents", "Made for a couple's 25th anniversary: a large 25 filled with family photos, pearls and gold. Made around your photos and your milestone.", "Resin, custom photo print", "Frame with your photos", 1299, 1299, ["As shown"], 4],
      [7, "Personalised Resin Photo Clock", "keepsakes", "Keepsakes & Frames", "New In", true, "Her photo: pink resin clock with a couple's photo and gold Roman numerals", "A clock made around your photo: pink resin, gold Roman numerals, your picture in the middle.", "Resin, custom photo print", "Clock with your photo", 899, 899, ["As shown"], 4],
      [8, "Floral Perfume Bars & Diffuser Stones", "decor", "Concrete Decor", "New In", true, "Her photo: white concrete daisies, roses and hearts in a blue tray", "Perfume bars and diffuser stones shaped as daisies, roses and hearts, for drawers, wardrobes and corners that should smell like flowers.", "Wax, floral fragrance", "Set of bars and stones", 349, 349, ["Floral mix"], 9],
      [9, "Celebration Gift Hamper", "hampers", "Hampers & Gifts", "Bestseller", false, "Her photo: gift hamper bag with red roses, rose spray and diffuser stones", "A ready-to-gift hamper bag with red roses and her handmade pieces inside. The gift she is most asked for, for birthdays, anniversaries and festive gifting.", "Handmade pieces, fresh roses", "Hamper bag, ready to gift", 999, 999, ["As shown"], 6]
    ];
    return raw.map(function (r) {
      return { id: r[0], name: r[1], cat: r[2], catLabel: r[3], tag: r[4], isNew: r[5], alt: r[6], desc: r[7], material: r[8], fabric: r[8], set: r[9], price: r[10], mrp: r[11], img: null, colours: r[12].slice(), sizes: r[12].slice(), stock: r[13], visible: true };
    });
  }
  function seedOrders() {
    return [
      { id: "ART-1001", ref: "Sample enquiry 1", who: "Demo buyer · Delhi", phone: "", city: "Delhi", pincode: "", item: "Serenity Glow Candle Holder × 1", total: 699, status: 0, payment: "Unpaid", delivery: "", notes: "" },
      { id: "ART-1002", ref: "Sample enquiry 2", who: "Demo buyer · Mumbai", phone: "", city: "Mumbai", pincode: "", item: "Pastel Cupcake Candles, Set of 3 × 2", total: 798, status: 1, payment: "Unpaid", delivery: "", notes: "" },
      { id: "ART-1003", ref: "Sample enquiry 3", who: "Demo buyer · Bengaluru", phone: "", city: "Bengaluru", pincode: "", item: "25th Anniversary Photo Frame × 1 · Celebration Gift Hamper × 1", total: 2298, status: 2, payment: "Unpaid", delivery: "", notes: "" },
      { id: "ART-1004", ref: "Sample enquiry 4", who: "Demo buyer · Jaipur", phone: "", city: "Jaipur", pincode: "", item: "Flower Preservation Resin Sphere × 1", total: 1499, status: 3, payment: "Unpaid", delivery: "", notes: "" }
    ];
  }
  function seedSettings() {
    return {
      shopName: "Artistry by Sweta J",
      tagline: "Creating handmade pieces with love. Concrete Decor, Candles, Hampers. Aesthetic gifting for every occasion.",
      instagram: "@artistrybyswetaj",
      deliveryNote: "Delivery timeline and charges are confirmed on WhatsApp for your city before dispatch.",
      lowStockThreshold: 2,
      heroPicks: [1, 3, 5]
    };
  }
  function seed() {
    return { products: seedProducts(), orders: seedOrders(), settings: seedSettings(), adminPass: "sweta2026", nextOrderNum: 1005 };
  }
  function syncProduct(p) {
    if (!Array.isArray(p.colours) || !p.colours.length) p.colours = Array.isArray(p.sizes) && p.sizes.length ? p.sizes.slice() : ["Black"];
    p.sizes = p.colours.slice();
    if (!p.material) p.material = p.fabric || "Handmade";
    p.fabric = p.material;
    if (p.visible !== false) p.visible = true;
    if (p.mrp === undefined || p.mrp === "") p.mrp = null;
    if (p.img === undefined) p.img = null;
    p.stock = Math.max(0, parseInt(p.stock, 10) || 0);
    p.price = Math.max(0, parseInt(p.price, 10) || 0);
    return p;
  }
  function normalize(s) {
    if (!s || !Array.isArray(s.products) || !s.products.length) return seed();
    if (!Array.isArray(s.orders)) s.orders = seedOrders();
    if (!s.settings || typeof s.settings !== "object") s.settings = seedSettings();
    else { var d = seedSettings(); for (var k in d) if (s.settings[k] === undefined) s.settings[k] = d[k]; }
    if (!s.adminPass) s.adminPass = "leora2026";
    if (!s.nextOrderNum) s.nextOrderNum = 1005;
    s.products.forEach(syncProduct);
    s.orders.forEach(function (o) {
      if (o.status === undefined) o.status = 0;
      if (!o.payment) o.payment = "Unpaid";
      if (o.delivery === undefined) o.delivery = "";
      if (o.notes === undefined) o.notes = "";
      if (o.phone === undefined) o.phone = "";
      if (o.pincode === undefined) o.pincode = "";
      if (o.city === undefined) o.city = "";
      if (!o.id) o.id = "LEO-" + (s.nextOrderNum++);
    });
    return s;
  }
  function adopt(s) { // keep array/object identity so pages holding references see updates
    if (store.state && s === store.state) return store.state;
    if (store.state) {
      var cur = store.state;
      cur.products.length = 0; Array.prototype.push.apply(cur.products, s.products);
      cur.orders.length = 0; Array.prototype.push.apply(cur.orders, s.orders);
      for (var k in cur.settings) delete cur.settings[k];
      for (var k2 in s.settings) cur.settings[k2] = s.settings[k2];
      cur.adminPass = s.adminPass; cur.nextOrderNum = s.nextOrderNum;
      return cur;
    }
    store.state = s; return s;
  }
  function publish() {
    window.LEO_PRODUCTS = store.state.products;
    window.LEO_ORDERS = store.state.orders;
    window.LEO_SETTINGS = store.state.settings;
  }
  var store = {
    state: null,
    load: function () {
      var s = null, had = false;
      try { var raw = window.localStorage.getItem(KEY); if (raw) { s = JSON.parse(raw); had = true; } } catch (e) { s = null; }
      s = adopt(normalize(s));
      if (!had) { try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
      publish();
      return s;
    },
    save: function (state) {
      if (state && state !== this.state) adopt(normalize(state));
      if (!this.state) this.load();
      try {
        this.state.products.forEach(syncProduct);
        window.localStorage.setItem(KEY, JSON.stringify(this.state));
        publish();
        return true;
      } catch (e) { return false; }
    },
    reset: function () {
      try { window.localStorage.removeItem(KEY); } catch (e) {}
      var s = adopt(seed());
      try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
      publish();
      return this.state;
    },
    addOrder: function (order) {
      this.load();
      var o = order || {};
      o.id = "LEO-" + (this.state.nextOrderNum++);
      o.status = o.status === undefined ? 0 : o.status;
      o.payment = o.payment || "Unpaid"; o.delivery = o.delivery || ""; o.notes = o.notes || "";
      o.phone = o.phone || ""; o.pincode = o.pincode || ""; o.city = o.city || "";
      o.ref = o.ref || ("Site order " + o.id);
      this.state.orders.push(o);
      this.save();
      return o;
    }
  };
  store.load();
  window.LeoraStore = store;
  window.LEO_STORE_KEY = KEY;
})();
