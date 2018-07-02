# LAB TEMPLATE README
## Travis Badge
[![Build Status](https://travis-ci.org/ashtonkellis/13-14-two-resource-api.svg?branch=master)](https://travis-ci.org/ashtonkellis/13-14-two-resource-api)

## Code

## Resource: DINOSAURS!!!! RAWR!
Dinosaurs have the following fields:
```
Dinosaur {
  _id: a unique id that is created on instantiation
  name: string (required)
  species: string (optional)
  eatsMeat: boolean (optional)
  eatsPlants: boolean (optional)
}
```

## API Endpoints
POST api/dinosaur
```
  // example post request body
  request.body: {
    name: 'Little Foot',
    species: 'Long Neck',
    eatsMeat: false,
    eatsPlants: true,
}
```

GET api/dinosaur?id={dino_id}
```
// example endpoint to get dinosaur # 123
api/dinosaur?id=123
```

DELETE api/dinosaur?id={dino_id}
```
// example endpoint to delete dinosaur # 123
api/dinosaur?id=123
```

PUT api/dinosaurs?id={dino_id}
```
// example endpoint to delete dinosaur # 123
api/dinosaur?id=123
```

