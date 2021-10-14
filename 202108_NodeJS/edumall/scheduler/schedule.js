const schedule = require("node-schedule");
const config = require("./config.json");

class TaskScheduler {
  constructor() { }

  schedule1() {
    schedule.scheduleJob(config.testInterval, () => {
      console.log("Scheduler 1");
    });
  }

  schedule2() {
    schedule.scheduleJob(config.testInterval, () => {
      console.log("Scheduler 2");
    });
  }

  scheduleAllTasks() {
    console.log("Run scheduled tasks");
    this.schedule1();
    this.schedule2();
  }
}

module.exports = new TaskScheduler();
