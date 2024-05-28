import fs from "fs";
import path from "path";
import { Employee } from "./Employee";

export class BirthdayService {
  constructor() {}

  sendGreetings(ourDate, fileName, smtpUrl, smtpPort, transport) {
    const employees = this.getEmployeesByBirthDate(ourDate, fileName);
    
    employees.forEach((employee) => {
      this.sendGrettingToEmployee(smtpUrl, smtpPort, transport, employee);
    });
  }

  sendGrettingToEmployee(smtpUrl, smtpPort, transport, employee) {
    const message = {
      host: smtpUrl,
      port: smtpPort,
      from: "sender@here.com",
      to: [employee.getEmail()],
      subject: "Happy Birthday!",
      text: `Happy Birthday, dear ${employee.getFirstName()}!`,
    };
    transport.sendMail(message);
  }

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
