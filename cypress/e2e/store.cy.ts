describe("visit store", { scrollBehavior: false }, () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/store");
  });
});

describe("Add Product to Cart", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/store");
  });

  it("Adds the product to cart", () => {
    cy.get('button[name="add-to-cart"]')
      .first()
      .click({ scrollBehavior: false });

    // Assert that the cart icon displays the correct item count
    cy.get('div[id="cart-count"]').should("have.text", "1");

    cy.get('button[id="cart-button"]').click({ scrollBehavior: false });

    cy.get('span[id="cart-content"]')
      .first()
      .should(
        "have.text",
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops - $109.95"
      );
  });
});

describe("Add Product to Cart and then Remove it", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/store");
  });

  it("Adds the product to the cart", () => {
    cy.get('button[name="add-to-cart"]')
      .first()
      .click({ scrollBehavior: false });

    cy.get('button[name="remove-from-cart"]').first().click({ force: true });

    cy.get('div[id="cart-count"]').should("have.text", "0");
  });
});

describe("Empty shopping cart", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/store");
  });

  it("Checks if the cart is empty", () => {
    cy.get('button[id="cart-button"]').click();
    cy.get('span[id="cart-content"]')
      .first()
      .should("have.text", "...Nothing in the cart...");
  });
});

describe("<a> element should have href attribute", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/store");
  });

  it("Checks if <a> element in CustomCard has href attribute", () => {
    cy.get('a[id="product-detail"]').first().should('have.attr', 'href', '/store/products/1');
  });
});
