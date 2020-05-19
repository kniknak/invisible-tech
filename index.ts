import {run} from "./src/app"
import {options} from "yargs"

const argv = options({
  address: {
    alias: "a",
    desc: "Address to get the weather & time,\ne.g.: Moscow Paris \"Foo bar\" 10005",
    demand: true,
    type: "array",
  },
})
  .help()
  .argv

run(argv.address)
