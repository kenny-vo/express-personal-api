
var db = require('./models');

var vacation_list = [
  {
    place: "Colombia",
    date: "December 2016",
    duration: "2.5 weeks",
    photo: 'https://scontent.xx.fbcdn.net/v/t31.0-8/15590994_1286554654734996_5091710714067626579_o.jpg?oh=f99cb17a874b35c440c49cefa77293a2&oe=59BF3167'
  },
  {
    place: "Puerto Rico",
    date: "December 2016",
    duration: "1 week",
    photo: "https://scontent.xx.fbcdn.net/v/t31.0-8/16402645_1325657180824743_5858583854709454149_o.jpg?oh=7a773bffd9c4c2928d4e292566e36a6e&oe=59B7B6E2"
  },
  {
  place: "Paris, France",
  date: "November 2016",
  duration: "1 week",
  photo: "https://scontent.xx.fbcdn.net/v/t1.0-9/15193548_1245597582164037_3160387270239100064_n.jpg?oh=fff488883bd13be9113f0452835300e7&oe=59B79652"
  }
];

db.Vacation.remove({}, function(err, removedEverything){
  if(err){return console.log(err);}

  db.Vacation.create(vacation_list, function(err, vacations){
    if(err){return console.log(err);}
    console.log(vacations);
    process.exit(1);
  });
});
