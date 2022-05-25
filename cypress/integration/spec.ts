const expectedUserSelectionHeaderWhenLoggedOut = 'Chose a person you want to log in for:'
const expectedUserSelectionHeaderWhenLoggedIn = 'Chose a person you want to log in for:'

describe('Integration tests', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains(expectedUserSelectionHeaderWhenLoggedOut)
  })

  it('Should change the user selection box title after selecting a user', () => {
    cy.visit('/')
    const userOption = cy.get('.mat-list-item-content').first();
    userOption.click();

    const expectedUserSelectionHeaderWhenLoggedIn = 'Welcome'
    cy.contains(expectedUserSelectionHeaderWhenLoggedIn)
  })

  it('Should show another user after clicking the like button', () => {
    cy.visit('/')
    const userOption = cy.get('.mat-list-item-content').first();
    userOption.click();

    const user1NameToBeLiked = cy.get('h3');

    user1NameToBeLiked.invoke('text').then((user1Name) => {
      const likeButton = cy.get('#like-btn');
      likeButton.click();

      const user2Name = cy.get('h3')
      user2Name.invoke('text').then((user2Name) => {
        expect(user2Name).not.equal(user1Name);
      })
    });
  })

  it('Should show no users left after liking everyone', () => {
    cy.visit('/')
    const sarahOption = cy.get('.mat-list-item-content').contains('Sarah')
    sarahOption.click();

    const expectedUserSelectionHeaderWhenLoggedIn = 'Welcome'
    cy.contains(expectedUserSelectionHeaderWhenLoggedIn)
  })
})
