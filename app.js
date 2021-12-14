const mysql = require('mysql2/promise');
const { v4: uuid } = require('uuid');

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
    'SELECT `students`.`id`, `students`.`firstName`, `students`.`lastName`,`students`.`courseName` FROM `students` JOIN `students_courses` ON `students`.`id` = `students_courses`.`studentId` JOIN `courses` ON `students_courses`.`courseName` = `courses`.`name` WHERE `age` > 18'
  );
  console.log(results2);

  const { affectRows: deletedStudentsUnderGivenAge } = (
    await pool.execute('DELETE FROM `students` WHERE `age` < :age', { age: 18 })
  )[0];
  console.log(deletedStudentsUnderGivenAge);

  const newStudentId = uuid();
  await pool.execute(
    'INSERT INTO `students`(`id`,`firstName`,`lastName`,`age`,`addressStreet`) VALUES(:id, :firstName, :lastName, :age, :addressStreet);',
    {
      id: newStudentId,
      firstName: 'Zenek',
      lastName: 'Pierd',
      age: 99,
      addressStreet: 'ul. Pcim',
    }
  );
  console.log(newStudentId);

  await pool.end();
})();
