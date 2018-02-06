module.exports = function(client) {

  function searchByName(name, callback) {
    let query = `
      SELECT *
      FROM famous_people
      WHERE first_name = $1 OR last_name = $1;
      `;
    client.query(query, [name], callback);
  }


  return {

    searchByName

  };
}