// exemplo json
var output = {
    "date":"2022-05-03",
    "time":"14:30:00"
  }
  
  var minutosAdicionais = 30;
  
  //testanto o acesso aos valores
  console.log('Data string: '+output.date+'-'+output.time);
  
  // montando a data
  var novaData = output.date+"T"+output.time+"Z";
  console.log('Nova Data string: '+novaData);
  
  //sting to to timeobject
  /* hoje = new Date('2011-04-11T10:20:30Z') */   // aqui vai de boa
  timestamp = new Date(output.date+'T'+output.time+'Z');   // problema aqui. 
  console.log('date: '+timestamp);
  
  // somando minutos
  novotimestamp = new Date(timestamp.getTime() + minutosAdicionais * 60000);
  console.log('Data operada: '+novotimestamp);

// const appointmentDate = date+"T"+time+"Z";
// console.log(appointmentDate);
// var appointmentDateMore = new Date(appointmentDate.getTime() + minutosAdicionais * 60000);
// console.log(appointmentDateMore)