
describe('template spec', () => {
  beforeEach(()=> {
    cy.visit('http://localhost:5173/')
  })

  //Som användare vill jag kunna boka datum och tid samt ange antal spelare så att jag kan reservera 1 eller flera baner i bowlinghallen.

  it('should choose date, time, number of players and number of bowling lanes', ()=> {
    cy.get(':nth-child(1) > .input__field').type('2023-05-30') //DATE
    cy.get(':nth-child(1) > .input__field').should('have.value', '2023-05-30')
    cy.get('.booking-info__when > :nth-child(2) > .input__field').type('18:00') //TIME
    cy.get('.booking-info__when > :nth-child(2) > .input__field').should('have.value', '18:00')
    cy.get('.booking-info__details > :nth-child(2) > .input__field').type('2') //NUMBER OF PEOPLE
    cy.get('.booking-info__details > :nth-child(2) > .input__field').should('have.value', '2')
    cy.get(':nth-child(3) > .input__field').type('1') //NUMBER OF LANES
    cy.get(':nth-child(3) > .input__field').should('have.value', '1')
  })

  //Som användare vill jag kunna välja skostorlek för varje spelare 
  //så varje spelare får skor som passar.

  it('should be able to pick shoe size for each player', () => {
    cy.get('.shoes__button').click() //shoe 1
    cy.get('.shoes__form > .input > .input__field').type('42')
    cy.get('.shoes__form > .input > .input__field').should('have.value', '42')
    cy.get('.shoes > :nth-child(3)').click() //shoe 2
    cy.get(':nth-child(3) > .input > .input__field').type('39')
    cy.get(':nth-child(3) > .input > .input__field').should('have.value', '39')
  })

  //Välja skor, felhantering 
  it('should not accept shoe sizes for the wrong number of players', ()=>{
    cy.get(':nth-child(1) > .input__field').type('2023-05-30') //DATE
    cy.get('.booking-info__when > :nth-child(2) > .input__field').type('18:00') //TIME
    cy.get('.booking-info__details > :nth-child(2) > .input__field').type('2') //NUMBER OF PEOPLE: 2
    cy.get(':nth-child(3) > .input__field').type('1') //NUMBER OF LANES
    cy.get('.shoes__button').click() //JUST ONE SHOE
    cy.get('.shoes__form > .input > .input__field').type('42')
    cy.get('.button').click()
    cy.get('.error-message__text').contains('make sure that people and shoes is the same number')
  })

  //Som användare vill jag kunna ta bort ett fält för skostorlek 
  //om jag råkade klicka i ett för mycket så jag inte boka skor i onödan.
  it('should be able to delete shoe input field', () => {
    cy.get('.shoes__button').click() //shoe 1
    cy.get('.shoes > :nth-child(3)').click() //shoe 2
    cy.get('.shoes > :nth-child(4)').click() //shoe 3
    cy.get('.input__field.shoes__input').should('have.length', 3)
    cy.get('.shoes > :nth-child(4) > .shoes__button').click() //click on shoe input delete button!
    cy.get('.input__field.shoes__input').should('have.length', 2)
  })

  //Som användare vill jag kunna navigera mellan boknings-och bekräftelsevyn.
  it('should be able to navigate between booking page and confirmation page', ()=> {
    cy.get('.booking-info__heading').contains('When, WHAT & Who')
    cy.get('.navigation__icon').click()
    cy.get('.navigation > :nth-child(3)').click() //clicks the CONFIRMATION link
    cy.get('.confirmation__no-booking').contains('bokning')
    cy.get('.navigation__icon').click();
    cy.get('.navigation > :nth-child(2)').click() //clicks on the BOOKING link
    cy.get('.booking-info__heading').contains('When, WHAT & Who')
  })
})