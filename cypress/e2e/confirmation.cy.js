describe('template spec', () => {
  beforeEach(()=> {
    cy.visit('http://localhost:5173/')
  })

  //Som användare vill jag kunna skicka iväg min reservation och få tillbaka ett 
  //bokningsnummer och totalsumma
  it('should send reservation form and return confirmation number and sum total', ()=> {
    cy.get(':nth-child(1) > .input__field').type('2023-05-30') //DATE
    cy.get('.booking-info__when > :nth-child(2) > .input__field').type('18:00') //TIME
    cy.get('.booking-info__details > :nth-child(2) > .input__field').type('2') //NUMBER OF PEOPLE
    cy.get(':nth-child(3) > .input__field').type('1') //NUMBER OF LANES
    cy.get('.shoes__button').click() //shoe 1
    cy.get('.shoes__form > .input > .input__field').type('42')
    cy.get('.shoes > :nth-child(3)').click() //shoe 2
    cy.get(':nth-child(3) > .input > .input__field').type('39')
    cy.get('.button').click();
    cy.wait(2000) //väntar på att APIt ska hämtas
    cy.get(':nth-child(1) > .input__field').should('be.disabled')
    cy.get(':nth-child(4) > .input__field').invoke('val').should('exist') //fältet för reservationsnummer innehåller något
    cy.get('.confirmation__price > :nth-child(2)').contains('340') //priset returneras
  })

  //FELHANTERING: om jag skippar ett inputfält (t ex datumet) ska felmeddelandet poppa upp.
  it('should not accept one input field being empty', ()=>{
    //SKIP THE DATE
    cy.get('.booking-info__when > :nth-child(2) > .input__field').type('18:00') //TIME
    cy.get('.booking-info__details > :nth-child(2) > .input__field').type('2') //NUMBER OF PEOPLE
    cy.get(':nth-child(3) > .input__field').type('1') //NUMBER OF LANES
    cy.get('.shoes__button').click() //shoe 1
    cy.get('.shoes__form > .input > .input__field').type('42')
    cy.get('.shoes > :nth-child(3)').click() //shoe 2
    cy.get(':nth-child(3) > .input > .input__field').type('39')
    cy.get('.button').click();
    cy.get('.error-message__text').contains('make sure that people and shoes is the same number')
  })
})