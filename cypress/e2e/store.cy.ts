describe("visit store", () => {
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
  });
});
