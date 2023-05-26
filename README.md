# bowlinghall

USERSTORIES:

1. Som användare vill jag kunna boka datum och tid samt ange antal spelare så att jag kan reservera 1 eller flera baner i bowlinghallen.

---> hämta inputfält för datum
---> hämta inputfält för klockslag
---> hämta inputfält för antal personer
---> hämta inputfält för antal banor
Acceptanskriterier: 
Hitta inputfälten ovan. 
Fyll i varje fält med valfritt värde.
Varje fält ska ha värdet (have.value) testet fyllt i.


2. Som användare vill jag kunna välja skostorlek för varje spelare så varje spelare får skor som passar.
---> hämta och klicka på "lägg till sko"-knappen
---> fyll i inputfält
---> upprepa en gång
Acceptanskriterier: 
Hitta och klicka på "lägg till sko"-knappen.
Fyll i inputfältet. Upprepa.
De två fälten ska ha värdet testet fyllt i.

3. Som användare vill jag kunna ta bort ett fält för skostorlek om jag råkade klicka i ett för mycket så jag inte boka skor i onödan.
---> klicka på "lägg till sko"-knappen tre gånger.
---> kontrollera att sko-inputfältet återkommer 3 gånger.
---> klicka på en av ta bort-knapparna
---> kontrollera att sko-inputfältet återkommer 2 gånger.
Acceptanskriterier: när testet klickat på delete-knappen ska det bara finnas 2 inputfält för skostorlek.

4. Som användare vill jag kunna skicka iväg min reservation och få tillbaka ett ett bokningsnummer och totalsumma så jag vet hur mycket jag ska betala. (120 kr / person + 100 kr / bana).
(här används ett API!! så du kanske kommer behöva WAIT-funktionen.)

5. Som användare vill jag kunna navigera mellan boknings-och bekräftelsevyn.
