require("dotenv").config(); // Load .env file
export async function addDocument(uuid, firstName, lastName, walletAddress) {
  const faunadb = require("faunadb");
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_SECRET,
    domain: "db.fauna.com",
    scheme: "https",
  });
  var response = client.query(
    q.Create(q.Collection("allowlist_members"), {
      data: {
        uuid: uuid,
        f_name: firstName,
        l_name: lastName,
        wallet_address: walletAddress,
      },
    })
  );

  return response;
}

export async function findUUID(uuid) {
  const faunadb = require("faunadb");
  const q = faunadb.query;
  const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_SECRET,
    domain: "db.fauna.com",
    scheme: "https",
  });
  client
    .query(q.Paginate(q.Match(q.Index("allowlist_members_by_uuid"), uuid)))
    .then((res) => {
      if (res.data.length === 0) {
        return false;
      } else {
        return true;
      }
    });
}
