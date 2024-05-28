export class EmployeesRepository {
    constructor(fileName) { 
        this.fileName = fileName; 
    }
    
    getEmployeesByBirthDate(ourDate) {
        const data = fs.readFileSync(
          path.resolve(__dirname, `${this.fileName}`), 
          "UTF-8"
        );
        // split the contents by new line
        const lines = data.split(/\r?\n/);
        lines.shift();
        return lines
          .map((line) => this.createEmployeeFromLine(line))
          .filter((employee) => employee.isBirthday(ourDate));
      }

  createEmployeeFromLine(line) {
    const employeeData = line.split(", ");
    const employee = new Employee(
      employeeData[1],
      employeeData[0],
      employeeData[2],
      employeeData[3]
    );
    return employee;
  }
}