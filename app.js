const mysql = require('mysql2/promise');

(async () => {
  const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_courses',
    decimalNumbers: 'true',
    namedPlaceholders: 'true',
  });

  const [results] = await pool.execute('SELECT * FROM `courses`');
  console.log(results);

  const [results2] = await pool.execute(
    'SELECT `students`.`id`, `students`.`firstName`, `students`.`lastName`,`students`.`courseName` FROM `students` WHERE `age` > 18'
  );
  console.log(results2);

  const [results3] = await pool.execute(
    'DELETE FROM `students` WHERE `age` < 18'
  );
  console.log(results3);
})();
