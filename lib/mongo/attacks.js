import clientPromise from ".";

let client
let db
let attacks

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db()
    attacks = await db.collection('session')
  } catch (error) {
    throw new Error('Failed to stablish connection to database')
  }
}

;(async () => {
  await init()
})()

///////////////
/// Attacks ///
///////////////

export async function getAttacks(){
  try {
    if(!attacks) await init()
    const result = await attacks
      .find({})
      .limit(20)
      .map(user => ({ ...user, _id: user._id.toString() }))
      .toArray()

    return { attacks: result }
  } catch (error) {
    return { error: 'Failed to fetch attacks.'}
  }
}