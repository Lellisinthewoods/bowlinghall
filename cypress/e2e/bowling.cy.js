/*FRÅGOR TILL C:

Finns det något sätt att spara ner alla kodrader? 
t ex med funktioner så inte "fyll i och skicka formuläret" måste upprepas hela tiden

Kunde man dela upp det i fler describe-funktioner nedan? Olika filer, hur dela upp?

I reservationen: fältet med reservationsnumret EXISTERAR, men är det ett bra nog test?

Förbättringsmöjlighet: hitta allt med hjälp av data-id istället för cypress hjälpgrej

Förbättringsmöjlighet: annan fil för felhanteringarna?

*/

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

  it('should pick one shoe size for each player', () => {
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
    cy.get('.shoes__button').click() //shoe 1 (just one shoe)
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
    cy.get('.shoes > :nth-child(4) > .shoes__button').click() //shoe input delete button!
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
    cy.get(':nth-child(4) > .input__field').should('exist') //fältet med reservationsnumret existerar
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