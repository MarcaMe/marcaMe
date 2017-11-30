/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Relationship} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({firstName: 'Cody', lastName: 'Coder', email: 'cody@email.com', password: '123'}),
    User.create({firstName: 'Murphy', lastName: 'Dog', email: 'murphy@email.com', password: '123'}),
    User.create({firstName: 'Sisi', lastName: 'Qin', email: 'sisi@email.com', password: '123'}),
    User.create({firstName: 'Sol', lastName: 'Park', email: 'sol@email.com', password: '123'}),
    User.create({firstName: 'Philip', lastName: 'Fahim', email: 'philip@email.com', password: '123'}),
    User.create({firstName: 'Kenny', lastName: 'Diaz', email: 'kenny@email.com', password: '123'})

  ])

  const relationships = await Promise.all([
    Relationship.create({followed: 1, userId: 2}),
    Relationship.create({followed: 1, userId: 6}),
    Relationship.create({followed: 2, userId: 1}),
    Relationship.create({followed: 2, userId: 3}),
    Relationship.create({followed: 2, userId: 6}),
    Relationship.create({followed: 2, userId: 4}),
    Relationship.create({followed: 2, userId: 5}),
    Relationship.create({followed: 3, userId: 1}),
    Relationship.create({followed: 3, userId: 2}),
    Relationship.create({followed: 3, userId: 6}),
    Relationship.create({followed: 3, userId: 5}),
    Relationship.create({followed: 4, userId: 5}),
    Relationship.create({followed: 4, userId: 3}),
    Relationship.create({followed: 4, userId: 2}),
    Relationship.create({followed: 4, userId: 1}),
    Relationship.create({followed: 5, userId: 1}),
    Relationship.create({followed: 5, userId: 2}),
    Relationship.create({followed: 5, userId: 4}),
    Relationship.create({followed: 6, userId: 1}),
    Relationship.create({followed: 6, userId: 2}),
    Relationship.create({followed: 6, userId: 3}),

  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
