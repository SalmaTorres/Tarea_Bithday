export class EmployeesRepository {
    constructor(){}
    
    getEmployeesByBirthDate(ourDate, fileName) {
        const data = fs.readFileSync(
          path.resolve(__dirname, `${fileName}`),
          "UTF-8"
        );
        // split the contents by new line
        const lines = data.split(/\r?\n/);
        lines.shift();
        return lines
          .map((line) => this.createEmployeeFromLine(line))
          .filter((employee) => employee.isBirthday(ourDate));
      }
}