import AreaBarChart from "./AreaBarChart"
import AreaProgressChart from "./AreaProgressChart"
import PlansSold from "../../Charts/PlansSold"
import TopInvestors from "./../../Charts/TopInvestorsProgressChart"

const AreaCharts = () => {
  return (
    <section className="content-area-charts">
      <AreaBarChart />
      <AreaProgressChart />
      <PlansSold/>
      <TopInvestors/>
    </section>
  )
}
 
export default AreaCharts