describe('End-to-End Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/dashboard');
    
  });

  it('should create a new event', () => {
    cy.get('input[name="eventName"]').type('My Event');
    cy.get('input[name="eventHost"]').type('John Doe');
    cy.get('input[name="eventDate"]').type('6/17/2023');
    cy.get('form').submit();

    cy.contains('My Event').should('exist');
    cy.contains('John Doe').should('exist');
  });

  it('should search for an event', () => {
    cy.get('input[name="searchQuery"]').type('My Event');
    cy.get('button[color="primary"]').contains('Search').click();

    cy.contains('My Event').should('exist');
    cy.contains('John Doe').should('exist');
  });

  it('Event update test', () => {
    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-actions > [color="primary"]').click(); // Click on the edit button

    // Assert that the row is in edit mode
    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-actions > button').should('contain', 'Save');
    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-actions > button').should('contain', 'Cancel');
    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-name > input').should('exist');

    // Modify the value in the input field
    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-name > input').clear().type('Updated Event Name');

    // Click on the save button
    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-actions > button[color="primary"]').click();

    // Assert that the value has been updated
    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-name').should('contain', 'Updated Event Name');

  });  

  

  it('Delete check', () => {
    //cy.get('.mat-mdc-row > .cdk-column-actions > [color="warn"]').click();
    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-actions > [color="warn"]').click(); // Click on the delete button
      
    // Assert that the item is deleted
    cy.get('.mdc-data-table__content').should('not.contain', 'Updated Event Name'); // Assuming 'Updated Event Name' was the previous value you used for testing the edit functionality
  }); 
});
